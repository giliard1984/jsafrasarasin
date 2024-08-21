import React, { useState } from "react";
import { Layout, theme, ConfigProvider, Menu, Button, FloatButton } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  HomeOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate } from "react-router-dom";
// import { AppContext } from "@contexts/AppContext";

import styles from "./Admin.module.scss";

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken(); // antd token

  // retrieved states and methods associated with the app context
  // const {
  // } = useContext(AppContext);

  return (
    // defining the layout theme
    <ConfigProvider
      theme={{ components: {
        Layout: { bodyBg: "transparent", headerBg: "#fff"/*, siderBg: "#041b53"*/ },
        // Menu: { darkItemBg: "#041b53" }
      } }}
    >
      <Layout className={styles.layout} hasSider>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="sm"
          width={250}
        >
          <div className="demo-logo-vertical" />
            <div style={{ width: "100%", textAlign: "center" }}>
              {
                collapsed ?
                  <img src="./jsafrasarasin-icon.jpg" style={{ width: "80px", maxHeight: "64px", objectFit: "cover" }} /> :
                  // <img src="./jsafrasarasin-logo-dark.jpeg" style={{ width: "100%", maxHeight: "64px", objectFit: "fill" }} />
                  <div style={{ fontSize: 24, fontWeight: "bold", color: "#fff", display: "flex", justifyContent: "center", alignItems:"center", height: "64px", borderBottom: "1px solid #16276c" }}>
                    J. Safra Sarasin
                  </div>
              }
            </div>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              items={[
                {
                  key: '1',
                  icon: <HomeOutlined />,
                  label: 'Home',
                },
                {
                  key: '2',
                  icon: <AppstoreAddOutlined />,
                  label: 'Manage Quiz',
                },
                {
                  key: '3',
                  icon: <PieChartOutlined />,
                  label: 'Statistics',
                },
              ]}
              style={{ marginTop: 10 }}
              onClick={({ key }) => key === "1" ? navigate("/admin") : navigate("/admin/manage")}
            />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer, borderBottom: "1px solid #f6f6f6" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                marginLeft: 5,
                fontSize: '16px',
                width: 56,
                height: 56,
              }}
            />
          </Header>
          <Content>
            <div
              className={styles.outletWrapper}
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
              <FloatButton.BackTop duration={550} visibilityHeight={800} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AdminLayout;
