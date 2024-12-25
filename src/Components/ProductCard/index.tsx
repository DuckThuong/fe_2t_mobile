import { Button, Tooltip } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import "./productCard.scss";
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  className?: string;
}
export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className={`product-card ${product.className}`}>
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <Tooltip title={product.description} overlayClassName="custom-tooltip">
        <p>
          {product.description.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description}
        </p>
      </Tooltip>
      <div className="product-button">
        <p className="product-price">
          {product.price.toLocaleString("vi-VN")} VNĐ
        </p>
        <Button
          className="product-button_item"
          onClick={() => {
            navigate(CUSTOMER_ROUTER_PATH.TRANG_CHU + `/${product.id}`);
          }}
        >
          Mua ngay
        </Button>
      </div>
    </div>
  );
};
