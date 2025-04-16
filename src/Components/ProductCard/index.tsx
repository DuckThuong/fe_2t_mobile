import { Button, Tooltip } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import "./productCard.scss";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  className: string;
  colors?: Array<{
    ProductID: number;
    ColorID: number;
    color: {
      ColorID: number;
      ColorName: string;
    };
  }>;
}

export const ProductCard: React.FC<{ product: ProductProps }> = ({
  product,
}) => {
  const navigate = useNavigate();
  
  return (
    <div className={`product-card ${product.className}`}>
      {/* Thêm onClick cho ảnh sản phẩm */}
      <img 
        src={product.image} 
        alt={product.name} 
        className="product-image"
        onClick={() => navigate(CUSTOMER_ROUTER_PATH.TRANG_CHU+ `/${product.id}`)}
        style={{ cursor: "pointer" }} // Thêm hiệu ứng con trỏ
      />
      
      <h3>{product.name}</h3>
      
      {product.description && (
        <Tooltip title={product.description} overlayClassName="custom-tooltip">
          <p>
            {product.description.length > 100
              ? `${product.description.substring(0, 100)}...`
              : product.description}
          </p>
        </Tooltip>
      )}

      <div className="product-colors">
        {product.colors?.map((color) => (
          <span
            key={color.ColorID}
            style={{
              backgroundColor: color.color.ColorName,
              padding: "5px",
              margin: "2px",
            }}
          />
        ))}
      </div>
      
      <div className="product-button">
        <p className="product-price">
          {product.price.toLocaleString("vi-VN")} VNĐ
        </p>
        <Button
          className="product-button_item"
          onClick={() => {
            navigate(CUSTOMER_ROUTER_PATH.CATERGORIES);
          }}
        >
          Mua ngay
        </Button>
      </div>
    </div>
  );
};