import { Button, Col, Image, Row, Tabs } from "antd";
import "./style.scss";
import Navbar from "../HeaderWeb";
import { TabsProps } from "antd/lib";
import { useState } from "react";
import dayjs from "dayjs";

enum OrderStateEnum {
  ALL = "ALL",
  PENDING = "PENDING",
  SHIPPING = "SHIPPING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  RETURNED = "RETURNED"
}

const mockOrders = [
  {
    orderID: "HD-86",
    status: OrderStateEnum.PENDING,
    orderDate: new Date("2023-05-15"),
    shippingAddress: "123 Đường ABC, Quận 1, TP.HCM",
    totalAmount: 8800000,
    orderDetails: [
      {
        Product: {
          ProductName: "Điện thoại Xiaomi Redmi - Đen - 128GB",
          images: [{ ImageURL: "" }]
        },
        Quantity: 1,
        Price: 8800000
      },
      {
        Product: {
          ProductName: "Tai nghe Bluetooth Xiaomi",
          images: [{ ImageURL: "" }]
        },
        Quantity: 2,
        Price: 500000
      }
    ]
  },
  {
    orderID: "HD-85",
    status: OrderStateEnum.SHIPPING,
    orderDate: new Date("2023-05-10"),
    shippingAddress: "456 Đường XYZ, Quận 3, TP.HCM",
    totalAmount: 28000000,
    orderDetails: [
      {
        Product: {
          ProductName: "Điện thoại iPhone 15 Pro - Trắng - 128GB",
          images: [{ ImageURL: "" }]
        },
        Quantity: 1,
        Price: 28000000
      }
    ]
  },
  {
    orderID: "HD-88",
    status: OrderStateEnum.COMPLETED,
    orderDate: new Date("2023-05-05"),
    shippingAddress: "789 Đường DEF, Quận 5, TP.HCM",
    totalAmount: 14400000,
    orderDetails: [
      {
        Product: {
          ProductName: "Điện thoại OPPO Reno10 5G - Xanh - 128GB",
          images: [{ ImageURL: "" }]
        },
        Quantity: 2,
        Price: 7200000
      }
    ]
  },
  {
    orderID: "HD-81",
    status: OrderStateEnum.CANCELLED,
    orderDate: new Date("2023-04-28"),
    shippingAddress: "321 Đường GHI, Quận 10, TP.HCM",
    totalAmount: 23000000,
    orderDetails: [
      {
        Product: {
          ProductName: "iPhone 14 Pro Max - Đen - 256GB",
          images: [{ ImageURL: "" }]
        },
        Quantity: 1,
        Price: 23000000
      },
      {
        Product: {
          ProductName: "Apple Watch Series 8",
          images: [{ ImageURL: "" }]
        },
        Quantity: 1,
        Price: 12000000
      }
    ]
  }
];

export const Order = () => {
  const [currentTab, setCurrentTab] = useState<string>(OrderStateEnum.ALL);

  const items: TabsProps["items"] = [
    { key: OrderStateEnum.ALL, label: "Tất cả" },
    { key: OrderStateEnum.PENDING, label: "Chờ xác nhận" },
    { key: OrderStateEnum.SHIPPING, label: "Đang giao" },
    { key: OrderStateEnum.COMPLETED, label: "Đã giao hàng" },
    { key: OrderStateEnum.CANCELLED, label: "Đã hủy" },
    { key: OrderStateEnum.RETURNED, label: "Trả hàng" },
  ];
  const handleTabChange = (activeKey: string) => {
    setCurrentTab(activeKey);
  };

  const filteredOrders = currentTab === OrderStateEnum.ALL 
    ? mockOrders 
    : mockOrders.filter(order => order.status === currentTab);

  const getStatusText = (status: string) => {
    switch(status) {
      case OrderStateEnum.PENDING: return "Chưa hoàn tiền";
      case OrderStateEnum.COMPLETED: return "Đã hoàn tiền";
      case OrderStateEnum.CANCELLED: return "Đã xác nhận hoàn tiền";
      case OrderStateEnum.RETURNED: return "Đã hoàn trả";
      default: return "Vui lòng liên hệ với chủ cửa hàng";
    }
  };

  return (
    <>
      <Navbar />
      <div className="order">
        <div className="order-content">
          <Tabs
            defaultActiveKey={OrderStateEnum.ALL}
            items={items}
            onChange={handleTabChange}
          />
          
          {filteredOrders.map(order => (
            <div key={order.orderID} className="order-card">
              <div className="order-header">
                <span className="order-id">{order.orderID}</span>
                <div className="order-actions">
                  <Button type="text">Thông tin</Button>
                  <Button type="text">Trả hàng / hoàn tiền</Button>
                </div>
              </div>

              {order.orderDetails.map(item => (
                <div className="order-item">
                  <div className="product-image"></div>
                  <div className="product-info">
                    <p className="product-name">{item.Product.ProductName}</p>
                    <p className="product-quantity">x {item.Quantity}</p>
                    <p className="product-price">{item.Price.toLocaleString()} đ</p>
                  </div>
                </div>
              ))}

              <div className="order-total">
                <p>Tổng tiền: {order.totalAmount.toLocaleString()} đ</p>
                <p className="order-status">{getStatusText(order.status)}</p>
                <p className="order-note">Vui lòng liên hệ với chủ cửa hàng vì bất cứ lý do gì</p>
              </div>

              <div className="order-footer">
                <div className="order-meta">
                  <p>Ngày đặt: {dayjs(order.orderDate).format("DD/MM/YYYY HH:mm")}</p>
                  <p>Giao tới: {order.shippingAddress}</p>
                </div>
                <Button className="action-button">
                  {order.status === OrderStateEnum.PENDING && "Hủy đơn hàng"}
                  {order.status === OrderStateEnum.CANCELLED && "Mua lại"}
                  {order.status === OrderStateEnum.COMPLETED && "Trả hàng"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};