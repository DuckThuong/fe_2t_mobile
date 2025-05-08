import React, { useState, } from 'react';
import { Tabs, Card, Form, Input, Button, Radio,  } from 'antd';
import { 
  UserOutlined, 
  BankOutlined, 
  HomeOutlined, 
  LockOutlined, 
 
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { CUSTOMER_ROUTER_PATH } from '../../Routers/Routers';

import './styles.scss';

const { TabPane } = Tabs;


const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [form] = Form.useForm();








 
  return (
    <div className="profile-page">
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
      
          <TabPane tab={<span><LockOutlined /> Mật khẩu</span>} key="password" />
        </Tabs>
      </div>

      <div className="profile-content">
        {activeTab === 'profile' && (
          <Card title="Hồ Sơ Của Tôi" bordered={false} className="profile-card">
            <Form 
              form={form}
              layout="vertical"
            
            >
              <Form.Item label="Tên đăng nhập" name="username">
                <Input disabled />
              </Form.Item>
              
              <Form.Item label="Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
                <Input />
              </Form.Item>
              
              <Form.Item label="Email" name="email" rules={[{ type: 'email', message: 'Email không hợp lệ' }]}>
                <Input />
              </Form.Item>
              
              <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
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
                <Button type="primary" htmlType="submit" >Lưu</Button>
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