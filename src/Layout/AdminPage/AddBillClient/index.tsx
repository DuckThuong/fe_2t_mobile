import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { useState } from "react";
import ColWrap from "../../../Components/ColWrap";
import { FormInput } from "../../../Components/Form/FormInput";
import FormWrap from "../../../Components/Form/FormWrap";
import TableWrap from "../../../Components/TableWrap";
import "./style.scss";
import { FormSelect } from "../../../Components/Form/FormSelect";
import { Form } from "react-router-dom";
export const AddBillClient = () => {
  interface Product {
    key: string;
    productName: JSX.Element;
    colorId: JSX.Element;
    quantity: JSX.Element;
    price: number;
    totalPrice: number;
    action: JSX.Element;
  }

  const [dataSource, setDataSource] = useState<Product[]>([]);
  const handleDeleteProduct = (key: string) => {
    setDataSource(dataSource.filter((product) => product.key !== key));
  };
  const handleAddProduct = () => {
    const newProduct = {
      key: (dataSource.length + 1).toString(),
      productName: (
        <FormSelect
          name={"productName"}
          formItemProps={{
            className: "bill-client_content-product-table-name",
            rules: [
              {
                required: true,
                message: "Vui lòng chọn tên sản phẩm",
              },
            ],
          }}
          selectProps={{
            className: "bill-client_content-product-table-name-select",
            options: [
              {
                label: "Sản phẩm 1",
                value: "product1",
              },
              {
                label: "Sản phẩm 2",
                value: "product2",
              },
            ],
          }}
        />
      ),
      colorId: (
        <FormSelect
          name={"colorId"}
          formItemProps={{
            className: "bill-client_content-product-table-color",
            rules: [
              {
                required: true,
                message: "Vui lòng chọn màu sắc",
              },
            ],
          }}
          selectProps={{
            className: "bill-client_content-product-table-color-select",
            options: [
              {
                label: "Màu 1",
                value: "color1",
              },
              {
                label: "Màu 2",
                value: "color2",
              },
            ],
          }}
        />
      ),
      quantity: (
        <FormSelect
          name={"quantity"}
          formItemProps={{
            className: "bill-client_content-product-table-quantity",
            rules: [
              {
                required: true,
                message: "Vui lòng nhập số lượng",
              },
            ],
          }}
          selectProps={{
            className: "bill-client_content-product-table-quantity-select",
            options: [
              {
                label: "1",
                value: 1,
              },
              {
                label: "2",
                value: 2,
              },
            ],
          }}
        />
      ),
      price: 1,
      totalPrice: 100000,
      action: (
        <Button
          onClick={() =>
            handleDeleteProduct((dataSource.length + 1).toString())
          }
          className="bill-client_content-product-table-delete"
        >
          Xóa
        </Button>
      ),
    };
    setDataSource([...dataSource, newProduct]);
  };
  const tableColumns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Màu sắc",
      dataIndex: "colorId",
      key: "colorId",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <div className="bill">
      <FormWrap className="bill-client">
        <Row className="bill-client_header">
          <h1>Tạo hóa đơn khách hàng</h1>
        </Row>
        <Row className="bill-client_content">
          <Row gutter={[16, 16]} className="bill-client_content-user">
            <h3>Thông tin khách hàng</h3>
            <Col span={24}>
              <FormInput
                name={"userName"}
                label={"Khách hàng"}
                formItemProps={{
                  className: "bill-client_content-user-name",
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng nhập tên khách hàng",
                    },
                  ],
                }}
              />
            </Col>
            <Col span={24}>
              <FormInput
                name={"userPhone"}
                label={"Số điện thoại"}
                formItemProps={{
                  className: "bill-client_content-user-phone",
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại",
                    },
                  ],
                }}
              />
            </Col>
            <Col span={24}>
              <FormInput
                name={"userAddress"}
                label={"Địa chỉ"}
                formItemProps={{
                  className: "bill-client_content-user-address",
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ",
                    },
                  ],
                }}
              />
            </Col>
            <Col span={24}>
              <FormInput
                name={"note"}
                label={"Ghi chú"}
                formItemProps={{
                  className: "bill-client_content-user-note",
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng nhập ghi chú",
                    },
                  ],
                }}
              />
            </Col>
          </Row>
          <ColWrap className="bill-client_content-product">
            <h3>Thông tin sản phẩm</h3>
            <TableWrap
              setSize={() => {}}
              isHidePagination
              tableProps={{
                className: "bill-client_content-product-table",
                columns: tableColumns,
                dataSource: dataSource,
              }}
            />
            <Button icon={<PlusOutlined />} onClick={handleAddProduct}>
              Thêm sản phẩm
            </Button>
          </ColWrap>
          <Col span={12} className="bill-client_content-price">
            <h3>Mã giảm giá</h3>
            <FormSelect name={"discount"} selectProps={{ options: [] }} />
            <div className="price">
              <span className="price_label">Tổng tiền hàng: </span>
              <span className="price_amount">kkk</span>
            </div>
            <div className="price">
              <span className="price_label">Giảm giá: </span>
              <span className="price_amount">kkk</span>
            </div>
            <div className="price">
              <span className="price_label">Thành tiền: </span>
              <span className="price_amount">kk</span>
            </div>
          </Col>
          <Col span={8} className="bill-client_content-purchase">
            <h3>Phương thức thanh toán</h3>
            <FormSelect
              name={"paymentMethod"}
              selectProps={{
                options: [
                  {
                    label: "Tiền mặt",
                    value: "CASH",
                  },
                  {
                    label: "Chuyển khoản",
                    value: "BANKING",
                  },
                ],
              }}
              formItemProps={{
                className: "bill-client_content-purchase-select",
                rules: [
                  {
                    required: true,
                    message: "Vui lòng chọn phương thức thanh toán",
                  },
                ],
              }}
            />
          </Col>
        </Row>
        <Row className="bill-client_footer">
          <Button>Xác nhận</Button>
        </Row>
      </FormWrap>
    </div>
  );
};
