import { Button, Col, Row } from "antd";
import { useState } from "react";
import { SvgNull } from "../../Components/@svg/SvgNull";
import { FormSelect } from "../../Components/Form/FormSelect";
import { FooterWeb } from "../FooterWeb";
import Navbar from "../HeaderWeb";
import "./style.scss";
import { BackwardOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { CartProduct } from "./CartProduct";
import { QUERY_KEY } from "../../api/apiConfig";
import { useQuery } from "@tanstack/react-query";
import { cartApi, paymentApi } from "../../api/api";
export const Cartergories = () => {
  const [cartSum, setCartSum] = useState<number>();
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const userJSON = localStorage.getItem("user");
  const user = userJSON ? JSON.parse(userJSON) : null;

  const { data: cartData } = useQuery({
    queryKey: [QUERY_KEY.GET_IMAGE, user],
    queryFn: () => cartApi.GetCartByUserId(user.UserID),
  });
  const { data: paymentData } = useQuery({
    queryKey: [QUERY_KEY.GET_PAYMENT],
    queryFn: () => paymentApi.getAllPayments(),
  });
  const paymentOptions = paymentData?.PaymentList?.map((payment) => ({
    label: payment.paymentMethod,
    value: payment.paymentId,
  }));

  const handlePaymentChange = (value) => {
    setSelectedPaymentMethod(value);
  };
  return (
    <>
      <Navbar />
      <div className="cart">
        {cartData?.userId?.length < 0 ? (
          <div className="cart-label">
            <h1>Giỏ hàng trống</h1>
            <SvgNull />
            <Button
              onClick={() => {
                navigate(CUSTOMER_ROUTER_PATH.TRANG_CHU);
              }}
              icon={<BackwardOutlined />}
              className="cart-button_back"
            >
              Quay về trang mua sắm
            </Button>
          </div>
        ) : (
          <div className="cart-label">
            <p className="cart_header-title">Danh sách sản phẩm</p>
            <CartProduct
              onSelectionChange={(total) => {
                setCartSum(total);
              }}
            />
          </div>
        )}
        <div className="cart-option">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <span className="cart-option_text">Tổng tiền:</span>
                </Col>
                <Col span={8}>
                  <span className="cart-option_text">
                    {cartSum?.toFixed(2)} $
                  </span>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <FormSelect
                name={"costee"}
                placeholder="Chọn phương thức thanh toán"
                selectProps={{
                  options: paymentOptions,
                  disabled: cartSum === 0,
                  onChange: handlePaymentChange,
                }}
              />
            </Col>
            <Col span={8}>
              <Button
                className="cart-option_button-submit"
                disabled={!selectedPaymentMethod}
              >
                Xác nhận
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      <FooterWeb />
    </>
  );
};
