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
import { Link } from 'react-router-dom';
import { CUSTOMER_ROUTER_PATH } from '../../Routers/Routers';
import './styles.scss';

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
    email: '',
    phone: '...03',
    gender: 'male',
    dob: '**/**/2003',
    avatar: ''
  });

  const [banks, setBanks] = useState([
    {
      id: '1',
      bank: 'VCB - NH TMCP NGOAI THUONG VIE...',
      status: 'Đã kiểm tra',
      name: 'TRAN KHANH HUNG',
      isDefault: true,
      branch: 'Viet Nam (Vietcombank)/Chi nhánh khác',
      cardNumber: '•••• 4868'
    }
  ]);

  const [addresses, setAddresses] = useState([
    {
      id: '1',
      name: 'Trần khánh hùng',
      phone: '(+84) 948 682 103',
      address: 'Số 167, Phố Định Công Hạ, Phường Định Công, Quận Hoàng Mai, Hà Nội',
      isDefault: true
    },
    {
      id: '2',
      name: 'Hoàng Ngu (mới)',
      phone: '(+84) 846 850 458',
      address: 'Số Nhà 06,   Thị Trấn Cẩm Xuyên, Huyện Cẩm Xuyên, Hà Tĩnh',
      isDefault: false
    },
  ]);

  // Xử lý cập nhật profile
  const handleProfileSubmit = (values: any) => {
    setProfile({...profile, ...values});
    message.success('Cập nhật thông tin thành công');
  };

  // Xử lý thêm ngân hàng
  const handleAddBank = (values: any) => {
    const newBank = {
      id: Date.now().toString(),
      bank: values.bankName,
      status: 'Chờ xác minh',
      name: values.accountName,
      isDefault: false,
      branch: values.branch,
      cardNumber: `•••• ${values.cardNumber.slice(-4)}`
    };
    setBanks([...banks, newBank]);
    bankForm.resetFields();
    message.success('Thêm ngân hàng thành công');
  };

  // Xử lý thêm địa chỉ
  const handleAddAddress = (values: any) => {
    const newAddress = {
      id: Date.now().toString(),
      name: values.name,
      phone: values.phone,
      address: `${values.street}, ${values.ward}, ${values.district}, ${values.province}`,
      isDefault: false
    };
    setAddresses([...addresses, newAddress]);
    addressForm.resetFields();
    message.success('Thêm địa chỉ thành công');
  };

  // Xử lý xóa ngân hàng
  const handleDeleteBank = (id: string) => {
    if (banks.find(b => b.id === id)?.isDefault) {
      message.error('Không thể xóa tài khoản mặc định');
      return;
    }
    setBanks(banks.filter(b => b.id !== id));
    message.success('Xóa tài khoản ngân hàng thành công');
  };

  // Xử lý xóa địa chỉ
  const handleDeleteAddress = (id: string) => {
    if (addresses.find(a => a.id === id)?.isDefault) {
      message.error('Không thể xóa địa chỉ mặc định');
      return;
    }
    setAddresses(addresses.filter(a => a.id !== id));
    message.success('Xóa địa chỉ thành công');
  };

  // Xử lý đặt làm mặc định
  const handleSetDefault = (type: 'bank' | 'address', id: string) => {
    if (type === 'bank') {
      setBanks(banks.map(b => ({
        ...b,
        isDefault: b.id === id
      })));
    } else {
      setAddresses(addresses.map(a => ({
        ...a,
        isDefault: a.id === id
      })));
    }
    message.success('Đặt làm mặc định thành công');
  };

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
              onFinish={handleProfileSubmit}
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
                <Button type="primary" htmlType="submit">Lưu</Button>
              </Form.Item>
            </Form>
            
            <div className="upload-section">
              <Upload
                beforeUpload={(file) => {
                  if (file.size > 1024 * 1024) {
                    message.error('File phải nhỏ hơn 1MB');
                    return false;
                  }
                  setProfile({...profile, avatar: URL.createObjectURL(file)});
                  return false;
                }}
                accept=".jpg,.jpeg,.png"
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Chọn Ảnh</Button>
              </Upload>
              {profile.avatar && <img src={profile.avatar} alt="Avatar" className="avatar-preview" />}
              <p>Dụng lượng file tối đa 1 MB</p>
              <p>Định dạng: JPEG, .PNG</p>
            </div>
          </Card>
        )}

        {activeTab === 'bank' && (
          <Card title="Thẻ Tín Dụng/Ghi Nợ" bordered={false} className="profile-card">
            <div className="bank-section">
              <h3>Tài Khoản Ngân Hàng Của Tôi</h3>
              
              <Table
                columns={[
                  { title: 'Ngân hàng', dataIndex: 'bank', key: 'bank' },
                  { title: 'Tên tài khoản', dataIndex: 'name', key: 'name' },
                  { title: 'Số thẻ', dataIndex: 'cardNumber', key: 'cardNumber' },
                  { 
                    title: 'Mặc định', 
                    key: 'isDefault',
                    render: (_, record) => (
                      record.isDefault 
                        ? <Tag icon={<CheckOutlined />} color="success">Mặc định</Tag>
                        : <Button 
                            type="link" 
                            onClick={() => handleSetDefault('bank', record.id)}
                          >
                            Đặt mặc định
                          </Button>
                    )
                  },
                  {
                    title: 'Thao tác',
                    key: 'action',
                    render: (_, record) => (
                      <Button 
                        type="text" 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => handleDeleteBank(record.id)}
                        disabled={record.isDefault}
                      />
                    ),
                  },
                ]}
                dataSource={banks}
                pagination={false}
                rowKey="id"
              />
              
              <Form form={bankForm} layout="vertical" onFinish={handleAddBank} className="add-form">
                <h3>Thêm ngân hàng mới</h3>
                <Form.Item name="bankName" label="Tên ngân hàng" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="accountName" label="Tên chủ tài khoản" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="cardNumber" label="Số thẻ" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="branch" label="Chi nhánh" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>Thêm ngân hàng</Button>
              </Form>
            </div>
          </Card>
        )}

        {activeTab === 'address' && (
          <Card title="Địa chỉ của tôi" bordered={false} className="profile-card">
            <div className="address-section">
              <h3>Danh sách địa chỉ</h3>
              
              {addresses.map(address => (
                <div key={address.id} className="address-card">
                  <div className="address-info">
                    <h4>{address.name} {address.phone}</h4>
                    <p>{address.address}</p>
                    {address.isDefault && <Tag color="blue">Mặc định</Tag>}
                  </div>
                  <div className="address-actions">
                    {!address.isDefault && (
                      <>
                        <Button 
                          type="link" 
                          onClick={() => handleSetDefault('address', address.id)}
                        >
                          Đặt mặc định
                        </Button>
                        <Button 
                          type="text" 
                          danger 
                          icon={<DeleteOutlined />} 
                          onClick={() => handleDeleteAddress(address.id)}
                        />
                      </>
                    )}
                  </div>
                </div>
              ))}
              
              <Form form={addressForm} layout="vertical" onFinish={handleAddAddress} className="add-form">
                <h3>Thêm địa chỉ mới</h3>
                <Form.Item name="name" label="Họ và tên" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="street" label="Số nhà, đường" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="ward" label="Phường/Xã" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="district" label="Quận/Huyện" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="province" label="Tỉnh/Thành phố" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>Thêm địa chỉ</Button>
              </Form>
            </div>
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