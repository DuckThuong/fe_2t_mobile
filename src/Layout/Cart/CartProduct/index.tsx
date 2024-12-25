import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { cartApi } from "../../../api/api";
import "../style.scss";
import { QUERY_KEY } from "../../../api/apiConfig";
interface CartProductProps {
  onSelectionChange: (selectedIds: number) => void;
}
interface UpdateCartItem {
  id: number;
  quantity: number;
}
export const CartProduct: React.FC<CartProductProps> = ({
  onSelectionChange,
}) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const { data: cartData, refetch } = useQuery({
    queryKey: [QUERY_KEY.GET_IMAGE],
    queryFn: () => cartApi.GetCartByUserId("3"),
  });
  const updateCart = useMutation({
    mutationFn: (payload: UpdateCartItem) =>
      cartApi.updateCartItem(payload.id, { Quantity: payload.quantity }),
    onSuccess: () => {
      refetch();
    },
  });

  const handleDecreaseQuantity = (id: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      const payload = {
        id: id,
        quantity: currentQuantity - 1,
      };
      updateCart.mutate(payload);
    }
  };

  const handleIncreaseQuantity = (id: number, currentQuantity: number) => {
    const payload = {
      id: id,
      quantity: currentQuantity + 1,
    };
    updateCart.mutate(payload);
  };
  const handleCheckboxChange = (
    id: number,
    price: string,
    quantity: number
  ) => {
    const isSelected = selectedItems.includes(id);
    let newSelectedItems = [...selectedItems];
    if (isSelected) {
      newSelectedItems = selectedItems.filter((item) => item !== id);
    } else {
      newSelectedItems = [...selectedItems, id];
    }
    setSelectedItems(newSelectedItems);
  };

  useEffect(() => {
    if (cartData) {
      const newTotalAmount = selectedItems.reduce((total, itemId) => {
        const item = cartData?.data?.data?.cart.find(
          (item) => item.CartID === itemId
        );
        if (item) {
          return total + item.Quantity * parseFloat(item.Product.Price);
        }
        return total;
      }, 0);
      onSelectionChange(newTotalAmount);
    }
  }, [selectedItems, cartData]);

  return (
    <div className="cart-product">
      {cartData?.data?.data?.cart.map((item) => (
        <React.Fragment key={item.CartID}>
          <Row className="cart-product_row">
            <Col className="cart-product_checkbox" span={1}>
              <Checkbox
                onChange={() =>
                  handleCheckboxChange(
                    item.CartID,
                    item.Product.Price,
                    item.Quantity
                  )
                }
                checked={selectedItems.includes(item.CartID)}
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
                <Col span={12}>{item.Product.Price} $</Col>
              </Row>
              <Row className="cart-product_information-quantity">
                <Col span={6}>Số lượng:</Col>
                <Col span={12}>
                  <Button
                    onClick={() =>
                      handleDecreaseQuantity(item.CartID, item.Quantity)
                    }
                    disabled={item.Quantity === 1}
                  >
                    -
                  </Button>
                  <span style={{ margin: "0 10px" }}>{item.Quantity}</span>
                  <Button
                    onClick={() =>
                      handleIncreaseQuantity(item.CartID, item.Quantity)
                    }
                  >
                    +
                  </Button>
                </Col>
              </Row>
              <Row className="cart-product_information-sum">
                <Col span={6}>Tổng</Col>
                <Col span={12}>
                  {(item.Quantity * parseFloat(item.Product.Price)).toFixed(2)}{" "}
                  $
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
