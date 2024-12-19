import { useQuery } from "@tanstack/react-query";
import { cartApi } from "../../api/api";
import { QUERY_KEY } from "../../configs/apiConfig";
import Navbar from "../HeaderWeb";
import { Button, Col, Row } from "antd";
import { SvgNull } from "../../Components/@svg/SvgNull";
import RowWrap from "../../Components/RowWrap";
import TableWrap from "../../Components/TableWrap";
import { CartProduct } from "./CartProduct";
import { FooterWeb } from "../FooterWeb";
import { FormSelect } from "../../Components/Form/FormSelect";

export const Cartergories = () => {
  const { data: cartData } = useQuery({
    queryKey: [QUERY_KEY.GET_IMAGE],
    queryFn: () => cartApi.GetCartByUserId("3"),
  });

  return (
    <>
      <Navbar />
      <div className="cart">
        {cartData?.userId?.length < 0 ? (
          <div className="cart-label">
            <p>Giỏ hàng trống</p>
            <SvgNull />
            <Button className="cart-button_back">Quay về trang mua sắm</Button>
          </div>
        ) : (
          <div className="cart-label">
            <p className="cart-label_title">Danh sách sản phẩm</p>
            <CartProduct />
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
                  <span className="cart-option_text">...</span>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <FormSelect
                name={"costee"}
                placeholder="Chọn phương thức thanh toán"
              />
            </Col>
            <Col span={8}>
              <Button className="cart-option_button-submit">Xác nhận</Button>
            </Col>
          </Row>
        </div>
      </div>
      <FooterWeb />
    </>
  );
};
