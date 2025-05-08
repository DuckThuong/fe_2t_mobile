import React, { useRef, useState } from "react";
import { 
  UnorderedListOutlined,
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



interface ProductImage {
  id: number;
  img: string;
  bannerIndex: number;
  title :string;
}

const App: React.FC = () => {
  const carouselRef = useRef<any>(null);
  const [selectedContent, setSelectedContent] = useState("Chọn danh mục bên trái");
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();




  // Product images - tương ứng với các banner
  const productImages: ProductImage[] = [
    {
      id: 1,
      img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/dien-thoai-samsung-galaxy-m55-5g-8gb-256gb-moi.png",
      bannerIndex: 1,
       title: "Tin sốc 1"
    },
    {
      id: 2,
      img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/iphone-16-pro-max-thu-cu-moi-home.jpg",
      bannerIndex: 2,
      title: "Tin sốc 1"
    },
    {
      id: 3,
      img: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/c7/f6/c7f6e01395bf270e9d9bb9795d74ebf3.png",
      bannerIndex: 3,
      title: "Tin sốc 1"
    },
    {
      id: 4,
      img: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/c1/8d/c18de02da648ceb2e6ea6d1e7def18aa.png",
      bannerIndex: 4,
      title: "Tin sốc 1"
    },
    {
      id: 5,
      img: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/8b/45/8b4570e3fbab8cfae7f55324bd4e1909.png",
      bannerIndex: 5,
      title: "Tin sốc 1"
    },
  ];

  // Menu data
  const menuItems = {
     list: [
      { key: "1", label: "Dòng iPhone 16" },
      
      
    ],
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
             
                
                <Button 
                  icon={<UnorderedListOutlined />} 
                  block 
                  className="menu-button"
                  onClick={() => navigate(CUSTOMER_ROUTER_PATH.TRANG_DS_SP)}
                >
                  LIST
                </Button>
              
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
              {/* <Carousel 
                ref={carouselRef}
                dots={false}
                className="promo-carousel"
                beforeChange={handleBeforeChange}
              >
                {productImages.map((banner) => (
                  <Card key={banner.id} className="promo-card">
                    <div className="banner-wrapper">
                      <div className="banner-image-container">
                        <img
                          src={banner.img}
                          
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
                      
                    </div>
                  </Card>
                ))}
              </Carousel> */}
              <Carousel
                ref={carouselRef}
                dots={false}
                className="promo-carousel"
                beforeChange={handleBeforeChange}
              >
                {productImages.map((item) => (
                  <Card key={item.id} className="promo-card">
                    <div className="banner-wrapper">
                      <div className="banner-image-container">
                        <img
                          src={item.img}
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
                    <div className="product-title">{product.title}</div>
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