import React/* , { useContext } */ from "react";
import { Row, Col, Layout, theme, ConfigProvider, Input, FloatButton, Switch } from 'antd';
// import { SearchOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Outlet } from "react-router-dom";
// import { AppContext } from "@contexts/AppContext";

// import styles from "./Admin.module.scss";

const { /* Header, */ Content } = Layout;

const AdminLayout: React.FC = () => {
  const { token: { borderRadiusLG } } = theme.useToken(); // antd token

  // retrieved states and methods associated with the app context
  // const {
  // } = useContext(AppContext);

  return (
    // defining the layout theme
    <ConfigProvider
      theme={{ components: { Layout: { bodyBg: "transparent", headerBg: "#fff" } } }}
    >
      <Layout>
        <Content>
          <div
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

export default AdminLayout;
