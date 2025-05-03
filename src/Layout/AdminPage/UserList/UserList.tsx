import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Space, Spin, message } from "antd";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../../api/api";
import CustomTable, { CustomTableRef } from "../../../Components/CustomTable/CustomTable";
import { ADMIN_ROUTER_PATH } from "../../../Routers/Routers";
import "./UserList.scss";

interface ApiUser {
  id: number;
  userName?: string;
  email: string;
  phoneNumber?: string;
  isAdmin: boolean;
  userRank: string;
  isActive: boolean;
}

interface IUser {
  id: number;
  user_name: string;
  email: string;
  phone_number: string | undefined;
  is_admin: boolean;
  user_rank: string;
  is_active: boolean;
}

const UserList: React.FC = () => {
  const tableRef = useRef<CustomTableRef>(null);
  const navigate = useNavigate();

  const [users, setUsers] = useState<IUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const formatUserData = (apiUsers: ApiUser[]): IUser[] =>
    apiUsers.map((user) => ({
      id: user.id,
      user_name: user.userName || user.email.split("@")[0] || "Unknown",
      email: user.email,
      phone_number: user.phoneNumber,
      is_admin: user.isAdmin,
      user_rank: user.userRank,
      is_active: user.isActive,
    }));

  const { data: usersData, isLoading, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await userApi.doGetAllUsers();
      return formatUserData(Array.isArray(response) ? response : response?.data || []);
    },
  });

  // Cập nhật users khi dữ liệu từ query thay đổi
  React.useEffect(() => {
    if (usersData) {
      setUsers(usersData);
    }
  }, [usersData]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setUsers(usersData || []);
      return;
    }
    try {
      const response = await userApi.doSearchUsers(query.trim());
      const usersToMap = Array.isArray(response) ? response : response?.data || [];
      if (usersToMap.length === 0) {
        message.info("Không tìm thấy người dùng nào!");
      }
      setUsers(formatUserData(usersToMap));
    } catch (err) {
      message.error("Lỗi khi tìm kiếm người dùng!");
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (id: string | number) => {
    try {
      await userApi.doDeleteUser(id);
      message.success("Xóa người dùng thành công!");
      setUsers((prev) => prev.filter((user) => user.id !== Number(id)));
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Lỗi khi xóa người dùng. Vui lòng thử lại!";
      message.error(errorMessage);
    }
  };

  const handleRefresh = () => {
    setSearchQuery("");
    refetch();
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
    { title: "Hạng", dataIndex: "user_rank", key: "user_rank" },
  ];

  const renderActions = (record: IUser) => (
    <Space>
      <Button
        onClick={() => navigate(`${ADMIN_ROUTER_PATH.USER_DETAIL}/${record.id}`)}
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
          <Button className="btn-search" onClick={() => handleSearch(searchQuery)}>
            <SearchOutlined />
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div className="loading-container">
          <Spin tip="Đang tải dữ liệu..." />
        </div>
      ) : error ? (
        <div className="error-container">
          <p>Lỗi khi tải danh sách người dùng!</p>
        </div>
      ) : users.length === 0 ? (
        <div className="empty-container">
          <p>Không có người dùng nào.</p>
        </div>
      ) : (
        <CustomTable
          ref={tableRef}
          data={users}
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