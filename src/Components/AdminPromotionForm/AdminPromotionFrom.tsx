import React, { useMemo } from "react";
import { Form, Input, Button, Modal, InputNumber, DatePicker, Radio, Switch } from "antd";
import "./AdminPromotionForm.scss";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { CreateDiscountsPayload } from "../../api/constants";

dayjs.extend(utc);
dayjs.extend(timezone);

interface AdminPromotionFormProps {
  initialValues?: CreateDiscountsPayload;
  isEdit?: boolean;
  onSubmit: (values: CreateDiscountsPayload) => void;
  onCancel: () => void;
}

const AdminPromotionForm: React.FC<AdminPromotionFormProps> = ({
  initialValues,
  isEdit = false,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();

  // Chuẩn hóa initialValues với useMemo để tránh re-render không cần thiết
  const formattedInitialValues = useMemo(() => {
    if (!initialValues) {
      return { discount_type: "percentage", is_active: true };
    }
    return {
      ...initialValues,
      start_date: initialValues.start_date
        ? dayjs(initialValues.start_date, "YYYY-MM-DD").tz("Asia/Ho_Chi_Minh")
        : null,
      end_date: initialValues.end_date
        ? dayjs(initialValues.end_date, "YYYY-MM-DD").tz("Asia/Ho_Chi_Minh")
        : null,
    };
  }, [initialValues]);

  // Handle discount_type change to re-validate discount_value
  const handleDiscountTypeChange = () => {
    form.validateFields(["discount_value"]);
  };

  const handleFinish = (values: any) => {
    // Format dates to YYYY-MM-DD
    const formattedValues: CreateDiscountsPayload = {
      ...values,
      start_date: values.start_date
        ? values.start_date.tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD")
        : "",
      end_date: values.end_date
        ? values.end_date.tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD")
        : "",
    };
    onSubmit(formattedValues);
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
        initialValues={formattedInitialValues}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Tên khuyến mãi"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tên khuyến mãi!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Loại giảm giá"
          name="discount_type"
          rules={[{ required: true, message: "Vui lòng chọn loại giảm giá!" }]}
        >
          <Radio.Group onChange={handleDiscountTypeChange}>
            <Radio value="percentage">Phần trăm</Radio>
            <Radio value="fixed_amount">Cố định</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Giá trị giảm"
          name="discount_value"
          rules={[
            { required: true, message: "Vui lòng nhập giá trị giảm!" },
            {
              type: "number",
              min: 0,
              message: "Giá trị giảm phải lớn hơn hoặc bằng 0!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  getFieldValue("discount_type") === "percentage" &&
                  value > 100
                ) {
                  return Promise.reject(
                    new Error("Giá trị giảm không được vượt quá 100%!")
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Ngày bắt đầu"
          name="start_date"
          rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}
        >
          <DatePicker
            format="YYYY-MM-DD"
            style={{ width: "100%" }}
            placeholder="Chọn ngày bắt đầu"
          />
        </Form.Item>
        <Form.Item
          label="Ngày kết thúc"
          name="end_date"
          rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc!" }]}
        >
          <DatePicker
            format="YYYY-MM-DD"
            style={{ width: "100%" }}
            placeholder="Chọn ngày kết thúc"
          />
        </Form.Item>
        <Form.Item
          label="Trạng thái"
          name="is_active"
          valuePropName="checked"
        >
          <Switch checkedChildren="Hoạt động" unCheckedChildren="Không hoạt động" />
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