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
  productDetail: {
    name: string;
    id?: number;
    product_id?: number;
    color?: string; // Add color field
    capacity?: string; // Add capacity field
  };
  id?: number; // Add optional id for rowKey
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
  userName: string;
  userPhone: string;
  userLocation: string;
  note: string;
}

interface ICustomerInvoice {
  id: number;
  user_id: number;
  userName: string;
  total: number;
  payment_method: string;
  paymentStatus: "PENDING" | "COMPLETED" | "CANCLED";
  invoiceStatus: "PENDING" | "COMPLETED" | "CANCLED";
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
        // Fetch order data
        const orderResponse = await axios.get(`${API_URL}/orders/${id}`);
        const orderData: IOrder = orderResponse.data;

        // Create invoice object using API response
        const invoiceData: ICustomerInvoice = {
          id: orderData.id,
          user_id: orderData.user?.id || 0,
          userName: orderData.userName || "Unknown",
          total: parseFloat(orderData.total_price),
          payment_method: orderData.payment_method,
          paymentStatus:
            orderData.payment_method === "BANKING" ? "COMPLETED" : "PENDING",
          invoiceStatus: orderData.status as
            | "PENDING"
            | "COMPLETED"
            | "CANCLED",
          created_at: orderData.order_date.split("T")[0],
          order: orderData,
        };

        // Fetch product names, colors, and capacities for each order detail
        const enrichedOrderDetails = await Promise.all(
          orderData.orderDetails.map(async (detail, index) => {
            const productId = detail.productDetail?.product_id;
            console.log(
              `Processing orderDetail id: ${
                detail.id || index + 1
              }, product_id: ${productId}`
            );

            // Validate product_id
            if (!productId || isNaN(productId)) {
              console.warn(
                `Invalid or missing product_id for orderDetail id: ${
                  detail.id || index + 1
                }`
              );
              return {
                ...detail,
                id: detail.id || index + 1,
                productDetail: {
                  ...detail.productDetail,
                  name: "Unknown Product",
                  color: "Unknown Color",
                  capacity: "Unknown Capacity",
                },
              };
            }

            try {
              const productResponse = await axios.get(
                `${API_URL}/product/get-product-by-id?id=${productId}`
              );
              const productData = productResponse.data;

              // Extract color and capacity from productDetails (use first item for simplicity)
              const productDetailItem = productData.productDetails?.[0] || {};
              const colorName =
                productDetailItem.color?.name || "Unknown Color";
              const capacityName =
                productDetailItem.capacity?.display_name || "Unknown Capacity";

              return {
                ...detail,
                id: detail.id || index + 1,
                productDetail: {
                  ...detail.productDetail,
                  name: productData.name || "Unknown Product",
                  color: colorName,
                  capacity: capacityName,
                },
              };
            } catch (error) {
              console.error(
                `Error fetching product data for product_id ${productId}:`,
                error
              );
              return {
                ...detail,
                id: detail.id || index + 1,
                productDetail: {
                  ...detail.productDetail,
                  name: "Unknown Product",
                  color: "Unknown Color",
                  capacity: "Unknown Capacity",
                },
              };
            }
          })
        );

        setInvoice(invoiceData);
        setOrderDetails(enrichedOrderDetails);

        // Log for debugging
        console.log("Enriched Order Details:", enrichedOrderDetails);
      } catch (error: any) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

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
      title: "Màu sắc",
      dataIndex: ["productDetail", "color"],
      key: "color",
    },
    {
      title: "Dung lượng",
      dataIndex: ["productDetail", "capacity"],
      key: "capacity",
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
          <h4>Người nhận: {invoice.userName || "Unknown"}</h4>
          <p>
            Số điện thoại:{" "}
            {invoice.order?.userPhone || "Không có số điện thoại"}
          </p>
          <p>Email: {invoice.order?.user?.email || "Không có email"}</p>
          <p>Địa chỉ: {invoice.order?.userLocation || "Không có địa chỉ"}</p>
          <p>Ghi chú: {invoice.order?.note || "Không có ghi chú"}</p>
        </div>

        <div className="invoice-info">
          <div className="invoice-info-item">
            <span>Mã đơn hàng:</span>
            <span>{invoice.id}</span>
          </div>
          <div className="invoice-info-item">
            <span>Ngày lập hóa đơn:</span>
            <span>
              {new Date(invoice.created_at).toLocaleDateString("vi-VN")}
            </span>
          </div>
          <div className="invoice-info-item">
            <span>Trạng thái thanh toán:</span>
            <span>
              {invoice.paymentStatus === "PENDING"
                ? "PENDING"
                : invoice.paymentStatus === "COMPLETED"
                ? "COMPLETED"
                : "CANCLED"}
            </span>
          </div>
          <div className="invoice-info-item">
            <span>Trạng thái hóa đơn:</span>
            <span>
              {invoice.invoiceStatus === "PENDING"
                ? "PENDING"
                : invoice.invoiceStatus === "COMPLETED"
                ? "COMPLETED"
                : "CANCLED"}
            </span>
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
