import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Col, Form, notification, Row } from "antd";
import { useState } from "react";
import {
  capacityApi,
  colorApi,
  discountApi,
  orderApi,
  productApi,
} from "../../../api/api";
import { API_KEY } from "../../../api/apiConfig";
import ColWrap from "../../../Components/ColWrap";
import { FormInput } from "../../../Components/Form/FormInput";
import { FormSelect } from "../../../Components/Form/FormSelect";
import FormWrap from "../../../Components/Form/FormWrap";
import TableWrap from "../../../Components/TableWrap";
import "./style.scss";
import { useUser } from "../../../api/useHook";
import dayjs from "dayjs";
interface Product {
  key: string;
  productName: JSX.Element;
  productDetailId: number | undefined;
  product: number | undefined;
  color: number | undefined;
  capacity: number | undefined;
  quantityCost: number | undefined;
  colorId: JSX.Element;
  capacityId: JSX.Element;
  quantity: JSX.Element;
  price: string;
  totalPrice: string;
  action: JSX.Element;
}

interface OrderDetail {
  product_id?: number | undefined;
  product_detail_id?: number;
  color_id: number | undefined;
  capacity_id: number | undefined;
  quantity?: number;
  quantityCost: number | undefined;
  price: number;
}

interface CreateOrderPayload {
  user_id: number | undefined;
  payment_method: "CAST" | "BANKING";
  expected_delivery_date: string;
  status: string;
  userName: string;
  userPhone: string;
  userLocation: string;
  note: string;
  order_details: OrderDetail[];
}

export const AddBillClient = () => {
  const [form] = Form.useForm();
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [dataSource, setDataSource] = useState<Product[]>([]);
  const user = useUser();
  const { data: productData } = useQuery({
    queryKey: [API_KEY.PRODUCT],
    queryFn: () => productApi.getAllProducts(),
  });

  const productOptions = productData?.data?.map(
    (product: { id: number; name: string }) => ({
      value: product.id,
      label: product.name,
    })
  );

  const { data: colorData } = useQuery({
    queryKey: [API_KEY.COLOR],
    queryFn: () => colorApi.getAllColors(),
  });

  const colorOptions = colorData?.map(
    (color: { id: number; name: string }) => ({
      value: color.id,
      label: color.name,
    })
  );

  const { data: capacityData } = useQuery({
    queryKey: [API_KEY.CAPACITY],
    queryFn: () => capacityApi.getAllCapacities(),
  });

  const capacityOptions = capacityData?.map(
    (capacity: { id: number; name: string }) => ({
      value: capacity.id,
      label: capacity.name,
    })
  );

  const { data: discountData } = useQuery({
    queryKey: [API_KEY.DISCOUNT],
    queryFn: () => discountApi.getAllDiscounts(),
  });

  const discountOptions = discountData?.data?.map(
    (discount: {
      id: number;
      title: string;
      discount_type: string;
      discount_value: number;
    }) => ({
      value: discount.id,
      label: discount.title,
      type: discount.discount_type,
      discountValue: discount.discount_value,
    })
  );

  const doGetProductInfo = useMutation({
    mutationFn: (productId: string) => productApi.getProductById(productId),
    onSuccess: (data) => {
      const totalProductPrice = Array.isArray(data?.productDetails)
        ? data.productDetails.reduce(
            (sum, product: { selling_price: number }) =>
              sum + (product?.selling_price || 0),
            0
          )
        : 0;
      const totalProductPriceWithCapacity = Array.isArray(data?.productDetails)
        ? data.productDetails.reduce(
            (sum, product) =>
              sum + parseFloat(product?.capacity?.price?.discount_price || "0"),
            0
          )
        : 0;
      const totalProductPriceWithQuantity =
        (totalProductPrice + totalProductPriceWithCapacity) *
        form.getFieldValue("quantity");

      const sumPrice = (
        totalProductPrice + totalProductPriceWithCapacity
      ).toLocaleString();
      const totalSumPrice = totalProductPriceWithQuantity.toLocaleString();
      setDataSource((prev) =>
        prev.map((product) =>
          product.key === dataSource.length.toString()
            ? {
                ...product,
                price: sumPrice,
                totalPrice: totalSumPrice,
                productDetailId: data?.productDetails[0]?.id,
                product: data?.id,
                color: data?.productDetails[0]?.color_id,
                capacity: data?.productDetails[0]?.capacity?.id,
                quantityCost: Number(form.getFieldValue("quantity")),
              }
            : product
        )
      );
      setPrice(totalProductPrice + totalProductPriceWithCapacity);
      setTotalPrice(totalProductPriceWithQuantity);
    },
    onError: (error) => {
      console.error("Error fetching product info:", error);
    },
  });

  const doCreateOrder = useMutation({
    mutationFn: (data: any) => orderApi.createOrder(data),
    onSuccess: () => {
      form.resetFields();
      setDataSource([]);
      notification.open({
        message: "Thông báo!",
        description: "Đặt hàng thành công.",
        placement: "topRight",
        showProgress: true,
        pauseOnHover: true,
        style: {
          backgroundColor: "#ffffff",
          borderLeft: "4px solid #007bff",
        },
      });
    },
    onError: (error) => {
      console.error("Error creating order:", error);
      notification.open({
        message: "Thông báo!",
        description: "Đặt hàng thất bại.",
        placement: "topRight",
        showProgress: true,
        pauseOnHover: true,
        style: {
          backgroundColor: "#ffffff",
          borderLeft: "4px solid #007bff",
        },
      });
    },
  });

  const handleGetProductInfo = (productId: string) => {
    doGetProductInfo.mutate(productId);
  };

  const handleDeleteProduct = (key: string) => {
    setDataSource(dataSource.filter((product) => product.key !== key));
  };

  const handleAddProduct = () => {
    const newProduct = {
      key: (dataSource.length + 1).toString(),
      productDetailId: undefined,
      product: undefined,
      color: undefined,
      capacity: undefined,
      quantityCost: undefined,
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
            options: productOptions,
            onChange: (value) => {
              form.setFieldValue("productName", value);
            },
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
            options: colorOptions,
            onChange: (value) => {
              form.setFieldValue("colorId", value);
            },
          }}
        />
      ),
      capacityId: (
        <FormSelect
          name={"capacityId"}
          formItemProps={{
            rules: [
              {
                required: true,
                message: "Vui lòng chọn dung lượng",
              },
            ],
          }}
          selectProps={{
            className: "bill-client_content-product-table-capacity-select",
            options: capacityOptions,
            onChange: (value) => {
              form.setFieldValue("capacityId", value);
            },
          }}
        />
      ),
      quantity: (
        <FormInput
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
          inputProps={{
            className: "bill-client_content-product-table-quantity-input",
            onChange: (e) => {
              form.setFieldValue("quantity", e.target.value);
              handleGetProductInfo(form.getFieldValue("productName"));
            },
          }}
        />
      ),
      price: "0",
      totalPrice: "0",
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

  const handleDiscountChange = (selectedDiscount: any) => {
    if (!selectedDiscount) {
      setDiscountedPrice(totalPrice);
      return;
    }

    const { type, discountValue } = selectedDiscount;
    let finalPrice = totalPrice;

    if (type === "percentage") {
      finalPrice = totalPrice - (totalPrice * discountValue) / 100;
      setDiscountPrice((totalPrice * discountValue) / 100);
    } else if (type === "fixed_amount") {
      finalPrice = totalPrice - discountValue;
      setDiscountPrice(discountValue);
    }

    setDiscountedPrice(finalPrice > 0 ? finalPrice : 0);
  };

  const handleSubmit = () => {
    const expectedDeliveryDate = dayjs().add(3, "day").format("YYYY/MM/DD");

    const orderDetails = dataSource.map((product) => ({
      product_id: product.product,
      product_detail_id: product.productDetailId,
      color_id: product.color,
      capacity_id: product.capacity,
      quantity: product.quantityCost,
      quantityCost: product.quantityCost,
      price: parseFloat(product.price) || 0,
    }));

    console.log(orderDetails);

    const payload: CreateOrderPayload = {
      user_id: user?.id,
      payment_method: form.getFieldValue("paymentMethod"),
      expected_delivery_date: expectedDeliveryDate,
      userName: form.getFieldValue("userName"),
      userPhone: form.getFieldValue("userPhone"),
      userLocation: form.getFieldValue("userAddress"),
      note: form.getFieldValue("note"),
      status: "PENDING",
      order_details: orderDetails,
    };
    doCreateOrder.mutate(payload);
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
      title: "Dung lượng",
      dataIndex: "capacityId",
      key: "capacityId",
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
      <FormWrap form={form} className="bill-client">
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
            <FormSelect
              name={"discount"}
              selectProps={{
                options: discountOptions,
                onChange: (value) => {
                  const selectedDiscount = discountOptions.find(
                    (option) => option.value === value
                  );
                  handleDiscountChange(selectedDiscount);
                },
              }}
            />
            <div className="price">
              <span className="price_label">Tổng tiền hàng: </span>
              <span className="price_amount">
                {totalPrice.toLocaleString()} VND
              </span>
            </div>
            <div className="price">
              <span className="price_label">Thành tiền: </span>
              <span className="price_amount">
                {discountPrice.toLocaleString()} VND
              </span>
            </div>
            <div className="price">
              <span className="price_label">Thành tiền: </span>
              <span className="price_amount">
                {discountedPrice.toLocaleString()} VND
              </span>
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
          <Button onClick={handleSubmit}>Xác nhận</Button>
        </Row>
      </FormWrap>
    </div>
  );
};
