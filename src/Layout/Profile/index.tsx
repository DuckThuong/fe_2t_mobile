import React, { useState } from 'react';
import { Tabs, Card, Form, Input, Button, Radio, Upload, Table, Tag, Space, message, Modal } from 'antd';
import { 
  UserOutlined, 
  BankOutlined, 
  HomeOutlined, 
  LockOutlined, 
  UploadOutlined, 
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  CheckOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { CUSTOMER_ROUTER_PATH } from '../../Routers/Routers';
import './styles.scss';
import axios from 'axios';

const { TabPane } = Tabs;
const { confirm } = Modal;

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [form] = Form.useForm();
  const [bankForm] = Form.useForm();
  const [addressForm] = Form.useForm();

  // State quản lý dữ liệu
  const [profile, setProfile] = useState({
    username: 'Khanh.hung03',
    name: 'KhanhHung',
    email: 'Khanhhhung2132gmail.com',
    phone: '0948682103',
    gender: 'male',
    dob: '**/**/2003',
    avatar: ''
  });

<<<<<<< Updated upstream
   const handleProfileSubmit = (values: any) => {
=======

  // Xử lý cập nhật profile
  const handleProfileSubmit = (values: any) => {
>>>>>>> Stashed changes
    setProfile({...profile, ...values});
    message.success('Cập nhật thông tin thành công');
  };

<<<<<<< Updated upstream
 const navigate = useNavigate();
 const submit = async () => {
  try {
    const values = await form.validateFields();

    const payload = {
      userName: values.email.split('@')[0],
      email: values.email,
      phoneNumber: values.phone,
      gender: values.gender,
      name: values.name,
      dob: values.dob,
    };

    const res = await axios.post("http://localhost:3300/user/update-profile", payload);

    message.success("Cập nhật thông tin thành công!");
    setProfile({ ...profile, ...values });
  } catch (error) {
    message.error("Cập nhật thất bại!");
    console.error("Lỗi cập nhật: ", error);
  }
};


=======
>>>>>>> Stashed changes

  return (
    <div className="profile-page">
      {/* Sidebar với logo */}
      <div className="profile-sidebar">
        <Link to={CUSTOMER_ROUTER_PATH.TRANG_CHU} className="logo-link">
          <img src="/logo.jpg" alt="Logo" className="logo-image" />
        </Link>
        
        <Tabs 
          tabPosition="left" 
          activeKey={activeTab} 
          onChange={setActiveTab}
          className="sidebar-tabs"
        >
          <TabPane tab={<span><UserOutlined /> Hồ sơ</span>} key="profile" />
          {/* <TabPane tab={<span><BankOutlined /> Ngân hàng</span>} key="bank" /> */}
          {/* <TabPane tab={<span><HomeOutlined /> Địa chỉ</span>} key="address" /> */}
          <TabPane tab={<span><LockOutlined /> Mật khẩu</span>} key="password" />
        </Tabs>
      </div>

      {/* Nội dung chính */}
      <div className="profile-content">
        {activeTab === 'profile' && (
          <Card title="Hồ Sơ Của Tôi" bordered={false} className="profile-card">
            <Form 
              form={form}
              layout="vertical"
              initialValues={profile}
              onFinish={submit}
            >
              <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
                <Input disabled/>
              </Form.Item>

              {/* <Form.Item label="Tên đăng nhập" name="username">
                <Input disabled />
              </Form.Item> */}
              
              <Form.Item label="Họ và tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
                <Input />
              </Form.Item>
              
              <Form.Item label="Email" name="email" rules={[{ type: 'email', message: 'Email không hợp lệ' }]}>
                <Input />
              </Form.Item>
              
              
              
              <Form.Item label="Giới tính" name="gender">
                <Radio.Group>
                  <Radio value="male">Nam</Radio>
                  <Radio value="female">Nữ</Radio>
                  <Radio value="other">Khác</Radio>
                </Radio.Group>
              </Form.Item>
              
              <Form.Item label="Ngày sinh" name="dob" rules={[{ required: true, message: 'Vui lòng nhập ngày sinh' }]}>
                <Input type="date" />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit">Lưu</Button>
              </Form.Item>
            </Form>
            

          </Card>
        )}

 

        {activeTab === 'password' && (
          <Card title="Bảo mật tài khoản" bordered={false} className="profile-card">
            <div className="security-section">
              
              
              <Form layout="vertical">
                <Form.Item label="Mật khẩu hiện tại" name="currentPassword" rules={[{ required: true }]}>
                  <Input.Password />
                </Form.Item>
                <Form.Item label="Mật khẩu mới" name="newPassword" rules={[{ required: true }]}>
                  <Input.Password />
                </Form.Item>
                <Form.Item 
                  label="Nhập lại mật khẩu mới" 
                  name="confirmPassword"
                  dependencies={['newPassword']}
                  rules={[
                    { required: true },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Mật khẩu nhập lại không khớp!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Button type="primary">Đổi mật khẩu</Button>
              </Form>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Profile;