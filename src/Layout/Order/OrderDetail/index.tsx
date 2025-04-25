import { Button } from "antd";
import "./style.scss";
import dayjs from "dayjs";
import { OrderStateEnum } from "../../../api/api";

interface ProductImage {
  ImageURL: string;
}
interface OrderItem {
  Product: {
    ProductName: string;
    //images:ProductImage;
  };
  Quantity: number;
  Price: number;
 
}

interface Order {
  orderID: string;
  paymentmethod:number,
  status: OrderStateEnum;
  orderDetails: OrderItem[];
  totalAmount: number;
  orderDate: string | Date;
  shippingAddress: string;
}

interface OrderDetailProps {
  order: Order;
}

export const OrderDetail = ({ order }: OrderDetailProps) => {
  const getStatusText = (status: OrderStateEnum) => {
    switch (status) {
      case OrderStateEnum.CONFIRMING:
        return "Đang xác nhận";
      case OrderStateEnum.DELIVERING:
        return "Đang vận chuyển";
      case OrderStateEnum.COMPLETED:
        return "Hoàn thành";
      case OrderStateEnum.CANCELLED:
        return "Đã hủy";
      case OrderStateEnum.RETURNED:
        return "Trả hàng";
      default:
        return "Vui lòng liên hệ với chủ cửa hàng";
    }
  };

  const handleCancelOrder = () => {
    // Xử lý hủy đơn hàng
    console.log("Hủy đơn hàng", order.orderID);
  };

  const handleRepurchase = () => {
    // Xử lý mua lại
    console.log("Mua lại đơn hàng", order.orderID);
  };

  return (
    <div className="order-card">
      <div className="order-header">
        <span className="order-id">{order.orderID}</span>
        <div className="order-actions">
          <span className={`order-status ${order.status.toLowerCase()}`}>
            {getStatusText(order.status)}
          </span>
        </div>
      </div>

      {order.orderDetails.map((item, index) => (
        <div className="order-item" key={index}>
          <div className="product-image" style={{
              // backgroundImage: `url(${item.Product.images[0]?.ImageURL || ''})`
            }}></div>
          <div className="product-info">
            <p className="product-name">{item.Product.ProductName}</p>
            <p className="product-quantity">x {item.Quantity}</p>
            <p className="product-price">{item.Price.toLocaleString()} đ</p>
          </div>
        </div>
      ))}

      <div className="order-total">
        <p>Tổng tiền: {order.totalAmount.toLocaleString()} đ</p>
        
      </div>
      

      <div className="order-footer">
        <div className="order-meta">
          <p>Ngày đặt: {dayjs(order.orderDate).format("DD/MM/YYYY HH:mm")}</p>
          <p>Giao tới: {order.shippingAddress}</p>
          <p>Phương thức thanh toán: {order.paymentmethod}</p>
        </div>
        <div className="action-buttons">
          {order.status === OrderStateEnum.CONFIRMING && (
            <Button 
              className="action-button cancel" 
              onClick={handleCancelOrder}
            >
              Hủy đơn hàng
            </Button>
          )}
          {order.status === OrderStateEnum.COMPLETED && (
            <Button 
              className="action-button repurchase" 
              onClick={handleRepurchase}
            >
              Mua lại
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;