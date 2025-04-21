import React, { useState, useRef } from "react";
import CustomTable, { CustomTableRef } from "../../../Components/CustomTable/CustomTable";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import "./UserList.scss";

interface IUser {
  id: number;
  user_name: string;
  phone_number: string;
  email: string;
  is_admin: boolean;
  user_rank: string;
  is_active: boolean;
  created_at: string;
  address: string;
}

const UserList: React.FC = () => {
  const tableRef = useRef<CustomTableRef>(null);
  const navigate = useNavigate();

  const [users, setUsers] = useState<IUser[]>([
    {
      id: 1,
      user_name: "nguyenvana",
      email: "vana@gmail.com",
      phone_number: "0912345678",
      is_admin: false,
      user_rank: "Bronze",
      is_active: true,
      created_at: "2025-01-01",
      address: "Hà Nội",
    },
    {
      id: 2,
      user_name: "tranthib",
      email: "thib@gmail.com",
      phone_number: "0987654321",
      is_admin: false,
      user_rank: "Silver",
      is_active: true,
      created_at: "2025-01-05",
      address: "Đà Nẵng",
    },
    {
      id: 3,
      user_name: "admin01",
      email: "admin@gmail.com",
      phone_number: "0901234567",
      is_admin: true,
      user_rank: "Diamond",
      is_active: true,
      created_at: "2025-01-10",
      address: "TP. HCM",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>(users);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    const term = searchQuery.trim().toLowerCase();
    const result = users.filter(
      (user) =>
        user.user_name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.phone_number.includes(term)
    );
    setFilteredUsers(result);
  };

  const handleDelete = (id: string | number) => {
    setUsers((prev) => prev.filter((user) => user.id !== Number(id)));
    setFilteredUsers((prev) => prev.filter((user) => user.id !== Number(id)));
  };

  const userColumns = [
    {
      title: "STT",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    { title: "Tên tài khoản", dataIndex: "user_name", key: "user_name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "phone_number", key: "phone_number" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    { title: "Hạng", dataIndex: "user_rank", key: "user_rank" },
    { title: "Ngày tạo", dataIndex: "created_at", key: "created_at" },
  ];

  const renderActions = (record: IUser) => (
    <Space>
      <Button onClick={() => navigate(`/admin/users/${record.id}`)}>Chi tiết</Button>
      <Button type="primary" danger onClick={() => tableRef.current?.showDeleteConfirm(record.id)}>
        Xóa
      </Button>
    </Space>
  );

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h1 className="title">Danh sách người dùng</h1>
      </div>
      <div className="user-list-actions">
        <div className="left-actions">
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
        data={filteredUsers}
        columns={userColumns}
        customActions={renderActions}
        onDelete={handleDelete}
        deleteConfirmMessage={(record) =>
          `Bạn có chắc chắn muốn xóa tài khoản ${record.user_name} không?`
        }
      />
    </div>
  );
};

export default UserList;



