import React from "react";
import { Form, Input, Button, Modal } from "antd";

interface AdminProviderFormProps {
  initialValues?: any;
  isEdit?: boolean;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const AdminProviderForm: React.FC<AdminProviderFormProps> = ({
  initialValues,
  isEdit = false,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onSubmit(values);
  };

  const handleCancel = () => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn hủy?",
      onOk: onCancel,
    });
  };

  return (
    <div className="provider-form-container">
      <h1 className="title">{isEdit ? "Chỉnh sửa nhà cung cấp" : "Thêm mới nhà cung cấp"}</h1>
      <Form
        layout="vertical"
        form={form}
        initialValues={initialValues}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Tên nhà cung cấp"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ type: "email", message: "Email không hợp lệ!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Địa chỉ" name="address">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isEdit ? "Lưu" : "Thêm"}
          </Button>
          <Button onClick={handleCancel} style={{ marginLeft: 10 }}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminProviderForm;
