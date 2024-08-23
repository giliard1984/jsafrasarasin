import React, { useState, useContext } from "react";
import { Layout, ConfigProvider, Menu, Button, FloatButton } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "@contexts/AppContext";

import styles from "./Admin.module.scss";

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  // retrieved states and methods associated with the app context
  const {
    session
  } = useContext(AppContext);

  return (
    // defining the layout theme
    <ConfigProvider
      theme={{ components: {
        Layout: { bodyBg: "transparent", headerBg: "#fff" }
      } }}
    >
      <Layout className={styles.layout} hasSider>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="sm"
          width={300}
        >
          <div className={styles.siderImage}>
            {
              collapsed ?
                <img src="./jsafrasarasin-icon.jpg" className={styles.collapsedImage} /> :
                <div className={styles.expandedImage}>J. Safra Sarasin</div>
            }
          </div>

            {/* TODO: Move the onClick navigate to a lookup (switch) */}
            {/* TODO: If it is possible to extend the menu item to bring a new attr called url/path, that would be perfect */}
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['2']}
              items={[
                // {
                //   key: '1',
                //   icon: <HomeOutlined />,
                //   label: 'Home',
                // },
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
              className="spaceTopSM"
              onClick={({ key }) => key === "1" ? navigate("/admin-panel") : navigate("/quiz/manage")}
            />
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className={styles.collapseButton}
            />
            {session && <span>{`${session?.firstName} ${session?.lastName} | ${session?.email}`}</span>}
          </Header>
          <Content>
            <div className={styles.outletWrapper}>
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
