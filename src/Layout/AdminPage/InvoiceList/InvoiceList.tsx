import React, { useState, useRef } from "react";
import CustomTable, { CustomTableRef } from "../../../Components/CustomTable/CustomTable";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Space, Select } from "antd";
import "./InvoiceList.scss";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTER_PATH } from "../../../Routers/Routers";

interface ICustomerInvoice {
  id: number;
  user_id: number;
  userName: string;
  total: number;
  payment_method: string;
  paymentStatus: "Pending" | "Completed" | "Failed"; // Cập nhật trạng thái
  invoiceStatus: "Pending" | "Paid" | "Cancelled";
  created_at: string;
}

interface ISupplierInvoice {
  id: number;
  supplierName: string;
  total: number;
  payment_method: string;
  paymentStatus: "Pending" | "Completed" | "Failed"; // Cập nhật trạng thái
  invoiceStatus: "Pending" | "Paid" | "Cancelled";
  created_at: string;
}

const InvoiceList: React.FC = () => {
  const navigate = useNavigate();
  const tableRef = useRef<CustomTableRef>(null);

  // State để chọn loại bảng
  const [tableType, setTableType] = useState<"customer" | "supplier">("customer");

  // Dữ liệu cho hóa đơn khách hàng
  const [customerInvoices, setCustomerInvoices] = useState<ICustomerInvoice[]>([
    {
      id: 1,
      user_id: 1,
      userName: "John Doe",
      total: 5000,
      payment_method: "Credit Card",
      paymentStatus: "Completed", // Cập nhật trạng thái
      invoiceStatus: "Paid",
      created_at: "2025-04-01",
    },
    {
      id: 2,
      user_id: 2,
      userName: "Jane Smith",
      total: 3000,
      payment_method: "Cash",
      paymentStatus: "Pending", // Cập nhật trạng thái
      invoiceStatus: "Pending",
      created_at: "2025-04-02",
    },
    {
      id: 3,
      user_id: 3,
      userName: "Alice Johnson",
      total: 7000,
      payment_method: "Bank Transfer",
      paymentStatus: "Failed", // Cập nhật trạng thái
      invoiceStatus: "Cancelled",
      created_at: "2025-04-03",
    },
  ]);

  // Dữ liệu cho hóa đơn nhà cung cấp
  const [supplierInvoices, setSupplierInvoices] = useState<ISupplierInvoice[]>([
    {
      id: 1,
      supplierName: "Supplier A",
      total: 10000,
      payment_method: "Bank Transfer",
      paymentStatus: "Completed", // Cập nhật trạng thái
      invoiceStatus: "Paid",
      created_at: "2025-04-01",
    },
    {
      id: 2,
      supplierName: "Supplier B",
      total: 8000,
      payment_method: "Cash",
      paymentStatus: "Pending", // Cập nhật trạng thái
      invoiceStatus: "Pending",
      created_at: "2025-04-02",
    },
    {
      id: 3,
      supplierName: "Supplier C",
      total: 12000,
      payment_method: "Credit Card",
      paymentStatus: "Failed", // Cập nhật trạng thái
      invoiceStatus: "Cancelled",
      created_at: "2025-04-03",
    },
  ]);

  // State để theo dõi các thay đổi tạm thời
  const [tempStatuses, setTempStatuses] = useState<{
    [key: number]: {
      paymentStatus?: "Pending" | "Completed" | "Failed";
      invoiceStatus?: "Pending" | "Paid" | "Cancelled";
    };
  }>({});

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomerInvoices, setFilteredCustomerInvoices] = useState<ICustomerInvoice[]>(customerInvoices);
  const [filteredSupplierInvoices, setFilteredSupplierInvoices] = useState<ISupplierInvoice[]>(supplierInvoices);

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

  const handleDelete = (id: number | string) => {
    if (tableType === "customer") {
      setCustomerInvoices((prevInvoices) =>
        prevInvoices.filter((invoice) => invoice.id !== id)
      );
      setFilteredCustomerInvoices((prevFilteredInvoices) =>
        prevFilteredInvoices.filter((invoice) => invoice.id !== id)
      );
    } else {
      setSupplierInvoices((prevInvoices) =>
        prevInvoices.filter((invoice) => invoice.id !== id)
      );
      setFilteredSupplierInvoices((prevFilteredInvoices) =>
        prevFilteredInvoices.filter((invoice) => invoice.id !== id)
      );
    }
    // Xóa trạng thái tạm thời nếu có
    setTempStatuses((prev) => {
      const newStatuses = { ...prev };
      delete newStatuses[id as number];
      return newStatuses;
    });
  };

  const handleCreate = () => {
    navigate(ADMIN_ROUTER_PATH.ORDER);
  };

  // Xử lý thay đổi trạng thái thanh toán (lưu tạm thời)
  const handlePaymentStatusChange = (
    id: number,
    value: "Pending" | "Completed" | "Failed"
  ) => {
    setTempStatuses((prev) => ({
      ...prev,
      [id]: { ...prev[id], paymentStatus: value },
    }));
  };

  // Xử lý thay đổi trạng thái hóa đơn (lưu tạm thời)
  const handleInvoiceStatusChange = (
    id: number,
    value: "Pending" | "Paid" | "Cancelled"
  ) => {
    setTempStatuses((prev) => ({
      ...prev,
      [id]: { ...prev[id], invoiceStatus: value },
    }));
  };

  // Xử lý lưu trạng thái
  const handleSave = (id: number) => {
    const tempStatus = tempStatuses[id];
    if (!tempStatus) return;

    if (tableType === "customer") {
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
    }

    // Xóa trạng thái tạm thời sau khi lưu
    setTempStatuses((prev) => {
      const newStatuses = { ...prev };
      delete newStatuses[id];
      return newStatuses;
    });
  };

  const customerColumns = [
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
      render: (total: number) => `${total} VNĐ`,
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
    { title: "Ngày tạo", dataIndex: "created_at", key: "created_at" },
  ];

  const supplierColumns = [
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
      render: (total: number) => `${total} VNĐ`,
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
    { title: "Ngày tạo", dataIndex: "created_at", key: "created_at" },
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