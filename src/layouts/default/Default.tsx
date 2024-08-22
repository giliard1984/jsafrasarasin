import React from "react";
import { Menu, Layout, theme, ConfigProvider, FloatButton } from 'antd';
import { Outlet } from "react-router-dom";

import styles from "./Default.module.scss";

const { Header, Content } = Layout;

const DefaultLayout: React.FC = () => {
  const { token: { borderRadiusLG } } = theme.useToken(); // antd token

  return (
    // defining the layout theme
    <ConfigProvider
      theme={{ components: { Layout: { bodyBg: "transparent", headerBg: "#fff" } } }}
    >
      <Header className={styles.header}>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['quiz']}
          items={[
            { key: "quiz", label: "Quiz"},
            { key: "history", label: "History", disabled: true}
          ]}
          style={{ flex: 1, minWidth: 0, padding: "0px 20%" }}
        />
      </Header>
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
