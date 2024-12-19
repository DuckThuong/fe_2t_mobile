import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  InfoCircleOutlined,
  ContactsOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./Navbar.scss";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";

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
      case "/about":
        return "2";
      case "/contact":
        return "3";
      case CUSTOMER_ROUTER_PATH.CATERGORIES:
        return "4";
      case "/profile":
        return "5";
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
            icon={<InfoCircleOutlined />}
            className="menu-item"
          >
            <Link to="/about">Giới thiệu</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ContactsOutlined />} className="menu-item">
            <Link to="/contact">Liên hệ</Link>
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<ShoppingCartOutlined />}
            className="menu-item"
          >
            <Link to={CUSTOMER_ROUTER_PATH.CATERGORIES}>Giỏ hàng</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<UserOutlined />} className="menu-item">
            <Link to="/profile">Tải khoản</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;
