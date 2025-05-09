import { Tabs } from "antd";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import OrderDetail from "./OrderDetail";
import { OrderStateEnum, orderApi } from "../../api/api";
import { TabsProps } from "antd/lib";
import Navbar from "../HeaderWeb";
import { FooterWeb } from "../FooterWeb";
import { useState, useEffect } from "react";

const items: TabsProps["items"] = [
  { key: OrderStateEnum.ALL, label: "Tất cả" },
  { key: OrderStateEnum.PENDING, label: "Chờ xử lý" },

  { key: OrderStateEnum.DELIVERING, label: "Đang giao" },
  { key: OrderStateEnum.COMPLETED, label: "Hoàn thành" },
  { key: OrderStateEnum.CANCELLED, label: "Đã hủy" },
  { key: OrderStateEnum.RETURNED, label: "Trả hàng" },
];

const Order = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = userData.id || "unknown";

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("UserId gửi đi:", userId);
        const response = await orderApi.getOrderByUserID(userId);
        console.log("Mảng đơn hàng trả về:", response);
       

        if (response && Array.isArray(response)) {
          const mappedOrders = response.map((order: any) => ({
            orderID: order.id.toString(),
            paymentmethod: order.payment_method,
            //name_consignee : order.name_consignee ,
            status: order.status,
            address: order.address ,
            orderDate: order.order_date,
            shippingAddress: order.user?.address || "Không có địa chỉ",
            totalAmount: order.total_price,
            orderDetails: order.orderDetails.map((detail: any) => ({
              Quantity: detail.quantity,
              Price: detail.price,
              Product: {
                ProductName: null,
                images: [],
              },
            })),
          }));

          setOrders(mappedOrders);
        } else {
          setError("Không có đơn hàng nào.");
        }
      } catch (err: any) {
        console.error("Lỗi chi tiết khi gọi API getOrderByUserID:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Không thể tải danh sách đơn hàng. Vui lòng thử lại sau."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const renderOrders = (status: OrderStateEnum) => {
    const filteredOrders =
      status === OrderStateEnum.ALL
        ? orders
        : orders.filter((order) => order.status === status);

    if (filteredOrders.length === 0) {
      return <p>Không có đơn hàng nào trong trạng thái này.</p>;
    }

    return filteredOrders.map((order, index) => (
      <OrderDetail key={index} order={order} />
    ));
  };

  return (
    <>
      <Navbar />
      <div className="order">
        <div className="order-content">
          {loading ? (
            <p>Đang tải đơn hàng...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <Tabs
              defaultActiveKey={OrderStateEnum.ALL}
              items={items.map((tab) => ({
                ...tab,
                children: renderOrders(tab.key as OrderStateEnum),
              }))}
            />
          )}
        </div>
      </div>
      <FooterWeb />
    </>
  );
};

export default Order;