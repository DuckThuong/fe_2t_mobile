import { Link } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import "../SidebarAdminPage/SidebarAdminPage.scss";
import { Menu } from "antd";
import {
  BankFilled,
  HomeFilled,
  LogoutOutlined,
  ShoppingOutlined,
  SwapOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ADMIN_ROUTE_NAME } from "../../Routers/Routers";

const SidebarAdminPage = () => {
  return (
    <Sider className="admin-sidebar">
      <img src="/logotao.png" alt="" className="logo" />
      <Menu mode="inline" defaultSelectedKeys={["1"]} className="admin-menu">
        <Menu.Item key="1" icon={<HomeFilled />}>
          <Link to={ADMIN_ROUTE_NAME.DASHBOARD}>Tổng quan</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to={ADMIN_ROUTE_NAME.USER_LIST}>Người dùng</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<SwapOutlined />}>
          Nhà cung cấp
          <Link to={ADMIN_ROUTE_NAME.SUPPLIER_LIST}></Link>
        </Menu.Item>

        <Menu.Item key="4" icon={<BankFilled />}>
          Kho
          <Link to={ADMIN_ROUTE_NAME.PRODUCT_LIST}></Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<ShoppingOutlined />}>
          <Link to={ADMIN_ROUTE_NAME.ORDER}>Hóa đơn</Link>
        </Menu.Item>
        
        <Menu.Item key="6" icon={<LogoutOutlined />}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SidebarAdminPage;
