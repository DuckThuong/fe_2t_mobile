import React, { useRef, useState } from "react";
import { 
  AndroidFilled, 
  AppleFilled, 
  CustomerServiceOutlined,
  LeftOutlined,
  RightOutlined 
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Button, Card, Carousel } from "antd";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "../../../Routers/Routers";

const { Content, Sider } = Layout;

interface MenuItem {
  key: string;
  label: string;
}

interface BannerItem {
  id: number;
  img: string;
  title: string;
  description: string;
}

interface ProductImage {
  id: number;
  img: string;
  bannerIndex: number;
}

const App: React.FC = () => {
  const carouselRef = useRef<any>(null);
  const [selectedContent, setSelectedContent] = useState("Chọn danh mục bên trái");
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Banner data
  const banners: BannerItem[] = [
    {
      id: 1,
      img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/500k-gia-dung-3.png",
      title: "GIẢM NGAY 500K",
      description: "MUA KÈM GIÀ DỤNG",
    },
    {
      id: 2,
      img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/s23-ultra-690-300.png",
      title: "SAMSUNG S23 ULTRA",
      description: "GIẢM GIÁ SỐC",
    },
    {
      id: 3,
      img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/oppo-690-300.png",
      title: "OPPO RENO 10",
      description: "ƯU ĐÃI ĐẶC BIỆT",
    },
  ];

  // Product images - tương ứng với các banner
  const productImages: ProductImage[] = [
    {
      id: 1,
      img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:80/plain/https://dashboard.cellphones.com.vn/storage/500k-gia-dung-thumb.png",
      bannerIndex: 0
    },
    {
      id: 2,
      img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:80/plain/https://dashboard.cellphones.com.vn/storage/s23-ultra-thumb.png",
      bannerIndex: 1
    },
    {
      id: 3,
      img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:80/plain/https://dashboard.cellphones.com.vn/storage/oppo-reno10-thumb.png",
      bannerIndex: 2
    },
    {
      id: 4,
      img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:80/plain/https://dashboard.cellphones.com.vn/storage/iphone-14-pro-thumb.png",
      bannerIndex: 0
    },
    {
      id: 5,
      img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:80/plain/https://dashboard.cellphones.com.vn/storage/xiaomi-13-thumb.png",
      bannerIndex: 1
    },
  ];

  // Menu data
  const menuItems = {
    ios: [
      { key: "1", label: "Dòng iPhone 16" },
      { key: "2", label: "Dòng iPhone 15" },
      { key: "3", label: "Dòng iPhone 14" },
      { key: "4", label: "Dòng iPhone 13" },
      { key: "5", label: "Dòng iPhone 12" },
      { key: "6", label: "Dòng iPhone 11" },
      { key: "7", label: "Dòng iPhone 10" },
      { key: "8", label: "Dòng iPhone 8" },
      { key: "9", label: "Dòng iPhone 7" },
    ],
    android: [
      { key: "10", label: "Samsung" },
      { key: "11", label: "Xiaomi" },
      { key: "12", label: "Oppo" },
      { key: "14", label: "Realme" },
      { key: "15", label: "Vivo" },
      { key: "16", label: "Sony" },
    ],
    accessories: [
      { key: "17", label: "Tai nghe" },
      { key: "18", label: "Cáp sạc" },
      { key: "19", label: "Củ sạc" },
    ],
  };

  const handleMenuClick = (category: string, label: string) => {
    setSelectedContent(`${category}: ${label}`);
  };

  const handleProductClick = (bannerIndex: number) => {
    setCurrentSlide(bannerIndex);
    carouselRef.current?.goTo(bannerIndex);
  };

  const handleBeforeChange = (from: number, to: number) => {
    setCurrentSlide(to);
  };

  return (
    <Layout className="app-layout">
      <div className="layout-container">
        <Layout className="inner-layout">
          {/* Menu bên trái */}
          <Sider className="menu-sider" width={200}>
            <div className="menu-container">
              <Dropdown
                overlay={
                  <Menu
                    items={menuItems.ios}
                    onClick={({ key }) => {
                      const item = menuItems.ios.find(i => i.key === key);
                      // if (item) handleMenuClick("IOS", item.label);
                      if (item){
                        handleMenuClick("IOS", item.label);
                        navigate(CUSTOMER_ROUTER_PATH.TRANG_DS_SP);
                      }
                    }}
                  />
                }
                trigger={["click"]}
                placement="bottomLeft"
              >
                <Button icon={<AppleFilled />} block className="menu-button">
                  IOS
                </Button>
              </Dropdown>

              <Dropdown
                overlay={
                  <Menu
                    items={menuItems.android}
                    onClick={({ key }) => {
                      const item = menuItems.android.find(i => i.key === key);
                      if (item){
                        handleMenuClick("IOS", item.label);
                        navigate(CUSTOMER_ROUTER_PATH.TRANG_DS_SP);
                      }
                    }}
                  />
                }
                trigger={["click"]}
                placement="bottomLeft"
              >
                <Button icon={<AndroidFilled />} block className="menu-button">
                  Android
                </Button>
              </Dropdown>

              <Dropdown
                overlay={
                  <Menu
                    items={menuItems.accessories}
                    onClick={({ key }) => {
                      const item = menuItems.accessories.find(i => i.key === key);
                      if (item){
                        handleMenuClick("IOS", item.label);
                        navigate(CUSTOMER_ROUTER_PATH.TRANG_DS_SP);
                      }
                    }}
                  />
                }
                trigger={["click"]}
                placement="bottomLeft"
              >
                <Button icon={<CustomerServiceOutlined />} block className="menu-button">
                  Phụ kiện
                </Button>
              </Dropdown>
            </div>
          </Sider>

          {/* Content chính */}
          <Content className="main-content">
            <div className="banner-container">
              <Carousel 
                ref={carouselRef}
                dots={false}
                className="promo-carousel"
                beforeChange={handleBeforeChange}
              >
                {banners.map((banner) => (
                  <Card key={banner.id} className="promo-card">
                    <div className="banner-wrapper">
                      <div className="banner-image-container">
                        <img
                          src={banner.img}
                          alt={banner.title}
                          className="banner-image"
                        />
                        <Button 
                          className="carousel-button prev-button"
                          icon={<LeftOutlined />}
                          onClick={() => carouselRef.current?.prev()}
                        />
                        <Button 
                          className="carousel-button next-button"
                          icon={<RightOutlined />}
                          onClick={() => carouselRef.current?.next()}
                        />
                      </div>
                      <div className="banner-text">
                        <h2>{banner.title}</h2>
                        <h3>{banner.description}</h3>
                      </div>
                    </div>
                  </Card>
                ))}
              </Carousel>

              {/* Các ảnh sản phẩm dưới banner */}
              <div className="product-grid">
                {productImages.map((product) => (
                  <div 
                    key={product.id}
                    className={`product-item ${currentSlide === product.bannerIndex ? 'active' : ''}`}
                    onClick={() => handleProductClick(product.bannerIndex)}
                  >
                    <img 
                      src={product.img} 
                      alt={`Product ${product.id}`} 
                      className="product-image" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </Content>
        </Layout>
      </div>
    </Layout>
  );
};

export default App;