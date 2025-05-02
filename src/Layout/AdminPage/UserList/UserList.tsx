import { SearchOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Space, Spin, message } from "antd";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../../api/api";
import CustomTable, {
  CustomTableRef,
} from "../../../Components/CustomTable/CustomTable";
import { ADMIN_ROUTER_PATH } from "../../../Routers/Routers";
import "./UserList.scss";

interface IUser {
  id: number;
  user_name: string;
  email: string;
  phone_number: string;
  is_admin: boolean;
  user_rank: string;
  is_active: boolean;
}

const UserList: React.FC = () => {
  const tableRef = useRef<CustomTableRef>(null);
  const navigate = useNavigate();

  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProductMutation = useMutation({
    mutationFn: () => userApi.doGetAllUsers(),
    onSuccess: (response) => {
      const formattedUsers = response.data.map((user: any) => ({
        id: user.id,
        user_name: user.userName || user.email.split("@")[0] || "Unknown",
        email: user.email,
        phone_number: user.phoneNumber,
        is_admin: user.isAdmin,
        user_rank: user.userRank,
        is_active: user.isActive,
      }));
      setFilteredUsers(formattedUsers);
      setLoading(false);
    },
    onError: () => {
      setError("Lỗi khi tải danh sách người dùng!");
      message.error("Lỗi khi tải danh sách người dùng!");
      setLoading(false);
    },
  });

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredUsers(filteredUsers);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await userApi.doSearchUsers(searchQuery.trim());
      const usersToMap = Array.isArray(response)
        ? response
        : response.data || [];
      if (usersToMap.length === 0) {
        message.info("Không tìm thấy người dùng nào!");
      }
      const formattedResponse = usersToMap.map((user: any) => ({
        id: user.id,
        user_name: user.userName || user.email.split("@")[0] || "Unknown",
        email: user.email,
        phone_number: user.phoneNumber,
        is_admin: user.isAdmin,
        user_rank: user.userRank,
        is_active: user.isActive,
      }));
      setFilteredUsers(formattedResponse);
    } catch (err) {
      setError("Không thể tìm kiếm người dùng. Vui lòng thử lại.");
      message.error("Lỗi khi tìm kiếm người dùng!");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (id: string | number) => {
    try {
      await userApi.doDeleteUser(id);
      message.success("Xóa người dùng thành công!");
      setFilteredUsers((prev) => prev.filter((user) => user.id !== Number(id)));
    } catch (err: any) {
      console.error("Delete user error:", err);
      const errorMessage =
        err?.response?.data?.message ||
        "Lỗi khi xóa người dùng. Vui lòng thử lại!";
      message.error(errorMessage);
    }
  };

  const handleRefresh = () => {
    setSearchQuery("");
    setLoading(true);
    createProductMutation.mutate();
  };

  const userColumns = [
    {
      title: "STT",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    { title: "Tên tài khoản", dataIndex: "userName", key: "userName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Hạng", dataIndex: "userRank", key: "userRank" },
    { title: "Ngày tạo", dataIndex: "createdAt", key: "createdAt" },
    { title: "Số điện thoại", dataIndex: "phone_number", key: "phone_number" },
    { title: "Hạng", dataIndex: "user_rank", key: "user_rank" },
  ];

  const renderActions = (record: IUser) => (
    <Space>
      <Button
        onClick={() =>
          navigate(`${ADMIN_ROUTER_PATH.USER_DETAIL}/${record.id}`)
        }
      >
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
            onChange={handleSearchInputChange}
            className="search-input"
          />
          <Button
            className="btn-search"
            onClick={() => handleSearch(searchQuery)}
          >
            <SearchOutlined />
          </Button>
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
      ) : filteredUsers.length === 0 ? (
        <div className="empty-container">
          <p>Không có người dùng nào.</p>
          <Button onClick={handleRefresh}>Tải lại</Button>
        </div>
      ) : (
        <CustomTable
          ref={tableRef}
          data={filteredUsers}
          columns={userColumns}
          customActions={renderActions}
          onDelete={handleDelete}
          deleteConfirmMessage={(record) =>
            `Bạn có chắc chắn muốn xóa tài khoản ${record.userName} không?`
          }
        />
      )}
    </div>
  );
};

export default UserList;
