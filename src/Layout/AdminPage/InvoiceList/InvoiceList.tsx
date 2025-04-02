import React, { useState, useRef } from "react";
import CustomTable, { CustomTableRef } from "../../../Components/CustomTable/CustomTable";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import "./InvoiceList.scss";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTER_PATH } from "../../../Routers/Routers";

interface IInvoice {
  id: number;
  user_id: number;
  userName: string;
  total: number;
  payment_method: string;
  paymentStatus: string;
  status: string;
  return_status: string;
  created_at: string;
}

const InvoiceList: React.FC = () => {
  const navigate = useNavigate();
  const tableRef = useRef<CustomTableRef>(null);

  const [invoices, setInvoices] = useState<IInvoice[]>([
    {
      id: 1,
      user_id: 1,
      userName: "John Doe",
      total: 5000,
      payment_method: "Credit Card",
      paymentStatus: "Paid",
      status: "Paid",
      return_status: "No Return",
      created_at: "2025-04-01",
    },
    {
      id: 2,
      user_id: 2,
      userName: "Jane Smith",
      total: 3000,
      payment_method: "Cash",
      paymentStatus: "Pending",
      status: "Pending",
      return_status: "Returned",
      created_at: "2025-04-02",
    },
    {
      id: 3,
      user_id: 3,
      userName: "Alice Johnson",
      total: 7000,
      payment_method: "Bank Transfer",
      paymentStatus: "Overdue",
      status: "Pending",
      return_status: "No Return",
      created_at: "2025-04-03",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState<IInvoice[]>(invoices);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    const searchTerms = searchQuery.trim().toLowerCase().split(/\s+/);
    const result = invoices.filter((invoice) =>
      searchTerms.every(
        (term) =>
          invoice.id.toString().toLowerCase().includes(term) ||
          invoice.userName.toLowerCase().includes(term) 
      )
    );
    setFilteredInvoices(result);
  };

  const handleDelete = (id: number | string) => {
    setInvoices((prevInvoices) =>
      prevInvoices.filter((invoice) => invoice.id !== id)
    );
    setFilteredInvoices((prevFilteredInvoices) =>
      prevFilteredInvoices.filter((invoice) => invoice.id !== id)
    );
  };

  // const handleEdit = (invoice: IInvoice) => {
  //   navigate(`${ADMIN_ROUTER_PATH.ORDER}/${invoice.id}`, {
  //     state: { invoice },
  //   });
  // };

  const handleCreate = () => {
    navigate(ADMIN_ROUTER_PATH.ORDER);
  };

  const invoiceColumns = [
    {
      title: "STT",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    { title: "Mã hóa đơn", dataIndex: "id", key: "id" },
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
    },
    { title: "Trạng thái hóa đơn", dataIndex: "status", key: "status" },
    {
      title: "Trạng thái trả hàng",
      dataIndex: "return_status",
      key: "return_status",
    },
    { title: "Ngày tạo", dataIndex: "created_at", key: "created_at" },
  ];

  const renderActions = (record: IInvoice) => (
    <Space size="small">
      {/* <Button type="primary" onClick={() => handleEdit(record)}>
        Sửa
      </Button> */}
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
          {/* <button className="btn-create" onClick={handleCreate}>
            Thêm mới
          </button> */}
          <button className="btn-refresh">Tải lại</button>
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
        data={filteredInvoices}
        columns={invoiceColumns}
        customActions={renderActions}
        onDelete={handleDelete}
        deleteConfirmMessage={(record) =>
          `Bạn có chắc chắn muốn xóa hóa đơn của ${record.userName} không?`
        }
      />
    </div>
  );
};

export default InvoiceList;