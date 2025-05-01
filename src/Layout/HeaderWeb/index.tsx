import {
  HomeOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge } from "antd"; 
import { Layout, Menu, Modal, notification } from "antd";  // Sửa phần import ở đây
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import "./Navbar.scss";
import { FormInputSearch } from "../../Components/Form/FormInputSearch";
import axios from "axios";

const { Header } = Layout;
const { confirm } = Modal;

interface NavbarProps {
  cartCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount = 0 }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = React.useState(
    getSelectedKey(location.pathname)
  );
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null); // Thêm state để lưu thông báo

  function getSelectedKey(pathname: string) {
    switch (pathname) {
      case CUSTOMER_ROUTER_PATH.TRANG_CHU:
        return "1";
      case CUSTOMER_ROUTER_PATH.CATERGORIES:
        return "2";
      case CUSTOMER_ROUTER_PATH.ORDER_LIST:
        return "3";
      case "/profile":
        return "4";
      default:
        return "1";
    }
  }

  const handleLogout = () => {
    confirm({
      title: "Bạn có muốn đăng xuất?",
      content: "Bạn sẽ cần đăng nhập lại để tiếp tục sử dụng dịch vụ.",
      async onOk() {
        try {
          const response = await axios.post(
            "http://localhost:3300/user/log-out",
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );
          if (response.status === 200) {
            localStorage.removeItem("accessToken"); // Xóa token
            navigate(""); // Điều hướng về trang đăng nhập

            // Thông báo đăng xuất thành công
            setNotification({
              message: "Đăng xuất thành công!",
              type: "success",
            });
          }
        } catch (error) {
          console.error("Đăng xuất thất bại:", error);
          
          // Thông báo đăng xuất thất bại
          setNotification({
            message: "Đăng xuất không thành công. Vui lòng thử lại.",
            type: "error",
          });
        }
      },
      onCancel() {
        console.log("Hủy đăng xuất");
      },
    });
  };

  React.useEffect(() => {
    setSelectedKey(getSelectedKey(location.pathname));
  }, [location]);

  React.useEffect(() => {
    if (notification) {
      notification[notification.type]({
        message: notification.message,
      });

      // Clear notification after 3 seconds
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <Layout>
      <Header className="navbar">
        <Link to={CUSTOMER_ROUTER_PATH.TRANG_CHU} className="logo">
          <img src="/logo.jpg" alt="Logo công ty" />
        </Link>
        <div className="navbar-search">
          <FormInputSearch
            name="search"
            inputProps={{ placeholder: "Tìm kiếm sản phẩm..." }}
            isShowIcon
          />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          className="menu"
        >
          <Menu.Item key="1" icon={<HomeOutlined />} className="menu-item">
            <Link to={CUSTOMER_ROUTER_PATH.TRANG_CHU}>Trang chủ</Link>
          </Menu.Item>

          <Menu.Item key="2" className="menu-item">
            <Link to={CUSTOMER_ROUTER_PATH.CATERGORIES}>
              <Badge 
                count={cartCount} 
                size="small" 
                offset={[5, -5]} 
                showZero={false} 
                style={{ 
                  backgroundColor: '#ff4d4f',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}
              >
                <ShoppingCartOutlined style={{ fontSize: 20, color:'white' }} />
              </Badge>
              <span style={{ marginLeft: 8 }}>Giỏ hàng</span>
            </Link>
          </Menu.Item>
          
          <Menu.Item
            key="3"
            icon={<OrderedListOutlined />}
            className="menu-item"
          >
            <Link to={CUSTOMER_ROUTER_PATH.ORDER_LIST}>Đơn hàng</Link>
          </Menu.Item>
    
          <Menu.SubMenu 
            key="personal" 
            icon={<UserOutlined />}
            title="Cá nhân"
            popupClassName="user-menu-dropdown"
          >
            <Menu.Item key="profile">
              <Link to="/profile">
                <UserOutlined /> Hồ sơ
              </Link>
            </Menu.Item>
            <Menu.Item key="settings">
              <Link to="/settings">
                <SettingOutlined /> Cài đặt
              </Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item 
              key="logout" 
              onClick={handleLogout}
              danger
            >
              <LogoutOutlined /> Đăng xuất
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;
