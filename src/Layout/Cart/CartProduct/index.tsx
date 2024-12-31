import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Col, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import { cartApi } from "../../../api/api";
import { QUERY_KEY } from "../../../api/apiConfig";
import { DeleteOutlined } from "@ant-design/icons";

interface CartProductProps {
  onSelectionChange: (totalAmount: number) => void;
}

interface UpdateCartItem {
  id: number;
  quantity: number;
}

export const CartProduct: React.FC<CartProductProps> = ({
  onSelectionChange,
}) => {
  const [selectedImageUrls, setSelectedImageUrls] = useState<{
    [key: number]: string;
  }>({});
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const userJSON = localStorage.getItem("user");
  const user = userJSON ? JSON.parse(userJSON) : null;

  const { data: cartData, refetch } = useQuery({
    queryKey: [QUERY_KEY.GET_IMAGE, user],
    queryFn: () => cartApi.GetCartByUserId(user.UserID),
  });

  const updateCart = useMutation({
    mutationFn: (payload: UpdateCartItem) =>
      cartApi.updateCartItem(payload.id, { Quantity: payload.quantity }),
    onSuccess: () => {
      refetch();
      message.success("Cập nhật thành công");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
  const deleteCart = useMutation({
    mutationFn: (id: string) => cartApi.deleteCartItem(id),
    onSuccess: () => {
      refetch();
      message.success("Giỏ hàng đã được xóa thành công");
    },
    onError: (error) => {
      message.error(error.message);
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

  const calculateTotal = (ids: number[]) => {
    return cartData?.CartByUserId?.reduce((total, cart) => {
      return (
        total +
        cart.CartItems.items.reduce((subTotal, item) => {
          if (ids.includes(item.CartItemID)) {
            return subTotal + item.Quantity * parseFloat(item.product.Price);
          }
          return subTotal;
        }, 0)
      );
    }, 0).toFixed(2);
  };

  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    setSelectedIds((prevSelectedIds) => {
      const updatedIds = isChecked
        ? [...prevSelectedIds, id]
        : prevSelectedIds.filter((selectedId) => selectedId !== id);

      const updatedTotal = calculateTotal(updatedIds);
      onSelectionChange(Number(updatedTotal));

      return updatedIds;
    });
  };

  const handleColorChange = (colorId: number, cartItemId: number) => {
    const productImageUrl = cartData?.CartByUserId?.flatMap(
      (cart) => cart.CartItems.items
    )
      .find((item) => item.CartItemID === cartItemId)
      ?.product.images.find((image) => image.ColorID === colorId)?.ImageURL;

    if (productImageUrl) {
      setSelectedImageUrls((prev) => ({
        ...prev,
        [cartItemId]: productImageUrl,
      }));
    }
  };

  const handleDeleteCart = (id: string) => {
    try {
      deleteCart.mutate(id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const total = calculateTotal(selectedIds);
    onSelectionChange(Number(total));
  }, [selectedIds, cartData]);

  return (
    <div className="cart-product">
      {cartData?.CartByUserId?.map((cart) =>
        cart.CartItems.items.map((item) => (
          <React.Fragment key={item.CartItemID}>
            <Row className="cart-product_row">
              <Col className="cart-product_checkbox" span={1}>
                <Checkbox
                  onChange={(e) =>
                    handleCheckboxChange(item.CartItemID, e.target.checked)
                  }
                />
              </Col>
              <Col className="cart-product_image" span={6}>
                <img
                  src={
                    selectedImageUrls[item.CartItemID] ||
                    item.product.images[0].ImageURL
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
                <Row className="cart-product_information-price">
                  <Col span={6}>Giá:</Col>
                  <Col span={12}>{item.product.Price} $</Col>
                </Row>
                <Row className="cart-product_information-price">
                  <Col span={6}>Màu:</Col>
                  <Col span={12} className="product-colors">
                    {item?.product?.productColors?.map((color) => {
                      const isColorSelected =
                        item?.product?.productColors?.find(
                          (image) => image.ColorID === color.ColorID
                        )?.ImageURL === selectedImageUrls[item.CartItemID];

                      return (
                        <span
                          key={color.ColorID}
                          style={{
                            backgroundColor: color.color?.ColorName,
                            padding: "5px",
                            margin: "2px",
                            border: "1px solid black",
                            cursor: "pointer",
                            transform: isColorSelected ? "scale(1.1)" : "none",
                          }}
                          onClick={() =>
                            handleColorChange(color.ColorID, item.CartItemID)
                          }
                        />
                      );
                    })}
                  </Col>
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
                <Row
                  className="cart-product_information-sum"
                  justify={"center"}
                >
                  <Col span={6}>
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteCart(item.CartID)}
                    >
                      Xóa
                    </Button>
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
