import { Layout } from "antd";
import HeaderAdminPage from "../../Components/HeaderAdminPage/headerAdminPage";
import SidebarAdminPage from "../../Components/SidebarAdminPage/SidebarAdminPage";
import "./AdminPage.scss";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <Layout className="admin-layout">
      <SidebarAdminPage />
      <Layout className="admin-main">
        <HeaderAdminPage />
        <Layout.Content className="admin-content">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
