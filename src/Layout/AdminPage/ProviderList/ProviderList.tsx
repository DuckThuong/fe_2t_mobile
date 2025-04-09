import React, { useState, useRef, useEffect } from "react";
import { Button, Space, Input, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons"; // Icon tìm kiếm
import "./ProviderList.scss";
import CustomTable, { CustomTableRef } from "../../../Components/CustomTable/CustomTable";

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

  // State cho ô tìm kiếm
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProviders, setFilteredProviders] = useState<IProvider[]>(providers);

  // Ref để gọi hàm showDeleteConfirm từ CustomTable
  const tableRef = useRef<CustomTableRef>(null);

  // Cập nhật filteredProviders khi providers thay đổi
  useEffect(() => {
    setFilteredProviders(providers);
  }, [providers]);

  // Định nghĩa các cột cho bảng
  const columns: ColumnsType<IProvider> = [
    {
      title: "Mã nhà cung cấp",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên nhà cung cấp",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
  ];

  // Hàm xử lý khi nhấn nút "Thêm mới"
  const handleAddProvider = () => {
    message.info("Chuyển hướng đến trang thêm nhà cung cấp (chưa triển khai)");
    // Thay bằng logic thực tế, ví dụ: chuyển hướng đến trang thêm mới
  };

  // Hàm xử lý khi nhấn nút "Tải lại"
  const handleReload = () => {
    setSearchQuery(""); // Xóa ô tìm kiếm
    setFilteredProviders(providers); // Đặt lại danh sách đã lọc
    message.info("Đã tải lại danh sách nhà cung cấp");
    // Thay bằng logic thực tế, ví dụ: gọi lại API để lấy dữ liệu mới
  };

  // Hàm xử lý khi nhập vào ô tìm kiếm
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);

    // Nếu ô tìm kiếm rỗng, đặt lại danh sách
    if (!value.trim()) {
      setFilteredProviders(providers);
      return;
    }
  };

  // Hàm xử lý khi nhấn nút tìm kiếm
  const handleSearchClick = () => {
    if (!searchQuery.trim()) {
      setFilteredProviders(providers);
      return;
    }

    const searchTerms = searchQuery.trim().toLowerCase().split(/\s+/);
    const result = providers.filter((provider) =>
      searchTerms.every(
        (term) =>
          provider.id.toString().toLowerCase().includes(term) ||
          provider.name.toLowerCase().includes(term)
      )
    );
    setFilteredProviders(result);
  };

  // Hàm xử lý khi nhấn nút "Sửa"
  const handleEdit = (record: IProvider) => {
    message.info(`Mở form sửa nhà cung cấp với ID: ${record.id}`);
    // Thay bằng logic thực tế, ví dụ: mở modal hoặc chuyển hướng
  };

  // Hàm xử lý khi nhấn nút "Xóa"
  const handleDelete = (id: number | string) => {
    setProviders((prevProviders) =>
      prevProviders.filter((provider) => provider.id !== id)
    );
    setFilteredProviders((prevFilteredProviders) =>
      prevFilteredProviders.filter((provider) => provider.id !== id)
    );
    message.success(`Đã xóa nhà cung cấp với ID: ${id}`);
  };

  // Hàm tùy chỉnh cột "Hành động"
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

  // Hàm tùy chỉnh thông điệp xác nhận xóa
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

      {/* Bảng danh sách nhà cung cấp */}
      <CustomTable
        ref={tableRef}
        data={filteredProviders} // Sử dụng filteredProviders thay vì providers
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