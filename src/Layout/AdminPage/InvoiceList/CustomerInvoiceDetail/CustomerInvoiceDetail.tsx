import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button, Table, Divider, Spin } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import "./CustomerInvoiceDetail.scss";
import { ADMIN_ROUTER_PATH } from "../../../../Routers/Routers";

// Interfaces aligned with API response
interface IUser {
  id: number;
  phoneNumber: string | null;
  email: string;
  userRank: string;
}

interface IOrderDetail {
  quantity: number;
  price: number;
  productDetail: { name: string };
}

interface IOrder {
  id: number;
  total_price: string;
  payment_method: string;
  order_date: string;
  expected_delivery_date: string | null;
  status: string;
  delivered_date: string | null;
  user: IUser | null;
  orderDetails: IOrderDetail[];
}

interface ICustomerInvoice {
  id: number;
  user_id: number;
  userName: string;
  total: number;
  payment_method: string;
  paymentStatus: "Pending" | "Completed" | "Failed";
  invoiceStatus: "Pending" | "Paid" | "Cancelled";
  created_at: string;
  order?: IOrder;
}

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3300";

const CustomerInvoiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [invoice, setInvoice] = useState<ICustomerInvoice | null>(null);
  const [orderDetails, setOrderDetails] = useState<IOrderDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/orders/${id}`);
        const orderData: IOrder = response.data;
        const invoiceFromState: ICustomerInvoice = state?.invoice || {
          id: orderData.id,
          user_id: orderData.user?.id || 0,
          userName: orderData.user?.email || "Unknown",
          total: parseFloat(orderData.total_price),
          payment_method: orderData.payment_method,
          paymentStatus: orderData.payment_method === "BANKING" ? "Completed" : "Pending",
          invoiceStatus: orderData.status as "Pending" | "Paid" | "Cancelled",
          created_at: orderData.order_date.split("T")[0],
        };
        setInvoice(invoiceFromState);
        setOrderDetails(orderData.orderDetails || []);
      } catch (error: any) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id, state]);

  if (loading) {
    return <Spin tip="Đang tải chi tiết hóa đơn..." />;
  }

  if (!invoice) {
    return <div>Không tìm thấy thông tin hóa đơn!</div>;
  }

  const subtotal = orderDetails.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const purchasedProductsColumns: ColumnsType<IOrderDetail> = [
    {
      title: "Tên sản phẩm",
      dataIndex: ["productDetail", "name"],
      key: "productName",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString()} VNĐ`,
    },
    {
      title: "Tổng cộng",
      key: "total",
      render: (_: any, record: IOrderDetail) =>
        `${(record.quantity * record.price).toLocaleString()} VNĐ`,
    },
  ];

  return (
    <div className="invoice-detail-container">
      <h3>Chi tiết hóa đơn #{invoice.id}</h3>
      <div className="invoice-header">
        <div className="customer-info">
          <h4>{invoice.userName || "Unknown"}</h4>
          <p>{invoice.order?.user?.email || "Không có email"}</p>
          <p>{invoice.order?.user?.phoneNumber || "Không có số điện thoại"}</p>
        </div>
        <div className="invoice-info">
          <div className="invoice-info-item">
            <span>Mã đơn hàng:</span>
            <span>{invoice.id}</span>
          </div>
          <div className="invoice-info-item">
            <span>Ngày lập hóa đơn:</span>
            <span>{new Date(invoice.created_at).toLocaleDateString("vi-VN")}</span>
          </div>
          <div className="invoice-info-item">
            <span>Trạng thái thanh toán:</span>
            <span>{invoice.paymentStatus === "Pending" ? "Chờ xử lý" : invoice.paymentStatus === "Completed" ? "Hoàn tất" : "Thất bại"}</span>
          </div>
          <div className="invoice-info-item">
            <span>Trạng thái hóa đơn:</span>
            <span>{invoice.invoiceStatus === "Pending" ? "Chờ xử lý" : invoice.invoiceStatus === "Paid" ? "Đã thanh toán" : "Đã hủy"}</span>
          </div>
        </div>
      </div>

      <Divider />

      <h3>Sản phẩm đã mua</h3>
      <Table
        className="purchased-products-table"
        columns={purchasedProductsColumns}
        dataSource={orderDetails}
        rowKey="id"
        pagination={false}
        locale={{ emptyText: "Không có sản phẩm" }}
      />

      <div className="invoice-summary">
        <div className="summary-item">
          <span>Tổng tiền:</span>
          <span>{subtotal.toLocaleString()} VNĐ</span>
        </div>
        <div className="summary-item total">
          <span>Tổng cộng:</span>
          <span>{subtotal.toLocaleString()} VNĐ</span>
        </div>
        <div className="summary-item">
          <span>Tổng từ API:</span>
          <span>{parseFloat(invoice.total.toString()).toLocaleString()} VNĐ</span>
        </div>
      </div>

      <Button
        type="primary"
        onClick={() => navigate(ADMIN_ROUTER_PATH.ORDER)}
        style={{ marginTop: 16 }}
      >
        Quay lại
      </Button>
    </div>
  );
};

export default CustomerInvoiceDetail;