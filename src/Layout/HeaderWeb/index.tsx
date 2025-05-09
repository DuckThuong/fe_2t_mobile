import {
  HomeOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Layout, Menu, Modal, notification } from "antd";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import "./Navbar.scss";
import { FormInputSearch } from "../../Components/Form/FormInputSearch";

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
      onOk() {
        const userData = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (userData && token) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          notification.open({
            message: "Thông báo!",
            description: "Đăng xuất thành công.",
            placement: "topRight",
            showProgress: true,
            pauseOnHover: true,
            style: {
              backgroundColor: "#ffffff",
              borderLeft: "4px solid #007bff",
            },
          });
        } else {
          notification.open({
            message: "Thông báo!",
            description: "Đăng xuất thất bại.",
            placement: "topRight",
            showProgress: true,
            pauseOnHover: true,
            style: {
              backgroundColor: "#ffffff",
              borderLeft: "4px solid #007bff",
            },
          });
        }
        navigate(CUSTOMER_ROUTER_PATH.TRANG_CHU, { replace: true }); // Chuyển hướng về trang chủ
      },
      onCancel() {
        console.log("Hủy đăng xuất");
      },
    });
  };

  React.useEffect(() => {
    setSelectedKey(getSelectedKey(location.pathname));
  }, [location]);

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
                  backgroundColor: "#ff4d4f",
                  fontSize: "10px",
                  fontWeight: "bold",
                }}
              >
                <ShoppingCartOutlined
                  style={{ fontSize: 20, color: "white" }}
                />
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
            <Menu.Item key="logout" onClick={handleLogout} danger>
              <LogoutOutlined /> Đăng xuất
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;
