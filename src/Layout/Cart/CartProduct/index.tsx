import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { cartApi } from "../../../api/api";
import { QUERY_KEY } from "../../../configs/apiConfig";
import "../style.scss";
import { Checkbox, Col, Row } from "antd";
export const CartProduct = () => {
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const { data: cartData } = useQuery({
    queryKey: [QUERY_KEY.GET_IMAGE],
    queryFn: () => cartApi.GetCartByUserId("3"),
  });

  const handleCheckboxChange = (e, productId: number) => {
    if (e.target.checked) {
      setSelectedProductIds((prev) => [...prev, productId]);
    } else {
      setSelectedProductIds((prev) => prev.filter((id) => id !== productId));
    }
  };
  return (
    <div className="cart-product">
      {cartData?.data?.data?.cart?.map((item) => (
        <React.Fragment>
          <Row className="cart-product_row">
            <Col className="cart-product_checkbox" span={1}>
              <Checkbox
                onChange={(e) =>
                  handleCheckboxChange(e, item.Product.ProductID)
                }
              />
            </Col>
            <Col className="cart-product_image" span={3}>
              <Row>
                <img
                  src={item.Product.image}
                  alt={item.Product.name}
                  className="product-image"
                />
              </Row>
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
