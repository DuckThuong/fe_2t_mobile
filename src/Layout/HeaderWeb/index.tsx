import {
  HomeOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import "./Navbar.scss";

const { Header } = Layout;

const Navbar = () => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = React.useState(
    getSelectedKey(location.pathname)
  );

  function getSelectedKey(pathname: string) {
    switch (pathname) {
      case CUSTOMER_ROUTER_PATH.TRANG_CHU:
        return "1";
      case CUSTOMER_ROUTER_PATH.CATERGORIES:
        return "2";
      case "/order":
        return "3";
      case "/profile":
        return "4";
      default:
        return "1";
    }
  }
  React.useEffect(() => {
    setSelectedKey(getSelectedKey(location.pathname));
  }, [location]);

  return (
    <Layout>
      <Header className="navbar">
        <div className="logo">Logo</div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          className="menu"
        >
          <Menu.Item key="1" icon={<HomeOutlined />} className="menu-item">
            <Link to={CUSTOMER_ROUTER_PATH.TRANG_CHU}>Trang chủ</Link>
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<ShoppingCartOutlined />}
            className="menu-item"
          >
            <Link to={CUSTOMER_ROUTER_PATH.CATERGORIES}>Giỏ hàng</Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<OrderedListOutlined />}
            className="menu-item"
          >
            <Link to={CUSTOMER_ROUTER_PATH.ORDER_LIST}>Đơn hàng</Link>
          </Menu.Item>
          <Menu.Item key="4" title="Cài đặt" className="menu-item">
            <Menu.SubMenu icon={<UserOutlined />}>
              <Menu.Item title="Tài khoản" icon={<UserOutlined />} key="5-1">
                <Link to="/profile">Thông tin cá nhân</Link>
              </Menu.Item>
              <Menu.Item icon={<LogoutOutlined />} key="5-2">
                <Link to="/logout">Đăng xuất</Link>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;
