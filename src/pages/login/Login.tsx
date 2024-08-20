import React, { createContext, useState, useMemo/*, useContext */ } from "react";
import { useNavigate } from "react-router-dom";
// import { AppContext } from "@contexts/AppContext";
import { Row, Col, Input, Button, notification, type NotificationArgsProps } from "antd";
import { MailOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

import styles from "./Login.module.scss";

type NotificationType = 'success' | 'info' | 'warning' | 'error';
type NotificationPlacement = NotificationArgsProps['placement'];
const Context = createContext({ name: 'Default' });

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();
  const [credential, setCredential] = useState({ email: null, password: null });
  const [isValidated, setIsValidated] = useState<boolean | undefined>();
  // retrieved states and methods associated with the app context
  // const {
  //   loading,
  //   error,
  //   data
  // } = useContext(AppContext);

  const handleSignIn = () => {
    // validates the credential information at the frontend level
    if (credential.email === null || credential.password === null) {
      setIsValidated(false);
      openNotification("error", "Error", "Your email or password might not exist", "topRight");
    }

    // TODO: send the crendential to the endpoint, to validate the user
    // TODO: if the credential is valid, then store it to the sessionStorage and ContextApi -> session
    // TODO: considering everything is okay, then redirect user
    navigate("/user");
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
            <img src="./jsafrasarasin-logo.png" />
          </Col>
          <Col span={24} className={styles.positionToLeft}>
            <label>Email</label>
            <Input
              size="large"
              variant="filled"
              placeholder="Type your email"
              addonBefore={<MailOutlined style={{ color: "#000" }} />}
              status={isValidated !== undefined && !isValidated && credential.email === null ? "error" : ""}
              onChange={(e) => setCredential((oldObj: any) => ({ ...oldObj, email: e.target.value }))}
            />
          </Col>
          <Col span={24} className={styles.positionToLeft}>
            <label>Password</label>
            <Input.Password
              size="large"
              variant="filled"
              placeholder="Type your password"
              addonBefore={<LockOutlined style={{ color: "#000" }} />}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              status={isValidated !== undefined && !isValidated && credential.password === null ? "error" : ""}
              onChange={(e) => setCredential((oldObj: any) => ({ ...oldObj, password: e.target.value }))}
            />
          </Col>
          <Col span={24} style={{ marginTop: 20 }}>
            <Button type="primary" size="large" block onClick={handleSignIn}>Sign in</Button>
          </Col>
          <Col span={24}>
            <a>Don't have an account?</a>
          </Col>
        </Row>

      </div>
    </Context.Provider>
  );
};

export default LoginPage;
