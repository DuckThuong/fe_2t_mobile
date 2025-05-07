import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Spin, message, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "./UserDetail.scss";
import { userApi } from "../../../../api/api";
import { ADMIN_ROUTER_PATH } from "../../../../Routers/Routers";

// Interface khớp với dữ liệu API
interface IUser {
  id: number;
  userName: string | null;
  phoneNumber: string;
  email: string;
  isAdmin: boolean;
  userRank: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  userInformation?: any;
  fullName?: string;
  address?: string;
  gender?: string;
  birthday?: string;
  avatar?: string;
}

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Hàm lấy thông tin người dùng
  const fetchUser = async () => {
    if (!id || isNaN(Number(id))) {
      setError("ID người dùng không hợp lệ.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await userApi.doGetUserById(id);
      setUser(response);
    } catch (err) {
      setError("Không thể tải thông tin người dùng. Vui lòng thử lại.");
      message.error("Lỗi khi tải thông tin người dùng!");
    } finally {
      setLoading(false);
    }
  };

  // Hàm xóa người dùng
  const handleDelete = async () => {
    if (!id) return;

    setIsModalVisible(true);
  };

  // Xử lý khi xác nhận xóa trong modal
  const handleOk = async () => {
    setIsModalVisible(false);
    if (!id) return;

    try {
      await userApi.doDeleteUser(id); // Gọi API: DELETE /delete-user-by-id?Id=${id}
      message.success("Xóa tài khoản thành công!");
      navigate(ADMIN_ROUTER_PATH.USER_LIST);
    } catch (err) {
      message.error("Lỗi khi xóa tài khoản. Vui lòng thử lại!");
    }
  };

  // Xử lý khi hủy hoặc đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Gọi API khi component render
  useEffect(() => {
    fetchUser();
  }, [id]);

  // Hàm quay lại
  const handleBack = () => {
    navigate(ADMIN_ROUTER_PATH.USER_LIST);
  };

  return (
    <div className="user-detail-container">
      <div className="user-detail-header">
        <h1 className="title">Chi tiết người dùng</h1>
        <Button type="primary" onClick={handleBack}>
          Quay lại
        </Button>
      </div>

      {loading ? (
        <div className="loading-container">
          <Spin tip="Đang tải thông tin..." />
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
          <div>
            <Button type="primary" onClick={fetchUser} style={{ marginRight: 8 }}>
              Thử lại
            </Button>
            <Button onClick={handleBack}>Quay lại</Button>
          </div>
        </div>
      ) : user ? (
        <>
          <div className="user-header">
            <div>
              <h2 className="user-name">
                {user.fullName || user.userName || "Không có tên"}
                <a href={`mailto:${user.email}`} className="user-email">
                  ({user.email})
                </a>
              </h2>
            </div>
          </div>

          <div className="user-event">
            <span className="event-icon">
              <UserOutlined />
            </span>{" "}
            Tài khoản đã được tạo
            <span className="event-time">
              {dayjs(user.createdAt).format("DD/MM/YYYY HH:mm")}
            </span>
          </div>

          <div className="user-details-card">
            <div className="card-header">
              <h3>Chi tiết</h3>
            </div>

            <div className="info-section">
              <div className="info-block">
                <h4>Thông tin tài khoản</h4>
                <div className="info-row">
                  <label>ID</label>
                  <span>{user.id}</span>
                </div>
                <div className="info-row">
                  <label>Tên đăng nhập</label>
                  <span>{user.userName || "Không có"}</span>
                </div>
                <div className="info-row">
                  <label>Hạng người dùng</label>
                  <span>{user.userRank}</span>
                </div>
                <div className="info-row">
                  <label>Giới tính</label>
                  <span>{user.gender || "Không có"}</span>
                </div>
                <div className="info-row">
                  <label>Ngày sinh</label>
                  <span>{user.birthday || "Không có"}</span>
                </div>
                <div className="info-row">
                  <label>Trạng thái</label>
                  <span>{user.isActive ? "Đang hoạt động" : "Ngừng hoạt động"}</span>
                </div>
              </div>

              <div className="info-block">
                <h4>Thông tin liên hệ</h4>
                <div className="info-row">
                  <label>Email</label>
                  <span>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </span>
                </div>
                <div className="info-row">
                  <label>Số điện thoại</label>
                  <span>
                    <a href={`tel:${user.phoneNumber}`}>{user.phoneNumber}</a>
                  </span>
                </div>
                <div className="info-row">
                  <label>Địa chỉ</label>
                  <span>{user.address || "Không có"}</span>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <Button danger onClick={handleDelete}>
                Xóa tài khoản
              </Button>
            </div>
          </div>

          <Modal
            title="Xác nhận xóa"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ style: { backgroundColor: "#ff4d4f", borderColor: "#ff4d4f" } }}
            cancelButtonProps={{ style: { borderColor: "#d9d9d9", color: "#000" } }}
          >
            <p>
              Bạn có chắc chắn muốn xóa tài khoản{" "}
              <strong>{user?.userName}</strong> không?
            </p>
          </Modal>
        </>
      ) : (
        <div className="empty-container">
          <p>Không tìm thấy thông tin người dùng.</p>
          <Button type="primary" onClick={handleBack}>
            Quay lại danh sách
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserDetail;