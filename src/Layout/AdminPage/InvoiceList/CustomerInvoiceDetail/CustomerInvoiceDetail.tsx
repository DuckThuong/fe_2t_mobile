import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button, Table, Divider } from "antd";
import { ColumnsType } from "antd/es/table";
import "./CustomerInvoiceDetail.scss";
import { ADMIN_ROUTER_PATH } from "../../../../Routers/Routers";

// Interface from InvoiceList
interface ICustomerInvoiceList {
  id: number;
  user_id: number;
  userName: string;
  total: number;
  payment_method: string;
  paymentStatus: "Pending" | "Completed" | "Failed";
  invoiceStatus: "Pending" | "Paid" | "Cancelled";
  created_at: string;
}

// Interface for CustomerInvoiceDetail
interface ICustomerInvoiceDetail {
  id: number;
  user_id: number | null;
  customer_id: number;
  total: number;
  payment_method: "Cash" | "Bank Transfer" | "Credit Card";
  status: "Pending" | "Paid" | "Cancelled";
  created_at: string;
}

interface IInvoiceDetail {
  id: number;
  invoice_id: number;
  product_detail_id: number;
  product_name: string;
  quantity: number;
  price: number;
}

const CustomerInvoiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [invoice, setInvoice] = useState<ICustomerInvoiceDetail | null>(null);
  const [invoiceDetails, setInvoiceDetails] = useState<IInvoiceDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state?.invoice) {
      const invoiceFromState: ICustomerInvoiceList = state.invoice;
      setInvoice({
        id: invoiceFromState.id,
        user_id: invoiceFromState.user_id,
        customer_id: invoiceFromState.user_id,
        total: invoiceFromState.total,
        payment_method: invoiceFromState.payment_method as "Cash" | "Bank Transfer" | "Credit Card",
        status: invoiceFromState.invoiceStatus,
        created_at: invoiceFromState.created_at,
      });
      setInvoiceDetails(state?.details || []);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [state]);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (!invoice) {
    return <div>Không tìm thấy thông tin hóa đơn!</div>;
  }

  // Tính toán tổng phụ, thuế và tổng cộng
  const subtotal = invoiceDetails.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const taxRate = 0.08; // Thuế 8%
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  // Cột cho bảng danh sách sản phẩm đã mua
  const purchasedProductsColumns: ColumnsType<IInvoiceDetail> = [
    {
      title: "Tên sản phẩm",
      dataIndex: "product_name",
      key: "product_name",
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
      render: (price: number) => `${price} VNĐ`,
    },
  ];

  return (
    <div className="invoice-detail-container">
      <h3>Chi tiết hóa đơn</h3>
      <div className="invoice-header">
        <div className="customer-info">
          <h4>Antonio Banderas</h4>
          <p>1954 Bloor Street West</p>
          <p>Toronto ON, M6P 3K9</p>
          <p>Canada</p>
          <p>example@gmail.com</p>
          <p>+4444-6666-7777</p>
        </div>
        <div className="invoice-info">
          <div className="invoice-info-item">
            <span>Mã đơn hàng:</span>
            <span>AD2029{invoice.id}</span>
          </div>
          <div className="invoice-info-item">
            <span>Ngày lập hóa đơn:</span>
            <span>{invoice.created_at}</span>
          </div>
          <div className="invoice-info-item">
            <span>Trạng thái thanh toán:</span>
            <span>{state.invoice.paymentStatus === "Pending" ? "Chờ xử lý" : state.invoice.paymentStatus === "Completed" ? "Hoàn tất" : "Thất bại"}</span>
          </div>
          <div className="invoice-info-item">
            <span>Trạng thái hóa đơn:</span>
            <span>{invoice.status === "Pending" ? "Chờ xử lý" : invoice.status === "Paid" ? "Đã thanh toán" : "Đã hủy"}</span>
          </div>
        </div>
      </div>

      <Divider />

      <h3>Sản phẩm đã mua</h3>
      <Table
        className="purchased-products-table"
        columns={purchasedProductsColumns}
        dataSource={invoiceDetails}
        rowKey="id"
        pagination={false}
        locale={{ emptyText: "Không có sản phẩm" }}
      />

      <div className="invoice-summary">
        <div className="summary-item">
          <span>Tổng tiền:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span>Khuyến mãi:</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="summary-item total">
          <span>Tổng cộng:</span>
          <span>${total.toFixed(2)}</span>
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