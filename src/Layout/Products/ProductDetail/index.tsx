import { useEffect, useState } from "react";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./style.scss";
import Navbar from "../../HeaderWeb";
import { FooterWeb } from "../../FooterWeb";
import { ListProduct } from "../../TrangChu/ListProducts";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "../../../Routers/Routers";

export const ProductDetail = () => {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedStorage, setSelectedStorage] = useState<string>("");
  const [showNavButtons, setShowNavButtons] = useState(false);

  const banners = [
    {
      id: 1,
      img: [
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png",
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max-2.png",
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max-3.png",
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max-4.png",
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max-5.png",
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max-6.png",
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max-7.png",
      ],
      name: "iPhone 16 Pro Max",
      price: [
        "30590000",
        "37190000",
        "41790000"
      ],
      details: "Cho đơn hàng điện thoại bất kỳ\n*Tùy sản phẩm, áp dụng mua tại cửa hàng",
      color: ["Titan đen", "Titan sa mạc", "Titan tự nhiên", "Titan trắng"],
      capacity: [ "256GB", "512GB", "1TB"]
    }
  ];
  const parameter = [
  {
    id: 1,
    kichThuocManHinh: "6.9 inches",
    congNgheManHinh: "Dynamic AMOLED 2X",
    cameraSau: [
      "Camera siêu rộng 50MP",
      "Camera góc rộng 200 MP",
      "Camera Tele (5x) 50MP",
      "Camera Tele (3x) 10MP"
    ],
    cameraTruoc: "12 MP",
    chipset: "Snapdragon 8 Elite dành cho Galaxy (3nm)",
    congNgheNFC: "Có",
    dungLuongRAM: "12 GB",
    boNhoTrong: "1 TB",
    pin: "5000 mAh",
    theSIM: "2 Nano-SIM + eSIM",
    heDieuHanh: "Android 17",
    doPhanGiaiManHinh: "3120 x 1440 pixels (Quad HD+)",
    tinhNangManHinh: ["120Hz", "2600 nits", "Corning® Gorilla® Armor 2"]
  }
];
  

  const product = banners[0]; // Lấy sản phẩm đầu tiên trong mảng

  useEffect(() => {
    if (product.img.length > 0) {
      setSelectedImageUrl(product.img[0]);
    }
    if (product.color.length > 0) {
      setSelectedColor(product.color[0]);
    }
    if (product.capacity.length > 0) {
      setSelectedStorage(product.capacity[0]);
    }
  }, []);

  const handleImageClick = (url: string) => {
    setSelectedImageUrl(url);
  };

  const handlePrevImage = () => {
    const currentIndex = product.img.indexOf(selectedImageUrl);
    const prevIndex = (currentIndex - 1 + product.img.length) % product.img.length;
    setSelectedImageUrl(product.img[prevIndex]);
  };

  const handleNextImage = () => {
    const currentIndex = product.img.indexOf(selectedImageUrl);
    const nextIndex = (currentIndex + 1) % product.img.length;
    setSelectedImageUrl(product.img[nextIndex]);
  };
    const navigate = useNavigate();

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(price));
  };

  return (
    <>
    <Navbar />
    <div className="product-detail-container">
      <div className="product-detail">
        {/* Phần ảnh (chiếm 3/5) */}
        <div className="product-gallery">
          <div 
            className="main-image-container"
            onMouseEnter={() => setShowNavButtons(true)}
            onMouseLeave={() => setShowNavButtons(false)}
          >
            {selectedImageUrl ? (
              <img 
                className="main-image" 
                src={selectedImageUrl} 
                alt={product.name} 
              />
            ) : (
              <div className="image-placeholder">Ảnh sản phẩm</div>
            )}
            
            {showNavButtons && (
              <>
                <button 
                  className="nav-button prev" 
                  onClick={handlePrevImage}
                >
                  <LeftOutlined />
                </button>
                <button 
                  className="nav-button next" 
                  onClick={handleNextImage}
                >
                  <RightOutlined />
                </button>
              </>
            )}
          </div>

          <div className="thumbnail-container">
            {product.img.map((imgUrl, index) => (
              <div 
                key={index}
                className={`thumbnail ${selectedImageUrl === imgUrl ? 'active' : ''}`}
                onClick={() => handleImageClick(imgUrl)}
              >
                <img src={imgUrl} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Phần thông tin (chiếm 2/5) */}
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>

          {/* Phần chọn dung lượng */}
          <div className="option-group">
            <span className="option-title">Dung lượng</span>
            <div className="option-list">
              {product.capacity.map((capacity, index) => (
                <div
                  key={index}
                  className={`option-item ${selectedStorage === capacity ? 'active' : ''}`}
                  onClick={() => setSelectedStorage(capacity)}
                >
                  {capacity}
                </div>
              ))}
            </div>
          </div>

          {/* Phần chọn màu sắc */}
          <div className="option-group">
            <span className="option-title">Màu sắc</span>
            <div className="option-list">
              {product.color.map((color, index) => (
                <div
                  key={index}
                  className={`option-item ${selectedColor === color ? 'active' : ''}`}
                  onClick={() => setSelectedColor(color)}
                  
                  title={color}
                >
                  <span className="color-name">{color}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Phần giá */}
          <div className="price-section">
            <div className="current-price">
              {formatPrice(product.price[product.capacity.indexOf(selectedStorage)])}
            </div>
            
          </div>

          {/* Nút hành động */}
          <div className="action-buttons">
            <Button 
              type="primary" 
              className="btn btn-primary"
              size="large"
              onClick={() => {
                          navigate(CUSTOMER_ROUTER_PATH.CATERGORIES);
                        }}
            >
              Mua Ngay
            </Button>
            <Button 
              type="default" 
              className="btn btn-secondary"
              size="large"
            >
              Thêm Vào Giỏ Hàng
            </Button>
          </div>
        </div>
      </div>

    </div>
    <div className="tech-specs-container">
        <div className="tech-specs-header">
          <h2>Thông số kỹ thuật</h2>
        </div>
        <div className="tech-specs-content">
          <div className="tech-specs-column">
            <div className="spec-item">
              <span className="spec-title">Màn hình:</span>
              <span className="spec-value">{parameter[0].kichThuocManHinh}</span>
            </div>
            <div className="spec-item">
              <span className="spec-title">Công nghệ màn hình:</span>
              <span className="spec-value">{parameter[0].congNgheManHinh}</span>
            </div>
            <div className="spec-item">
              <span className="spec-title">Độ phân giải:</span>
              <span className="spec-value">{parameter[0].doPhanGiaiManHinh}</span>
            </div>
            <div className="spec-item">
              <span className="spec-title">Tính năng màn hình:</span>
              <span className="spec-value">
                {parameter[0].tinhNangManHinh.join(", ")}
              </span>
            </div>
            <div className="spec-item">
              <span className="spec-title">Camera sau:</span>
              <span className="spec-value">
                {parameter[0].cameraSau.join(", ")}
              </span>
            </div>
          </div>
          
          <div className="tech-specs-column">
            <div className="spec-item">
              <span className="spec-title">Camera trước:</span>
              <span className="spec-value">{parameter[0].cameraTruoc}</span>
            </div>
            <div className="spec-item">
              <span className="spec-title">Chipset:</span>
              <span className="spec-value">{parameter[0].chipset}</span>
            </div>
            <div className="spec-item">
              <span className="spec-title">RAM:</span>
              <span className="spec-value">{parameter[0].dungLuongRAM}</span>
            </div>
            <div className="spec-item">
              <span className="spec-title">Bộ nhớ trong:</span>
              <span className="spec-value">{parameter[0].boNhoTrong}</span>
            </div>
            <div className="spec-item">
              <span className="spec-title">Pin:</span>
              <span className="spec-value">{parameter[0].pin}</span>
            </div>
          </div>
          
          <div className="tech-specs-column">
            <div className="spec-item">
              <span className="spec-title">Thẻ SIM:</span>
              <span className="spec-value">{parameter[0].theSIM}</span>
            </div>
            <div className="spec-item">
              <span className="spec-title">Hệ điều hành:</span>
              <span className="spec-value">{parameter[0].heDieuHanh}</span>
            </div>
            <div className="spec-item">
              <span className="spec-title">NFC:</span>
              <span className="spec-value">{parameter[0].congNgheNFC}</span>
            </div>
          </div>
        </div>
      </div>
    <div className="home_content">
              <div className="home-list_header">
                <p className="home-list_header-title">
                  Danh sách sản phẩm liên quan
                </p>
              </div>
              <ListProduct itemPerPage={4} />
            </div>
       <div style={{ width: "auto", height: "30px" }}>
      </div>
    <FooterWeb />
    </>
  );
};

