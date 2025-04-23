import React, { useState, useRef, useEffect } from "react";
import { Button, Space, Input, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import "./ProviderList.scss";
import CustomTable, {
  CustomTableRef,
} from "../../../Components/CustomTable/CustomTable";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTER_PATH } from "../../../Routers/Routers";

interface IProvider {
  id: number;
  name: string;
  phone: string;
  address: string;
  email: string;
  created_at: string;
  updated_at: string;
}

const ProviderList: React.FC = () => {
  const navigate = useNavigate();
  const [providers, setProviders] = useState<IProvider[]>([
    {
      id: 1,
      name: "chiến dẫn",
      phone: "0987456123",
      address: "hà nội",
      email: "chien@gmail.com",
      created_at: "2023-10-01",
      updated_at: "2023-10-01",
    },
    {
      id: 2,
      name: "Nhà cung cấp B",
      phone: "0123456789",
      address: "TP.HCM",
      email: "nccb@gmail.com",
      created_at: "2023-10-02",
      updated_at: "2023-10-02",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProviders, setFilteredProviders] = useState<IProvider[]>(providers);
  const tableRef = useRef<CustomTableRef>(null);

  useEffect(() => {
    setFilteredProviders(providers);
  }, [providers]);

  const columns: ColumnsType<IProvider> = [
    { title: "Mã nhà cung cấp", dataIndex: "id", key: "id" },
    { title: "Tên nhà cung cấp", dataIndex: "name", key: "name" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
  ];

  const handleAddProvider = () => {
    navigate(ADMIN_ROUTER_PATH.ADD_PROVIDER);
  };

  const handleReload = () => {
    setSearchQuery("");
    setFilteredProviders(providers);
    message.info("Đã tải lại danh sách nhà cung cấp");
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);

    if (!value.trim()) {
      setFilteredProviders(providers);
    }
  };

  const handleSearchClick = () => {
    if (!searchQuery.trim()) {
      setFilteredProviders(providers);
      return;
    }

    const searchTerms = searchQuery.trim().toLowerCase().split(/\s+/);
    const result = providers.filter((provider) =>
      searchTerms.every(
        (term) =>
          provider.id.toString().includes(term) ||
          provider.name.toLowerCase().includes(term)
      )
    );
    setFilteredProviders(result);
  };

  const handleEdit = (record: IProvider) => {
    navigate(ADMIN_ROUTER_PATH.EDIT_PROVIDER(record.id));
  };

  const handleDelete = (id: number | string) => {
    setProviders((prev) => prev.filter((p) => p.id !== id));
    setFilteredProviders((prev) => prev.filter((p) => p.id !== id));
    message.success(`Đã xóa nhà cung cấp với ID: ${id}`);
  };

  const customActions = (record: IProvider) => (
    <Space size="middle">
      <Button type="primary" onClick={() => handleEdit(record)}>
        Sửa
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

  const deleteConfirmMessage = (record: IProvider) =>
    `Bạn có chắc chắn muốn xóa nhà cung cấp "${record.name}" không?`;

  return (
    <div className="provider-list-container">
      <div className="provider-list-header">
        <h1 className="title">Danh sách nhà cung cấp</h1>
      </div>
      <div className="provider-list-actions">
        <div className="left-actions">
          <button className="btn-create" onClick={handleAddProvider}>
            Thêm mới
          </button>
          <button className="btn-refresh" onClick={handleReload}>
            Tải lại
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
        data={filteredProviders}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
        loading={false}
        customActions={customActions}
        onDelete={handleDelete}
        deleteConfirmMessage={deleteConfirmMessage}
      />
    </div>
  );
};

export default ProviderList;
