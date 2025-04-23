import React from 'react';
import './UserDetail.scss';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const UserDetail: React.FC = () => {
  // Giả lập dữ liệu, bạn có thể thay thế bằng dữ liệu lấy từ API
  const user = {
    id: 1,
    user_name: 'tonyrobbins',
    email: 'tony@gmail.com',
    phone_number: '+1-202-555-0110',
    is_admin: false,
    user_rank: 'Gold',
    is_active: true,
    created_at: '2024-04-01 15:32',
    full_name: 'Tony Robbins',
    address: '8962 Lafayette St.\nOswego, NY 13126',
    gender: 'Male',
    birthday: '1990-01-01',
    avatar: '', // Có thể hiển thị nếu cần
  };

  return (
    <div className="user-detail-container">
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
        <span className="event-icon"><UserOutlined /></span> Tài khoản đã được tạo
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
              <span>{user.is_active ? 'Đang hoạt động' : 'Ngừng hoạt động'}</span>
            </div>
          </div>

          <div className="info-block">
            <h4>Thông tin liên hệ</h4>
            <div className="info-row">
              <label>Email</label>
              <span><a href={`mailto:${user.email}`}>{user.email}</a></span>
            </div>
            <div className="info-row">
              <label>Số điện thoại</label>
              <span><a href={`tel:${user.phone_number}`}>{user.phone_number}</a></span>
            </div>
            <div className="info-row">
              <label>Địa chỉ</label>
              <span>{user.address}</span>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <Button danger>Xóa tài khoản</Button>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
