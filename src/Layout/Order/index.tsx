import { Tabs } from "antd";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import OrderDetail from "./OrderDetail"; // sửa lại import cho đúng default export
import { OrderStateEnum } from "../../api/api";
import { TabsProps } from "antd/lib";
import Navbar from "../HeaderWeb";
import { FooterWeb } from "../FooterWeb";
const mockOrders = [
  {
    orderID: "HD-86",
    paymentmethod:1,
    status: OrderStateEnum.CONFIRMING,
    orderDate: new Date("2023-05-15"),
    shippingAddress: "123 Đường ABC, Quận 1, TP.HCM",
    totalAmount: 8800000,
    orderDetails: [
      {
        Product: {
          ProductName: "Điện thoại Xiaomi Redmi - Đen - 128GB",
          images: [{ ImageURL: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png" }]
        },
        Quantity: 1,
        Price: 8800000
      },
      {
        Product: {
          ProductName: "Tai nghe Bluetooth Xiaomi",
          images: [{ ImageURL: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png" }]
        },
        Quantity: 2,
        Price: 500000
      }
    ]
  },
  {
    orderID: "HD-85",
    paymentmethod:1,
    status: OrderStateEnum.DELIVERING,
    orderDate: new Date("2023-05-10"),
    shippingAddress: "456 Đường XYZ, Quận 3, TP.HCM",
    totalAmount: 28000000,
    orderDetails: [
      {
        Product: {
          ProductName: "Điện thoại iPhone 15 Pro - Trắng - 128GB",
          images: [{ ImageURL: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png" }]
        },
        Quantity: 1,
        Price: 28000000
      }
    ]
  },
  {
    orderID: "HD-88",
    paymentmethod:0,
    status: OrderStateEnum.CANCELLED,
    orderDate: new Date("2023-05-05"),
    shippingAddress: "789 Đường DEF, Quận 5, TP.HCM",
    totalAmount: 14400000,
    orderDetails: [
      {
        Product: {
          ProductName: "Điện thoại OPPO Reno10 5G - Xanh - 128GB",
          images: [{ ImageURL: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png" }]
        },
        Quantity: 2,
        Price: 7200000
      }
    ]
  },
  {
    orderID: "HD-81",
    paymentmethod:0,
    status: OrderStateEnum.COMPLETED, // đúng kiểu enum
    orderDate: new Date("2023-04-28"),
    shippingAddress: "321 Đường GHI, Quận 10, TP.HCM",
    totalAmount: 23000000,
    orderDetails: [
      {
        Product: {
          ProductName: "iPhone 14 Pro Max - Đen - 256GB",
          images: [{ ImageURL: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png" }]
        },
        Quantity: 1,
        Price: 23000000
      },
      {
        Product: {
          ProductName: "Apple Watch Series 8",
          images: [{ ImageURL: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png" }]
        },
        Quantity: 1,
        Price: 12000000
      }
    ]
  }
];

const items: TabsProps["items"] = [
  { key: OrderStateEnum.ALL, label: "Tất cả" },
  { key: OrderStateEnum.CONFIRMING, label: "Chờ xác nhận" },
  { key: OrderStateEnum.DELIVERING, label: "Đang giao" },
  { key: OrderStateEnum.COMPLETED, label: "Hoàn thành" },
  { key: OrderStateEnum.CANCELLED, label: "Đã hủy" },
  { key: OrderStateEnum.RETURNED, label: "Trả hàng" },
];


const Order = () => {
  const navigate = useNavigate();

  const renderOrders = (status: OrderStateEnum) => {
    const filteredOrders =
      status === OrderStateEnum.ALL
        ? mockOrders
        : mockOrders.filter((order) => order.status === status);

    return filteredOrders.map((order, index) => (
      <OrderDetail key={index} order={order} />
    ));
  };

  return (
    <>
    <Navbar/>
    <div className="order">
      <div className="order-content">
        <Tabs
          defaultActiveKey={OrderStateEnum.ALL}
          items={items.map((tab) => ({
            ...tab,
            children: renderOrders(tab.key as OrderStateEnum),
          }))}
        />
      </div>
    </div>
    
    </>
  );
};

export default Order;