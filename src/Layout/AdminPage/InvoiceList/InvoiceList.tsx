import React, { useState, useRef, useEffect } from "react";
import { Button, Space, Input, Select, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import "./InvoiceList.scss";
import CustomTable, {
  CustomTableRef,
} from "../../../Components/CustomTable/CustomTable";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTER_PATH } from "../../../Routers/Routers";
import { orderApi } from "../../../api/api";


interface IUser {
  id: number;
  phoneNumber: string;
  email: string;
  userRank: string;
}

interface ICart {
  id: number;
  user_id: number;
}

interface IOrder {
  id: number;
  quantity: number;
  total_price: string;
  payment_method: string;
  order_date: string;
  expected_delivery_date: string | null;
  status: string;
  delivered_date: string | null;
  user: IUser | null;
  cart: ICart | null;
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
}

interface ISupplierInvoice {
  id: number;
  supplierName: string;
  total: number;
  payment_method: string;
  paymentStatus: "Pending" | "Completed" | "Failed";
  invoiceStatus: "Pending" | "Paid" | "Cancelled";
  created_at: string;
}

const InvoiceList: React.FC = () => {
  const navigate = useNavigate();
  const tableRef = useRef<CustomTableRef>(null);

  // State to select table type
  const [tableType, setTableType] = useState<"customer" | "supplier">("customer");
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [customerInvoices, setCustomerInvoices] = useState<ICustomerInvoice[]>([]);
  const [supplierInvoices, setSupplierInvoices] = useState<ISupplierInvoice[]>([
    {
      id: 1,
      supplierName: "Supplier A",
      total: 10000,
      payment_method: "Bank Transfer",
      paymentStatus: "Completed",
      invoiceStatus: "Paid",
      created_at: "2025-04-01",
    },
    {
      id: 2,
      supplierName: "Supplier B",
      total: 8000,
      payment_method: "Cash",
      paymentStatus: "Pending",
      invoiceStatus: "Pending",
      created_at: "2025-04-02",
    },
    {
      id: 3,
      supplierName: "Supplier C",
      total: 12000,
      payment_method: "Credit Card",
      paymentStatus: "Failed",
      invoiceStatus: "Cancelled",
      created_at: "2025-04-03",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomerInvoices, setFilteredCustomerInvoices] = useState<ICustomerInvoice[]>([]);
  const [filteredSupplierInvoices, setFilteredSupplierInvoices] = useState<ISupplierInvoice[]>(supplierInvoices);
  const [loading, setLoading] = useState(false);

  // State to track temporary status changes
  const [tempStatuses, setTempStatuses] = useState<{
    [key: number]: {
      paymentStatus?: "Pending" | "Completed" | "Failed";
      invoiceStatus?: "Pending" | "Paid" | "Cancelled";
    };
  }>({});

  // Fetch customer orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await orderApi.getAllOrders();
        console.log("API response:", response); // Debug API response
        const fetchedOrders: IOrder[] = Array.isArray(response.data) ? response.data : [];
        console.log("Fetched orders:", fetchedOrders); // Debug fetched orders

        if (fetchedOrders.length === 0) {
          message.info("Không có hóa đơn khách hàng nào được tìm thấy");
        }

        // Map API data to ICustomerInvoice
        const customerInvoices: ICustomerInvoice[] = fetchedOrders
          .filter((order) => order.user !== null && order.user.id !== undefined) // Filter out invalid orders
          .map((order) => {
            try {
              return {
                id: order.id,
                user_id: order.user!.id,
                userName: order.user!.email || "Unknown", // Fallback if email is missing
                total: parseFloat(order.total_price) || 0, // Fallback if total_price is invalid
                payment_method: order.payment_method || "N/A",
                paymentStatus: order.payment_method === "BANKING" ? "Completed" : "Pending",
                invoiceStatus: mapOrderStatusToInvoiceStatus(order.status),
                created_at: order.order_date ? order.order_date.split("T")[0] : "N/A",
              };
            } catch (error) {
              console.error(`Error mapping order ID ${order.id}:`, error);
              return null;
            }
          })
          .filter((invoice): invoice is ICustomerInvoice => invoice !== null); // Remove failed mappings

        console.log("Mapped customer invoices:", customerInvoices); // Debug mapped invoices
        setOrders(fetchedOrders);
        setCustomerInvoices(customerInvoices);
        setFilteredCustomerInvoices(customerInvoices);
      } catch (error: any) {
        console.error("Detailed error fetching orders:", error); // Detailed error log
        message.error(`Không thể tải danh sách hóa đơn khách hàng: ${error.message || "Lỗi không xác định"}`);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Update filtered supplier invoices when supplierInvoices change
  useEffect(() => {
    setFilteredSupplierInvoices(supplierInvoices);
  }, [supplierInvoices]);

  // Map order status to invoice status
  const mapOrderStatusToInvoiceStatus = (status: string): "Pending" | "Paid" | "Cancelled" => {
    switch (status) {
      case "PENDING":
        return "Pending";
      case "DELIVERED":
        return "Paid";
      case "CANCELLED":
        return "Cancelled";
      default:
        return "Pending";
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    const searchTerms = searchQuery.trim().toLowerCase().split(/\s+/);
    if (tableType === "customer") {
      const result = customerInvoices.filter((invoice) =>
        searchTerms.every(
          (term) =>
            invoice.id.toString().toLowerCase().includes(term) ||
            invoice.userName.toLowerCase().includes(term) ||
            invoice.user_id.toString().toLowerCase().includes(term)
        )
      );
      setFilteredCustomerInvoices(result);
    } else {
      const result = supplierInvoices.filter((invoice) =>
        searchTerms.every(
          (term) =>
            invoice.id.toString().toLowerCase().includes(term) ||
            invoice.supplierName.toLowerCase().includes(term)
        )
      );
      setFilteredSupplierInvoices(result);
    }
  };

  const handleDelete = async (id: number) => {
    if (tableType === "customer") {
      try {
        await orderApi.deleteOrder(id.toString());
        setOrders((prev) => prev.filter((order) => order.id !== id));
        setCustomerInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
        setFilteredCustomerInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
        message.success(`Đã xóa hóa đơn khách hàng ID: ${id}`);
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Không thể xóa hóa đơn khách hàng";
        message.error(errorMessage);
        console.error("Error deleting customer invoice:", error);
      }
    } else {
      setSupplierInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
      setFilteredSupplierInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
      message.success(`Đã xóa hóa đơn nhà cung cấp ID: ${id}`);
    }
    setTempStatuses((prev) => {
      const newStatuses = { ...prev };
      delete newStatuses[id];
      return newStatuses;
    });
  };

  // Handle viewing invoice details
  const handleViewDetail = (record: ICustomerInvoice | ISupplierInvoice) => {
    if (tableType === "customer") {
      navigate(ADMIN_ROUTER_PATH.CUSTOMER_INVOICE_DETAIL(record.id), {
        state: { invoice: record },
      });
    } else {
      navigate(ADMIN_ROUTER_PATH.PROVIDER_INVOICE_DETAIL(record.id), {
        state: { invoice: record },
      });
    }
  };

  // Handle payment status change (temporary)
  const handlePaymentStatusChange = (
    id: number,
    value: "Pending" | "Completed" | "Failed"
  ) => {
    setTempStatuses((prev) => ({
      ...prev,
      [id]: { ...prev[id], paymentStatus: value },
    }));
  };

  // Handle invoice status change (temporary)
  const handleInvoiceStatusChange = (
    id: number,
    value: "Pending" | "Paid" | "Cancelled"
  ) => {
    setTempStatuses((prev) => ({
      ...prev,
      [id]: { ...prev[id], invoiceStatus: value },
    }));
  };

  // Handle saving status changes
  const handleSave = async (id: number) => {
    const tempStatus = tempStatuses[id];
    if (!tempStatus) return;

    if (tableType === "customer") {
      try {
        // Map invoiceStatus back to order status
        const orderStatus = tempStatus.invoiceStatus === "Paid" ? "DELIVERED" : 
                          tempStatus.invoiceStatus === "Cancelled" ? "CANCELLED" : 
                          "PENDING";
        const updateData = {
          status: orderStatus,
          payment_method: tempStatus.paymentStatus === "Completed" ? "BANKING" : "CASH", // Mock mapping
        };
        await orderApi.updateOrder(id.toString(), updateData);

        // Update local state
        setOrders((prev) =>
          prev.map((order) =>
            order.id === id
              ? { ...order, status: orderStatus, payment_method: updateData.payment_method }
              : order
          )
        );
        setCustomerInvoices((prevInvoices) =>
          prevInvoices.map((invoice) =>
            invoice.id === id
              ? {
                  ...invoice,
                  paymentStatus: tempStatus.paymentStatus || invoice.paymentStatus,
                  invoiceStatus: tempStatus.invoiceStatus || invoice.invoiceStatus,
                }
              : invoice
          )
        );
        setFilteredCustomerInvoices((prevFilteredInvoices) =>
          prevFilteredInvoices.map((invoice) =>
            invoice.id === id
              ? {
                  ...invoice,
                  paymentStatus: tempStatus.paymentStatus || invoice.paymentStatus,
                  invoiceStatus: tempStatus.invoiceStatus || invoice.invoiceStatus,
                }
              : invoice
          )
        );
        message.success(`Đã cập nhật trạng thái hóa đơn khách hàng ID: ${id}`);
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Không thể cập nhật trạng thái hóa đơn khách hàng";
        message.error(errorMessage);
        console.error("Error updating customer invoice status:", error);
      }
    } else {
      setSupplierInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice.id === id
            ? {
                ...invoice,
                paymentStatus: tempStatus.paymentStatus || invoice.paymentStatus,
                invoiceStatus: tempStatus.invoiceStatus || invoice.invoiceStatus,
              }
            : invoice
        )
      );
      setFilteredSupplierInvoices((prevFilteredInvoices) =>
        prevFilteredInvoices.map((invoice) =>
          invoice.id === id
            ? {
                ...invoice,
                paymentStatus: tempStatus.paymentStatus || invoice.paymentStatus,
                invoiceStatus: tempStatus.invoiceStatus || invoice.invoiceStatus,
              }
            : invoice
        )
      );
      message.success(`Đã cập nhật trạng thái hóa đơn nhà cung cấp ID: ${id}`);
    }

    setTempStatuses((prev) => {
      const newStatuses = { ...prev };
      delete newStatuses[id];
      return newStatuses;
    });
  };

  const customerColumns: ColumnsType<ICustomerInvoice> = [
    {
      title: "STT",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    { title: "Mã hóa đơn", dataIndex: "id", key: "id" },
    { title: "Mã người dùng", dataIndex: "user_id", key: "user_id" },
    { title: "Người dùng", dataIndex: "userName", key: "userName" },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (total: number) => `${total.toLocaleString()} VNĐ`,
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (_: any, record: ICustomerInvoice) => (
        <Select
          value={tempStatuses[record.id]?.paymentStatus || record.paymentStatus}
          onChange={(value: string) =>
            handlePaymentStatusChange(record.id, value as "Pending" | "Completed" | "Failed")
          }
          style={{ width: 120 }}
        >
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Completed">Completed</Select.Option>
          <Select.Option value="Failed">Failed</Select.Option>
        </Select>
      ),
    },
    {
      title: "Trạng thái hóa đơn",
      dataIndex: "invoiceStatus",
      key: "invoiceStatus",
      render: (_: any, record: ICustomerInvoice) => (
        <Select
          value={tempStatuses[record.id]?.invoiceStatus || record.invoiceStatus}
          onChange={(value: string) =>
            handleInvoiceStatusChange(record.id, value as "Pending" | "Paid" | "Cancelled")
          }
          style={{ width: 120 }}
        >
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Paid">Paid</Select.Option>
          <Select.Option value="Cancelled">Cancelled</Select.Option>
        </Select>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (value: string) => new Date(value).toLocaleDateString("vi-VN"),
    },
  ];

  const supplierColumns: ColumnsType<ISupplierInvoice> = [
    {
      title: "STT",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    { title: "Mã hóa đơn", dataIndex: "id", key: "id" },
    { title: "Nhà cung cấp", dataIndex: "supplierName", key: "supplierName" },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (total: number) => `${total.toLocaleString()} VNĐ`,
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (_: any, record: ISupplierInvoice) => (
        <Select
          value={tempStatuses[record.id]?.paymentStatus || record.paymentStatus}
          onChange={(value: string) =>
            handlePaymentStatusChange(record.id, value as "Pending" | "Completed" | "Failed")
          }
          style={{ width: 120 }}
        >
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Completed">Completed</Select.Option>
          <Select.Option value="Failed">Failed</Select.Option>
        </Select>
      ),
    },
    {
      title: "Trạng thái hóa đơn",
      dataIndex: "invoiceStatus",
      key: "invoiceStatus",
      render: (_: any, record: ISupplierInvoice) => (
        <Select
          value={tempStatuses[record.id]?.paymentStatus || record.paymentStatus}
          onChange={(value: string) =>
            handleInvoiceStatusChange(record.id, value as "Pending" | "Paid" | "Cancelled")
          }
          style={{ width: 120 }}
        >
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Paid">Paid</Select.Option>
          <Select.Option value="Cancelled">Cancelled</Select.Option>
        </Select>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (value: string) => new Date(value).toLocaleDateString("vi-VN"),
    },
  ];

  const renderActions = (record: ICustomerInvoice | ISupplierInvoice) => (
    <Space size="small">
      <Button
        type="primary"
        onClick={() => handleSave(record.id)}
        disabled={!tempStatuses[record.id]}
      >
        Lưu
      </Button>
      <Button type="default" onClick={() => handleViewDetail(record)}>
        Chi tiết
      </Button>
      <Button
        type="primary"
        danger
        onClick={() => tableRef.current?.showDeleteConfirm(record.id)}
      >
        Xóa
      </Button>
    </Space>
  );

  return (
    <div className="invoice-list-container">
      <div className="invoice-list-header">
        <h1 className="title">Danh sách hóa đơn</h1>
      </div>
      <div className="invoice-list-actions">
        <div className="left-actions">
          <button
            className={`btn-toggle ${tableType === "customer" ? "active" : ""}`}
            onClick={() => setTableType("customer")}
          >
            Hóa đơn cho khách
          </button>
          <button
            className={`btn-toggle ${tableType === "supplier" ? "active" : ""}`}
            onClick={() => setTableType("supplier")}
          >
            Hóa đơn cho nhà cung cấp
          </button>
        </div>
        <div className="right-actions">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <button className="btn-search" onClick={handleSearchClick}>
            <SearchOutlined />
          </button>
        </div>
      </div>
      <CustomTable
        ref={tableRef}
        data={tableType === "customer" ? filteredCustomerInvoices : filteredSupplierInvoices}
        columns={tableType === "customer" ? customerColumns : supplierColumns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
        loading={tableType === "customer" ? loading : false}
        customActions={renderActions}
        onDelete={handleDelete}
        deleteConfirmMessage={(record) =>
          `Bạn có chắc chắn muốn xóa hóa đơn của ${
            tableType === "customer" ? (record as ICustomerInvoice).userName : (record as ISupplierInvoice).supplierName
          } không?`
        }
      />
    </div>
  );
};

export default InvoiceList;