import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Spin, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./UserDetail.scss";
import { userApi } from "../../../../api/api";

interface IUser {
  id: number;
  user_name: string;
  phone_number: string;
  email: string;
  is_admin: boolean;
  user_rank: string;
  is_active: boolean;
  created_at: string;
  full_name: string;
  address: string;
  gender: string;
  birthday: string;
  avatar: string;
}

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Lấy ID từ URL
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hàm lấy thông tin người dùng theo ID
  const fetchUser = async () => {
    if (!id) return;

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

    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
      try {
        await userApi.doDeleteUser(id);
        message.success("Xóa tài khoản thành công!");
        navigate("/admin/user-list"); // Quay lại trang danh sách sau khi xóa
      } catch (err) {
        message.error("Lỗi khi xóa tài khoản. Vui lòng thử lại!");
      }
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    fetchUser();
  }, [id]);

  // Hàm quay lại trang danh sách
  const handleBack = () => {
    navigate("/admin/user-list");
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
          <Button type="primary" onClick={fetchUser}>
            Thử lại
          </Button>
        </div>
      ) : user ? (
        <>
          <div className="user-header">
            <div>
              <h2 className="user-name">
                {user.full_name}
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
            <span className="event-time">{user.created_at}</span>
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
                  <span>{user.user_name}</span>
                </div>
                <div className="info-row">
                  <label>Hạng người dùng</label>
                  <span>{user.user_rank}</span>
                </div>
                <div className="info-row">
                  <label>Giới tính</label>
                  <span>{user.gender}</span>
                </div>
                <div className="info-row">
                  <label>Ngày sinh</label>
                  <span>{user.birthday}</span>
                </div>
                <div className="info-row">
                  <label>Trạng thái</label>
                  <span>{user.is_active ? "Đang hoạt động" : "Ngừng hoạt động"}</span>
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
                    <a href={`tel:${user.phone_number}`}>{user.phone_number}</a>
                  </span>
                </div>
                <div className="info-row">
                  <label>Địa chỉ</label>
                  <span>{user.address}</span>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <Button danger onClick={handleDelete}>
                Xóa tài khoản
              </Button>
            </div>
          </div>
        </>
      ) : (
        <p>Không tìm thấy thông tin người dùng.</p>
      )}
    </div>
  );
};

export default UserDetail;