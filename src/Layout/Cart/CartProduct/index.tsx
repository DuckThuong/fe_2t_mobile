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
  const [selectedImageId, setselectedImageId] = useState<string | undefined>(
    undefined
  );
  const [selectedCartId, setselectedCartId] = useState<string | undefined>(
    undefined
  );
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined>(
    undefined
  );
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

  const handleColorChange = (cartItemId: number, colorId: number) => {
    const productImageInfo = cartData?.CartByUserId?.flatMap((cart) =>
      cart.CartItems.items.flatMap((item) => {
        const image = item.product.images.find(
          (image) => image.ColorID === colorId
        );
        if (image && item.CartItemID === cartItemId) {
          return {
            CartID: cart.CartID,
            ImageID: image.ImageID,
            ImageURL: image.ImageURL,
          };
        }
        return undefined;
      })
    ).find((info) => info !== undefined);

    if (productImageInfo) {
      setselectedImageId(productImageInfo.ImageID);
      setselectedCartId(productImageInfo.CartID);
      setSelectedImageUrl(productImageInfo.ImageURL);
    }
  };
  return (
    <div className="cart-product">
      {cartData?.CartByUserId?.map((cart) =>
        cart.CartItems.items.map((item) => (
          <React.Fragment key={item.CartItemID}>
            <Row className="cart-product_row">
              <Col className="cart-product_checkbox" span={1}>
                <Checkbox
                  onChange={() =>
                    handleCheckboxChange(
                      item.CartItemID,
                      item.product.Price,
                      item.Quantity
                    )
                  }
                  checked={selectedItems.includes(item.CartItemID)}
                />
              </Col>
              <Col className="cart-product_image" span={6}>
                <img
                  src={
                    selectedImageId && selectedCartId === cart.CartID
                      ? selectedImageUrl
                      : item.product.images[0].ImageURL
                  }
                  alt={item.product.ProductName}
                  className="product-image"
                />
              </Col>
              <Col className="cart-product_information" span={12}>
                <Row className="cart-product_information-name">
                  <Col span={6}>Sản phẩm:</Col>
                  <Col span={12}>{item.product.ProductName}</Col>
                </Row>
                <Row className="cart-product_information-description">
                  <Col span={6}>Chi tiết:</Col>
                  <Col span={12}>{item.product.Description}</Col>
                </Row>
                <Row>
                  <Col span={6}>Màu sắc:</Col>
                  <Col span={12}>
                    <div className="product-colors">
                      {item.product.productColors?.map((color) => {
                        const isColorSelected =
                          item.product.productColors?.find(
                            (image) => image.ColorID === color.ColorID
                          )?.ImageURL;

                        return (
                          <span
                            key={color.ColorID}
                            style={{
                              backgroundColor: color.color.ColorName,
                              padding: "5px",
                              margin: "2px",
                              border: "1px solid black",
                              cursor: "pointer",
                              transform: isColorSelected
                                ? "scale(1.1)"
                                : "none",
                            }}
                            onClick={() =>
                              handleColorChange(item.CartItemID, color.ColorID)
                            }
                          />
                        );
                      })}
                    </div>
                  </Col>
                </Row>
                <Row className="cart-product_information-price">
                  <Col span={6}>Giá:</Col>
                  <Col span={12}>{item.product.Price} $</Col>
                </Row>
                <Row className="cart-product_information-quantity">
                  <Col span={6}>Số lượng:</Col>
                  <Col span={12}>
                    <Button
                      onClick={() =>
                        handleDecreaseQuantity(item.CartItemID, item.Quantity)
                      }
                      disabled={item.Quantity === 1}
                    >
                      -
                    </Button>
                    <span style={{ margin: "0 10px" }}>{item.Quantity}</span>
                    <Button
                      onClick={() =>
                        handleIncreaseQuantity(item.CartItemID, item.Quantity)
                      }
                    >
                      +
                    </Button>
                  </Col>
                </Row>
                <Row className="cart-product_information-sum">
                  <Col span={6}>Tổng</Col>
                  <Col span={12}>
                    {(item.Quantity * parseFloat(item.product.Price)).toFixed(
                      2
                    )}{" "}
                    $
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="underline" />
          </React.Fragment>
        ))
      )}
    </div>
  );
};
