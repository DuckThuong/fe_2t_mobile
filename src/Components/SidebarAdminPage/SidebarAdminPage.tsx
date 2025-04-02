import { Link } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import "../SidebarAdminPage/SidebarAdminPage.scss";
import { Menu } from "antd";
import {
  BankFilled,
  HomeFilled,
  LogoutOutlined,
  ShoppingOutlined,
  TeamOutlined,
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

        <Menu.SubMenu key="2" icon={<TeamOutlined />} title="Nhà cung cấp">
          <Menu.Item key="2-1">Danh sách nhà cung cấp</Menu.Item>
          <Menu.Item key="2-2">Thêm nhà cung cấp</Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="3" icon={<BankFilled />} title="Kho">
          <Menu.Item key="3-1">
            <Link to={ADMIN_ROUTE_NAME.PRODUCT_LIST}>Danh sách sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="3-2">Nhập hàng</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="4" icon={<ShoppingOutlined />}>
        <Link to={ADMIN_ROUTE_NAME.ORDER}>Hóa đơn</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<LogoutOutlined />}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SidebarAdminPage;
