import { Link } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import "../SidebarAdminPage/SidebarAdminPage.scss";
import { Menu } from "antd";
import {
  BankFilled,
  HomeFilled,
  LogoutOutlined,
  PercentageOutlined,
  PlusCircleOutlined,
  ShoppingOutlined,
  SwapOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ADMIN_ROUTER_PATH} from "../../Routers/Routers";

const SidebarAdminPage = () => {
  return (
    <Sider className="admin-sidebar">
      <img src="/logo.jpg" alt="" className="logo" />
      <Menu mode="inline" defaultSelectedKeys={["1"]} className="admin-menu">
        <Menu.Item key="1" icon={<HomeFilled />}>
          <Link to={ADMIN_ROUTER_PATH.DASHBOARD}>Tổng quan</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to={ADMIN_ROUTER_PATH.USER_LIST}>Người dùng</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<SwapOutlined />}>
          Nhà cung cấp
          <Link to={ADMIN_ROUTER_PATH.PROVIDER_LIST}></Link>
        </Menu.Item>

        <Menu.Item key="4" icon={<BankFilled />}>
          Kho
          <Link to={ADMIN_ROUTER_PATH.PRODUCT_LIST}></Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<ShoppingOutlined />}>
          <Link to={ADMIN_ROUTER_PATH.ORDER}>Hóa đơn</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<PlusCircleOutlined />}>
          <Link to={ADMIN_ROUTER_PATH.ADDBILL_CLIENT}>Thêm HĐ khách hàng</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<PlusCircleOutlined />}>
          <Link to={ADMIN_ROUTER_PATH.ADDBILL_PROVIDER}>Thêm HĐ nhà cung cấp</Link>
        </Menu.Item>
        <Menu.Item key="8" icon={<PercentageOutlined />}>
          <Link to={ADMIN_ROUTER_PATH.PROMOTION_LIST}>Khuyến mãi</Link>
        </Menu.Item>
        <Menu.Item key="9" icon={<LogoutOutlined />}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SidebarAdminPage;
