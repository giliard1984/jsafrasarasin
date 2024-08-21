import React/* , { useContext } */ from "react";
import { Row, Col, Layout, theme, ConfigProvider, Input, FloatButton, Switch } from 'antd';
// import { SearchOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Outlet } from "react-router-dom";
// import { AppContext } from "@contexts/AppContext";

import styles from "./Default.module.scss";

const { /* Header, */ Content } = Layout;

const DefaultLayout: React.FC = () => {
  const { token: { borderRadiusLG } } = theme.useToken(); // antd token

  // retrieved states and methods associated with the app context
  // const {
  // } = useContext(AppContext);

  return (
    // defining the layout theme
    <ConfigProvider
      theme={{ components: { Layout: { bodyBg: "transparent", headerBg: "#fff" } } }}
    >
      <Layout className={styles.layout}>
        <Content className={styles.content}>
          <div
            className={styles.outletWrapper}
            style={{ borderRadius: borderRadiusLG }}
          >
            <Outlet />
            <FloatButton.BackTop duration={550} visibilityHeight={800} />
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default DefaultLayout;
