import React from "react";
import { Form, Input, Button, Modal, InputNumber } from "antd";
import "./AdminPromotionForm.scss";

interface AdminPromotionFormProps {
  initialValues?: any;
  isEdit?: boolean;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const AdminPromotionForm: React.FC<AdminPromotionFormProps> = ({
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
    <div className="promotion-form-container">
      <h1 className="title">{isEdit ? "Chỉnh sửa khuyến mãi" : "Thêm mới khuyến mãi"}</h1>
      <Form
        layout="vertical"
        form={form}
        initialValues={initialValues}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Tên khuyến mãi"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên khuyến mãi!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phần trăm khuyến mãi (%)"
          name="discountPercentage"
          rules={[
            { required: true, message: "Vui lòng nhập phần trăm khuyến mãi!" },
            {
              type: "number",
              min: 0,
              max: 100,
              message: "Phần trăm phải từ 0 đến 100!",
            },
          ]}
        >
          <InputNumber min={0} max={100} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Hóa đơn áp dụng (VNĐ)"
          name="minInvoiceAmount"
          rules={[
            { required: true, message: "Vui lòng nhập hóa đơn áp dụng!" },
            {
              type: "number",
              min: 0,
              message: "Hóa đơn áp dụng phải lớn hơn hoặc bằng 0!",
            },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
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

export default AdminPromotionForm;