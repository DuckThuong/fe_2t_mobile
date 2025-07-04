import React, { useState, useEffect, useRef } from "react";
import CustomTable, {
  CustomTableRef,
} from "../../../Components/CustomTable/CustomTable";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Space, Spin, message } from "antd";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../../api/api";
import "./UserList.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../../api/apiConfig";

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

  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const fetchUsers = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await userApi.doGetAllUsers();
  //     setUsers(response);
  //     setFilteredUsers(response);
  //   } catch (err) {
  //     setError("Không thể tải danh sách người dùng. Vui lòng thử lại.");
  //     message.error("Lỗi khi tải danh sách người dùng!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const createProductMutation = useMutation({
    mutationFn: () => userApi.doGetAllUsers(),
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredUsers(users);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await userApi.doSearchUsers(query.trim());
      setFilteredUsers(response);
    } catch (err) {
      setError("Không thể tìm kiếm người dùng. Vui lòng thử lại.");
      message.error("Lỗi khi tìm kiếm người dùng!");
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi component được render lần đầu
  useEffect(() => {
    createProductMutation.mutate();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    handleSearch(query);
  };

  const handleDelete = async (id: string | number) => {
    try {
      await userApi.doDeleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== Number(id)));
      setFilteredUsers((prev) => prev.filter((user) => user.id !== Number(id)));
      message.success("Xóa người dùng thành công!");
    } catch (err) {
      message.error("Lỗi khi xóa người dùng. Vui lòng thử lại!");
    }
  };

  const handleRefresh = () => {
    setSearchQuery(""); // Xóa query tìm kiếm
    // fetchUsers(); // Tải lại danh sách đầy đủ
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
      <Button onClick={() => navigate(`/admin/user-list/${record.id}`)}>
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
    <div className="user-list-container">
      <div className="user-list-header">
        <h1 className="title">Danh sách người dùng</h1>
      </div>
      <div className="user-list-actions">
        <div className="left-actions">
          <button className="btn-refresh" onClick={handleRefresh}>
            Tải lại
          </button>
        </div>
        <div className="right-actions">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button className="btn-search">
            <SearchOutlined />
          </button>
        </div>
      </div>
      {loading ? (
        <div className="loading-container">
          <Spin tip="Đang tải dữ liệu..." />
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
          <Button onClick={handleRefresh}>Thử lại</Button>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default UserList;
