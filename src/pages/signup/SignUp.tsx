import React, { createContext, useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { AppContext } from "@contexts/AppContext";
import { doesPasswordMatch } from "@/helpers/password";
import { Row, Col, Input, Button, Checkbox, notification, type NotificationArgsProps, type CheckboxProps } from "antd";
import { MailOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import type { SignUp, Session } from "@definitions/global";

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
    if (account.email === null || account.password === null) {
      setIsValidated(false);
      openNotification("error", "Error", "Your email or password might not exist", "topRight");
    }

    // fetch the user's account, considering the user does exist
    // moving this to the backend, the response should be an object instead of array of objects
    console.log(account.email);
    // TODO: move this to a helper function that checks and creates an account
    fetch(`http://localhost:5183/users?email=${account.email}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    })
    .then(response => response.json())
    .then(json => {
      // setSession({
      //   email: json[0].email,
      //   firstName: json[0].firstName,
      //   lastName: json[0].lastName,
      //   createdAt: json[0].createdAt,
      //   loggedIn: dayjs().toISOString()
      // } as Session);
      console.log("json: ", json);

      // json[0].role === "user" ? navigate("/quiz") : navigate("/quiz/manage");

      // TODO: move openNotification to a helper function, so it is reusable
      openNotification("error", "Account", "The request has failed", "topRight");
    })
    .catch((e: Error) => {
      console.log(e);
    })
    .finally(() => console.log(false));
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
              size="large"
              variant="filled"
              placeholder="Type your email"
              addonBefore={<MailOutlined />}
              status={isValidated !== undefined && !isValidated && account.email === null ? "error" : ""}
              onChange={(e) => setAccount((oldObj: Credential) => ({ ...oldObj, email: e.target.value }))}
            />
          </Col>
          <Col span={24} className={styles.positionToLeft}>
            <label>First Name</label>
            <Input
              size="large"
              variant="filled"
              placeholder="Type your first name"
              addonBefore={<MailOutlined />}
              status={isValidated !== undefined && !isValidated && account.firstName === null ? "error" : ""}
              onChange={(e) => setAccount((oldObj: Credential) => ({ ...oldObj, firstName: e.target.value }))}
            />
          </Col>
          <Col span={24} className={styles.positionToLeft}>
            <label>Last Name</label>
            <Input
              size="large"
              variant="filled"
              placeholder="Type your last name"
              addonBefore={<MailOutlined />}
              status={isValidated !== undefined && !isValidated && account.lastName === null ? "error" : ""}
              onChange={(e) => setAccount((oldObj: Credential) => ({ ...oldObj, lastName: e.target.value }))}
            />
          </Col>
          <Col span={24} className={styles.positionToLeft}>
            <label>Password</label>
            <Input.Password
              size="large"
              variant="filled"
              placeholder="Type your password"
              addonBefore={<LockOutlined />}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              status={isValidated !== undefined && !isValidated && account.password === null ? "error" : ""}
              onChange={(e) => setAccount((oldObj: Credential) => ({ ...oldObj, password: e.target.value }))}
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
