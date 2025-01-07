import { Button, Col, Image, Row, Tabs } from "antd";
import "./style.scss";
import Navbar from "../HeaderWeb";
import { TabsProps } from "antd/lib";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../api/apiConfig";
import { orderApi, OrderStateEnum } from "../../api/api";
import { useState } from "react";
import dayjs from "dayjs";
export const Order = () => {
  const userJSON = localStorage.getItem("user");
  const user = userJSON ? JSON.parse(userJSON) : null;
  const [currentTab, setCurrentTab] = useState(OrderStateEnum.Pending); // Initialize state with default tab

  const items: TabsProps["items"] = [
    {
      key: OrderStateEnum.ALL,
      label: "Tất cả",
    },
    {
      key: OrderStateEnum.Pending,
      label: "Đang giao hàng",
    },
    {
      key: OrderStateEnum.Completed,
      label: "Đã giao hàng",
    },
    {
      key: OrderStateEnum.Cancelled,
      label: "Đã hủy",
    },
  ];

  const { data: orderData } = useQuery({
    queryKey: [QUERY_KEY.GET_ORDER, currentTab],
    queryFn: () => orderApi.getOrderByIdAndState(user.UserID, currentTab),
  });
  const handleTabChange = (activeKey: string) => {
    setCurrentTab(activeKey as OrderStateEnum);
  };
  return (
    <>
      <Navbar />
      <div className="order">
        <div className="order-content">
          <Tabs
            defaultActiveKey={OrderStateEnum.ALL}
            centered
            items={items}
            onChange={handleTabChange}
          />
          <Col>
            {orderData?.orders?.map((order) => (
              <Row key={order?.orderID} className="order-content_detail">
                {order?.orderDetails?.map((orderDetail) => (
                  <Row className="order-content_item">
                    <Col className="order_product-image">
                      <Image
                        src={orderDetail?.Product?.images[0]?.ImageURL}
                        alt={orderDetail?.Product?.ProductName}
                      />
                    </Col>
                    <Col className="order_product-info">
                      <p>{orderDetail?.Product?.ProductName}</p>
                      <p>x {orderDetail?.Quantity}</p>
                      <p>{order?.totalAmount} $</p>
                      {new Date(order?.orderDate).toLocaleDateString()}
                    </Col>
                  </Row>
                ))}
                <div className="underline" />
                <Row
                  gutter={[16, 16]}
                  justify={"end"}
                  className="order-content_option"
                >
                  <Col span={18} className="order-content_option-rep">
                    <span>
                      Ngày đặt hàng:{" "}
                      {dayjs(order?.orderDate).format("HH:mm DD/MM/YYYY")}
                    </span>
                    <span>
                      Đơn hàng sẽ được giao tới: {order?.shippingAddress}
                    </span>
                  </Col>
                  <Col span={5}>
                    <p>Total Amount: {order?.totalAmount} $</p>
                    <Button>
                      {order.status === OrderStateEnum.Pending
                        ? "Hủy đơn hàng"
                        : order.status === OrderStateEnum.Cancelled
                        ? "Mua lại"
                        : order.status === OrderStateEnum.Completed
                        ? "Trả hàng"
                        : ""}
                    </Button>
                  </Col>
                </Row>
              </Row>
            ))}
          </Col>
        </div>
      </div>
    </>
  );
};
