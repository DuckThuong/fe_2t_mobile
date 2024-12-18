import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom"; // Sử dụng Link từ react-router-dom
import {
  HomeOutlined,
  InfoCircleOutlined,
  ContactsOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./Navbar.scss"; // Sử dụng SASS để tùy chỉnh giao diện
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Layout>
      <Header className="navbar">
        <div
          className="logo"
          style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}
        >
          Logo
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          className="menu"
          style={{ lineHeight: "64px" }}
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
            key="3"
            icon={<ShoppingCartOutlined />}
            className="menu-item"
          >
            <Link to="/contact">Giỏ hàng</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />} className="menu-item">
            <Link to="/contact">Tải khoản</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;
