import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { cartApi } from "../../../api/api";
import { QUERY_KEY } from "../../../configs/apiConfig";
import "../style.scss";
import { Checkbox, Col, Row } from "antd";

interface CartProductProps {
  onSelectionChange: (selectedIds: number[]) => void;
}

export const CartProduct: React.FC<CartProductProps> = ({
  onSelectionChange,
}) => {
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  const { data: cartData, isLoading } = useQuery({
    queryKey: [QUERY_KEY.GET_IMAGE],
    queryFn: () => cartApi.GetCartByUserId("3"),
  });

  const handleCheckboxChange = (e, productId: number) => {
    setSelectedProductIds((prevSelectedIds) => {
      let updatedSelectedIds: number[];

      if (e.target.checked) {
        updatedSelectedIds = [...prevSelectedIds, productId];
      } else {
        updatedSelectedIds = prevSelectedIds.filter((id) => id !== productId);
      }
      const selectedItems = cartData?.data?.data?.cart.filter((item) =>
        updatedSelectedIds.includes(item.Product.ProductID)
      );
      const totalAmount = selectedItems
        ? selectedItems.reduce(
            (total, item) =>
              total + item.Quantity * parseFloat(item.Product.Price),
            0
          )
        : 0;
      onSelectionChange(totalAmount.toFixed(2));

      return updatedSelectedIds;
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!cartData?.data?.data?.cart?.length) {
    return <div>Giỏ hàng trống</div>;
  }

  return (
    <div className="cart-product">
      {cartData?.data?.data?.cart.map((item) => (
        <React.Fragment key={item.CartID}>
          <Row className="cart-product_row">
            <Col className="cart-product_checkbox" span={1}>
              <Checkbox
                onChange={(e) =>
                  handleCheckboxChange(e, item.Product.ProductID)
                }
                checked={selectedProductIds.includes(item.Product.ProductID)} // Ensure checkbox is checked based on state
              />
            </Col>
            <Col className="cart-product_image" span={3}>
              <img
                src={item.Product.ImageURL}
                alt={item.Product.Name}
                className="product-image"
              />
            </Col>
            <Col className="cart-product_information" span={12}>
              <Row className="cart-product_information-name">
                <Col span={6}>Sản phẩm:</Col>
                <Col span={12}>{item.Product.Name}</Col>
              </Row>
              <Row className="cart-product_information-description">
                <Col span={6}>Chi tiết:</Col>
                <Col span={12}>{item.Product.Description}</Col>
              </Row>
              <Row className="cart-product_information-price">
                <Col span={6}>Giá:</Col>
                <Col span={12}>{item.Product.Price}</Col>
              </Row>
              <Row className="cart-product_information-quantity">
                <Col span={6}>Số lượng:</Col>
                <Col span={12}>{item.Quantity}</Col>
              </Row>
              <Row className="cart-product_information-sum">
                <Col span={6}>Tổng</Col>
                <Col span={12}>
                  {(item.Quantity * parseFloat(item.Product.Price)).toFixed(2)}
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="underline" />
        </React.Fragment>
      ))}
    </div>
  );
};
