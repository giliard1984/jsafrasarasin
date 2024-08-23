import React, { createContext, useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { AppContext } from "@contexts/AppContext";
import { doesPasswordMatch } from "@/helpers/password";
import { Row, Col, Input, Button, notification, type NotificationArgsProps } from "antd";
import { MailOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import type { Credential, Session } from "@definitions/global";

import styles from "./Login.module.scss";

type NotificationType = 'success' | 'info' | 'warning' | 'error';
type NotificationPlacement = NotificationArgsProps['placement'];
const Context = createContext({ name: 'Default' });

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();
  const [credential, setCredential] = useState<Credential>({ email: null, password: null });
  const [isValidated, setIsValidated] = useState<boolean | undefined>();

  // retrieved states and methods associated with the app context
  const {
    setSession
  } = useContext(AppContext);

  const handleSignIn = () => {
    // validates the credential information at the frontend level
    if (credential.email === null || credential.password === null) {
      setIsValidated(false);
      openNotification("error", "Error", "Your email or password might not exist", "topRight");
    }

    // fetch the user's credential, considering the user does exist
    // moving this to the backend, the response should be an object instead of array of objects
    fetch(`http://localhost:5183/users?email=${credential.email}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    })
    .then(response => response.json())
    .then(json => {
      const isValid = credential?.password && json[0]?.password ? doesPasswordMatch(credential.password, json[0]?.password) : false;

      // TODO: if the credential is valid, then store it to the sessionStorage and ContextApi -> session
      // Not implementing at this point.

      // when the credential has been verified, than based on the role, redirect them on to their page
      if (isValid) {     
        setSession({
          email: json[0].email,
          firstName: json[0].firstName,
          lastName: json[0].lastName,
          createdAt: json[0].createdAt,
          loggedIn: dayjs().toISOString()
        } as Session);

        if (json[0].role === "user") {
          navigate("/quiz")
        } else {
          navigate("/quiz/manage");
        }
      }

      // TODO: move openNotification to a helper function, so it is reusable
      openNotification("error", "Credential", "The requested email is unavailable", "topRight");
    })
    .catch((e: Error) => {
      console.log(e);
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
              name="email"
              size="large"
              variant="filled"
              placeholder="Type your email"
              addonBefore={<MailOutlined />}
              status={isValidated !== undefined && !isValidated && credential.email === null ? "error" : ""}
              onChange={(e) => setCredential((oldObj: Credential) => ({ ...oldObj, email: e.target.value }))}
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
              status={isValidated !== undefined && !isValidated && credential.password === null ? "error" : ""}
              onChange={(e) => setCredential((oldObj: Credential) => ({ ...oldObj, password: e.target.value }))}
            />
          </Col>
          <Col span={24} className="spaceTopSM">
            <Button type="primary" size="large" block onClick={handleSignIn}>Sign in</Button>
          </Col>
          <Col span={24}>
            <a onClick={() => navigate("/signup")}>Don't have an account?</a>
          </Col>
        </Row>

      </div>
    </Context.Provider>
  );
};

export default LoginPage;
