import { Tabs, Button, message } from "antd";
import "./style.scss";
import dayjs from "dayjs";
import { OrderStateEnum, orderApi, colorApi, capacityApi, productApi } from "../../api/api";
import { TabsProps } from "antd/lib";
import Navbar from "../HeaderWeb";
import { FooterWeb } from "../FooterWeb";
import { useState, useEffect } from "react";
import { constant } from "lodash";
import { Update } from "@reduxjs/toolkit";

const items: TabsProps["items"] = [
  { key: OrderStateEnum.ALL, label: "Tất cả" },
  { key: OrderStateEnum.PENDING, label: "Chờ xử lý111" },
  { key: OrderStateEnum.DELIVERY, label: "Đang vận chuyển" },
  { key: OrderStateEnum.COMPLETED, label: "Hoàn thành" },
  { key: OrderStateEnum.CANCLED, label: "Đã hủy" },
  { key: OrderStateEnum.RETURNED, label: "Trả hàng" },
  { key: OrderStateEnum.RETURNING, label: "Đang trả hàng" },
];

interface ProductImage {
  ImageURL: string;
}

interface OrderItem {
  Product: {
    ProductName: string | null;
    images: ProductImage[];
  };
  Quantity: number;
  Price: number;
  Color?: string;
  Capacity?: string;
}

interface Order {
  orderID: string;
  paymentmethod: string;
  status: OrderStateEnum;
  orderDetails: OrderItem[];
  totalAmount: number;
  orderDate: string | Date;
  shippingAddress: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  expectedDeliveryDate: string;
}

const Order = () => {
  const [orders, setOrders] = useState<Order[]>([]);
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
          const mappedOrders = await Promise.all(
            response.map(async (order: any) => {
              const orderDetails = await Promise.all(
                (order.orderDetails || []).map(async (detail: any) => {
                  let colorName = "Unknown";
                  let capacityDisplayName = "Unknown";
                  let productName = "Không xác định";

                  if (detail.productDetail?.product_id) {
                    try {
                      const productResponse = await productApi.getProductById(
                        detail.productDetail.product_id.toString()
                      );
                      productName = productResponse?.name || "Không xác định";
                    } catch (err) {
                      console.error(
                        `Lỗi khi lấy product cho product_id ${detail.productDetail.product_id}:`,
                        err
                      );
                    }
                  }

                  if (detail.productDetail?.color_id) {
                    try {
                      const colorResponse = await colorApi.getColorById(
                        detail.productDetail.color_id.toString()
                      );
                      colorName = colorResponse?.name || "Unknown";
                    } catch (err) {
                      console.error(
                        `Lỗi khi lấy color cho color_id ${detail.productDetail.color_id}:`,
                        err
                      );
                    }
                  }

                  if (detail.productDetail?.capacity_id) {
                    try {
                      const capacityResponse = await capacityApi.getCapacityById(
                        detail.productDetail.capacity_id.toString(),
                        "GB"
                      );
                      capacityDisplayName =
                        capacityResponse?.display_name || "Unknown";
                    } catch (err) {
                      console.error(
                        `Lỗi khi lấy capacity cho capacity_id ${detail.productDetail.capacity_id}:`,
                        err
                      );
                    }
                  }

                  return {
                    Product: {
                      ProductName: productName,
                      images: detail.product?.images || [],
                    },
                    Quantity: detail.quantity || 0,
                    Price: detail.price || 0,
                    Color: colorName,
                    Capacity: capacityDisplayName,
                  };
                })
              );

              return {
                orderID: order.id.toString(),
                paymentmethod: order.payment_method || "Không xác định",
                status: order.status || OrderStateEnum.PENDING,
                orderDetails: orderDetails,
                totalAmount: order.total_price || 0,
                orderDate: order.order_date || "",
                shippingAddress: order.user?.address || "Không có địa chỉ",
                recipientName: order.userName || "Không có thông tin",
                recipientPhone: order.userPhone || "Không có thông tin",
                recipientAddress: order.userLocation || "Không có địa chỉ",
                expectedDeliveryDate: order.expected_delivery_date || "Không xác định",
              };
            })
          );

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

  const getStatusText = (status: OrderStateEnum) => {
    switch (status) {
      case OrderStateEnum.PENDING:
        return "Chờ xử lý";
      case OrderStateEnum.RETURNING:
        return "Đang hoàn hàng";
      case OrderStateEnum.DELIVERY:
        return "Đang vận chuyển";
      case OrderStateEnum.COMPLETED:
        return "Hoàn thành";
      case OrderStateEnum.CANCLED:
        return "Đã hủy";
      case OrderStateEnum.RETURNED:
        return "Trả hàng";
      default:
        return "Vui lòng liên hệ với chủ cửa hàng";
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      console.log("Gọi API updateOrder để hủy đơn hàng:", {
        orderId,
        status: OrderStateEnum.CANCLED,
      });
      const response = await orderApi.updateOrder(orderId, { status: OrderStateEnum.CANCLED });
      console.log("Kết quả từ API updateOrder (hủy đơn):", response);
      message.success("Hủy đơn hàng thành công!");
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderID === orderId
            ? { ...order, status: OrderStateEnum.CANCLED }
            : order
        )
      );
    } catch (err: any) {
      console.error("Lỗi khi hủy đơn hàng:", err);
      console.error("Chi tiết lỗi từ API:", err.response?.data);
      message.error(
        err.response?.data?.message || "Không thể hủy đơn hàng. Vui lòng thử lại sau."
      );
    }
  };

  const handleReturnOrder = async (orderId: string, orderDate: string | Date) => {
    const orderDateTime = dayjs(orderDate);
    const currentDate = dayjs();
    const daysDifference = currentDate.diff(orderDateTime, "day");

    if (daysDifference > 30) {
      message.error("Đơn hàng chỉ có thể hoàn trả trong vòng 30 ngày kể từ ngày đặt!");
      return;
    }
    
    try {
      console.log("Gọi API updateOrder để hoàn hàng:", {
        orderId,
        status: OrderStateEnum.RETURNED,
      });
  
      
      // updateOrder: (id: string, orderData: any) =>
      //     apiRequest(`${API_KEY.ORDER}/${id}`, "PATCH", orderData),
      const response = await orderApi.updateOrderClient(orderId,OrderStateEnum.RETURNED);
      console.log("Kết quả từ API updateOrder (hoàn hàng):", response);
      message.success("Yêu cầu hoàn hàng thành công!");
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderID === orderId
            ? { ...order, status: OrderStateEnum.RETURNED }
            : order
        )
      );
    } catch (err: any) {
      console.error("Lỗi khi yêu cầu hoàn hàng:", err);
      console.error("Chi tiết lỗi từ API:", err.response?.data);
      message.error(
        err.response?.data?.message || "Không thể yêu cầu hoàn hàng. Vui lòng thử lại sau."
      );
    }
  };

  const handleRepurchase = (orderId: string) => {
    console.log("Mua lại đơn hàng", orderId);
  };

  const renderOrders = (status: OrderStateEnum) => {
    const filteredOrders =
      status === OrderStateEnum.ALL
        ? orders
        : orders.filter((order) => order.status === status);

    if (filteredOrders.length === 0) {
      return <p>Không có đơn hàng nào trong trạng thái này.</p>;
    }

    return filteredOrders.map((order, index) => (
      <div className="order-card" key={index}>
        <div className="order-header">
          <span className="order-id">{order.orderID}</span>
          <div className="order-actions">
            <span className={`order-status ${order.status.toLowerCase()}`}>
              {getStatusText(order.status)}
            </span>
          </div>
        </div>

        {order.orderDetails.map((item, idx) => (
          <div className="order-item" key={idx}>
            <div className="product-info">
              <p className="product-name">
                Sản phẩm: {item.Product.ProductName || "Không có thông tin"} | {item.Capacity || "thiếu dữ liệu"} | {item.Color || "thiếu dữ liệu"} <br/>
              </p>
              <p className="product-color">
                Số lượng: {item.Quantity} <br/> Giá: {item.Price.toLocaleString()} đ
              </p>
              {item.Product.images.length > 0 && (
                <img
                  src={item.Product.images[0].ImageURL}
                  alt={item.Product.ProductName || "Hình ảnh sản phẩm"}
                  style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "8px" }}
                />
              )}
            </div>
          </div>
        ))}

        <div className="order-footer">
          <div className="order-meta">
            <p><strong>Tên người nhận:</strong> {order.recipientName}</p>
            <p><strong>Số điện thoại:</strong> {order.recipientPhone}</p>
            <p><strong>Địa chỉ người nhận:</strong> {order.recipientAddress}</p>
          </div>
          <div>
            <p>Ngày đặt: {dayjs(order.orderDate).format("DD/MM/YYYY HH:mm")}</p>
            <p>Phương thức thanh toán: {order.paymentmethod}</p>
          </div>
          <div className="order-duoi">
            <div className="order-total">
              <p>Tổng tiền: {order.totalAmount.toLocaleString()} đ</p>
            </div>
            <div className="action-buttons">
              {order.status === OrderStateEnum.PENDING && (
                <Button
                  className="action-button cancel"
                  onClick={() => handleCancelOrder(order.orderID)}
                >
                  Hủy đơn hàng
                </Button>
              )}
              {order.status === OrderStateEnum.COMPLETED && (
                <>
                  <Button
                    className="action-button repurchase"
                    onClick={() => handleRepurchase(order.orderID)}
                  >
                    Mua lại
                  </Button>
                  <Button
                    className="action-button return"
                    onClick={() => handleReturnOrder(order.orderID, order.orderDate)}
                  >
                    Hoàn hàng
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
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