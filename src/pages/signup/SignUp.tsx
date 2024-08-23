import React, { createContext, useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { AppContext } from "@contexts/AppContext";
import { Row, Col, Input, Button, Checkbox, notification, type NotificationArgsProps, type CheckboxProps } from "antd";
import { MailOutlined, FieldStringOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import type { SignUp, Account, Session } from "@definitions/global";
import { createAccount } from "@helpers/createAccount";

import styles from "./SignUp.module.scss";

type NotificationType = 'success' | 'info' | 'warning' | 'error';
type NotificationPlacement = NotificationArgsProps['placement'];
const Context = createContext({ name: 'Default' });

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();
  const [account, setAccount] = useState<SignUp>({ email: null, firstName: null, lastName: null, password: null });
  const [isValidated, setIsValidated] = useState<boolean | undefined>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // retrieved states and methods associated with the app context
  const {
    setSession
  } = useContext(AppContext);

  const handleSignUp = () => {
    // validates the account information at the frontend level
    if (
      account.email === null ||
      account.firstName === null ||
      account.lastName === null ||
      account.password === null
    ) {
      setIsValidated(false);
      openNotification("error", "Error", "Your email or password might not exist", "topRight");
    }

    // create the user's account, considering the user does exist
    // TODO: some controls should be moved to the backend, but processing them here at the moment
    createAccount(isAdmin, account).then((response: Account | Error | void) => {
      if (response && Object.prototype.hasOwnProperty.call(response, "id")) {
        setSession({
          email: (response as Account).email,
          firstName: (response as Account).firstName,
          lastName: (response as Account).lastName,
          createdAt: (response as Account).createdAt,
          loggedIn: dayjs().toISOString()
        } as Session);

        if ((response as Account).role === "user") {
          navigate("/quiz");
        } else {
          navigate("/quiz/manage");
        }
      }
    });
  };

  const openNotification = (
    type: NotificationType,
    message: string,
    description: string,
    placement: NotificationPlacement
  ) => {
    api[type]({
      message,
      description: <Context.Consumer>{({}) => `${description}!`}</Context.Consumer>,
      placement,
    });
  };

  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

  const onAdminFlagChange: CheckboxProps["onChange"] = (e) => {
    setIsAdmin(e.target.checked);
  };

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div className={styles.wrapper}>
        <Row gutter={[0, 16]} justify="start" align="middle">
          <Col span={24}>
            <img src="./jsafrasarasin-logo.png" style={{ maxWidth: "320px" }} />
          </Col>
          <Col span={24} className={styles.positionToLeft}>
            <label>Email</label>
            <Input
              name="emailName"
              size="large"
              variant="filled"
              placeholder="Type your email"
              addonBefore={<MailOutlined />}
              status={isValidated !== undefined && !isValidated && account.email === null ? "error" : ""}
              onChange={(e) => setAccount((oldObj: SignUp) => ({ ...oldObj, email: e.target.value }))}
            />
          </Col>
          <Col span={24} className={styles.positionToLeft}>
            <label>First Name</label>
            <Input
              name="firstName"
              size="large"
              variant="filled"
              placeholder="Type your first name"
              addonBefore={<FieldStringOutlined />}
              status={isValidated !== undefined && !isValidated && account.firstName === null ? "error" : ""}
              onChange={(e) => setAccount((oldObj: SignUp) => ({ ...oldObj, firstName: e.target.value }))}
            />
          </Col>
          <Col span={24} className={styles.positionToLeft}>
            <label>Last Name</label>
            <Input
              name="lastName"
              size="large"
              variant="filled"
              placeholder="Type your last name"
              addonBefore={<FieldStringOutlined />}
              status={isValidated !== undefined && !isValidated && account.lastName === null ? "error" : ""}
              onChange={(e) => setAccount((oldObj: SignUp) => ({ ...oldObj, lastName: e.target.value }))}
            />
          </Col>
          <Col span={24} className={styles.positionToLeft}>
            <label>Password</label>
            <Input.Password
              name="password"
              size="large"
              variant="filled"
              placeholder="Type your password"
              addonBefore={<LockOutlined />}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              status={isValidated !== undefined && !isValidated && account.password === null ? "error" : ""}
              onChange={(e) => setAccount((oldObj: SignUp) => ({ ...oldObj, password: e.target.value }))}
            />
          </Col>
          <Col span={24} className={styles.positionToLeft}>
            <Checkbox onChange={onAdminFlagChange}>Create account as admin</Checkbox>
          </Col>
          <Col span={24} className="spaceTopSM">
            <Button type="primary" size="large" block onClick={handleSignUp}>Sign up</Button>
          </Col>
          <Col span={24}>
            <a onClick={() => navigate("/signin")}>Already have an account?</a>
          </Col>
        </Row>

      </div>
    </Context.Provider>
  );
};

export default SignUpPage;
