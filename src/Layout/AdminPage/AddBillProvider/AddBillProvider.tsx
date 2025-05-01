import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Table,
  TimePicker,
  Radio,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import "./AddBillProvider.scss";
import AdminProviderForm from "../../../Components/AdminProviderForm/AdminProviderForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateProductPayload } from "../../../api/constants";
import { capacityApi, colorApi, productApi } from "../../../api/api";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddBillProvider: React.FC = () => {
  const [providerModalOpen, setProviderModalOpen] = useState(false);
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [form] = Form.useForm();
  const [newProductForm] = Form.useForm();
  const [productRows, setProductRows] = useState<any[]>([
    {
      id: uuidv4(),
      sku: null,
      name: "",
      capacity: "",
      color: "",
      quantity: 1,
      price: 0,
      total: 0,
    },
  ]);
  const [recentlyAddedProducts, setRecentlyAddedProducts] = useState<any[]>([]);
  const [shipmentCode] = useState(`SHIP-${uuidv4().slice(0, 8)}`);

  const { data: capacities, isLoading: isCapacitiesLoading } = useQuery({
    queryKey: ["capacities"],
    queryFn: async () => {
      const response = await colorApi.getAllColors();
      return response.data; 
    },
  });

  const { data: colors, isLoading: isColorsLoading } = useQuery({
    queryKey: ["colors"],
    queryFn: async () => {
      const response = await capacityApi.getAllCapacities();
      return response.data; 
    },
  });

  const handleAddProductRow = () => {
    setProductRows([
      ...productRows,
      {
        id: uuidv4(),
        sku: null,
        name: "",
        capacity: "",
        color: "",
        quantity: 1,
        price: 0,
        total: 0,
      },
    ]);
  };

  const handleProductChange = (value: string, record: any) => {
    const selectedProduct = recentlyAddedProducts.find((p) => p.sku === value);
    const updated = productRows.map((p) =>
      p.id === record.id
        ? {
            ...p,
            sku: value,
            name: selectedProduct?.name || "",
            capacity: selectedProduct?.capacity || p.capacity,
            color: selectedProduct?.color || p.color,
          }
        : p
    );
    setProductRows(updated);
  };

  const handleChange = (key: string, value: any, record: any) => {
    const updated = productRows.map((p) =>
      p.id === record.id ? { ...p, [key]: value } : p
    );
    setProductRows(
      updated.map((p) => ({
        ...p,
        total: p.quantity * p.price,
      }))
    );
  };

  const columns: ColumnsType<any> = [
    {
      title: "Mã sản phẩm",
      dataIndex: "sku",
      width: 220,
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Select
            value={text}
            onChange={(val) => handleProductChange(val, record)}
            placeholder="Chọn mã sản phẩm"
            style={{ width: 160 }}
            disabled={recentlyAddedProducts.length === 0}
          >
            {recentlyAddedProducts.slice(0, 5).map((item) => (
              <Option key={item.sku} value={item.sku}>
                {item.sku} - {item.name}
              </Option>
            ))}
          </Select>
          <Button
            icon={<PlusOutlined />}
            type="link"
            className="add-product-button"
            onClick={() => setShowNewProductModal(true)}
          />
        </div>
      ),
    },
    { title: "Tên sản phẩm", dataIndex: "name" },
    {
      title: "Dung lượng",
      dataIndex: "capacity",
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleChange("capacity", e.target.value, record)}
        />
      ),
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleChange("color", e.target.value, record)}
        />
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      render: (text, record) => (
        <Input
          type="number"
          min={1}
          value={text}
          onChange={(e) =>
            handleChange("quantity", parseInt(e.target.value), record)
          }
        />
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      render: (text, record) => (
        <Input
          type="number"
          min={0}
          value={text}
          onChange={(e) =>
            handleChange("price", parseInt(e.target.value), record)
          }
        />
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      render: (text) => <span>{text.toLocaleString()} đ</span>,
    },
  ];

  const createProductMutation = useMutation({
    mutationFn: (payload: CreateProductPayload) =>
      productApi.createProduct(payload),
    onSuccess: () => {
      console.log("success");
      setShowNewProductModal(false);
    },
    onError: () => {
      console.log("error");
    },
  });

  const onModalSubmit = async () => {
    try {
      const values = await newProductForm.validateFields();
      const payload: CreateProductPayload = {
        name: values.name,
        warranty: values.capacity,
        color: values.color,
      };
      createProductMutation.mutate(payload, {
        onSuccess: () => {
          const newProduct = {
            id: uuidv4(),
            sku: `SKU-${Date.now()}`,
            name: values.name,
            capacity: values.capacity,
            color: values.color,
            quantity: 1,
            price: 0,
            total: 0,
          };
          // Add to productRows for the table
          setProductRows([...productRows, newProduct]);
          // Add to recentlyAddedProducts for the dropdown
          setRecentlyAddedProducts([newProduct, ...recentlyAddedProducts]);
          setShowNewProductModal(false);
          newProductForm.resetFields();
        },
      });
    } catch (err) {
      console.log("Validation failed:", err);
    }
  };

  return (
    <div className="add-shipment-page">
      <h1>Thêm lô hàng</h1>
      <div style={{ marginBottom: 16 }}>
        <strong>Mã lô hàng:</strong> {shipmentCode}
      </div>

      <Form layout="vertical" form={form}>
        <Form.Item label="Loại hàng hóa" name="type">
          <Select>
            <Option value="Điện thoại">Điện thoại</Option>
            <Option value="Phụ kiện">Phụ kiện</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Nhà cung cấp" name="provider">
          <div style={{ display: "flex", gap: 10 }}>
            <Select placeholder="Chọn nhà cung cấp" style={{ flex: 1 }}>
              <Option value="1">Công ty A</Option>
              <Option value="2">Công ty B</Option>
            </Select>
            <Button
              icon={<PlusOutlined />}
              onClick={() => setProviderModalOpen(true)}
            />
          </div>
        </Form.Item>

        <Form.Item label="Phương thức thanh toán" name="paymentMethod">
          <Radio.Group>
            <Radio value="cash">Tiền mặt</Radio>
            <Radio value="bank">Chuyển khoản</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Ngày nhập">
          <DatePicker value={dayjs()} disabled />
        </Form.Item>

        <Form.Item label="Giờ nhập">
          <TimePicker value={dayjs()} disabled format="HH:mm" />
        </Form.Item>

        <h3>Chi tiết sản phẩm</h3>
        <Table
          dataSource={productRows}
          columns={columns}
          rowKey="id"
          pagination={false}
        />

        <div style={{ marginTop: 20 }}>
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            onClick={() => form.submit()}
          >
            Thêm
          </Button>
          <Button danger onClick={() => form.resetFields()}>
            Hủy
          </Button>
        </div>
      </Form>

      <Modal
        open={providerModalOpen}
        footer={null}
        onCancel={() => setProviderModalOpen(false)}
        destroyOnClose
      >
        <AdminProviderForm
          onSubmit={() => setProviderModalOpen(false)}
          onCancel={() => setProviderModalOpen(false)}
        />
      </Modal>

      <Modal
        title="Thêm sản phẩm mới"
        open={showNewProductModal}
        onCancel={() => setShowNewProductModal(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          form={newProductForm}
          onFinish={onModalSubmit}
        >
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="capacity"
            label="Dung lượng"
            rules={[{ required: true, message: "Vui lòng chọn dung lượng" }]}
          >
            <Select
              placeholder="Chọn dung lượng"
              loading={isCapacitiesLoading}
              disabled={isCapacitiesLoading}
            >
              {capacities?.map((capacity: string) => (
                <Option key={capacity} value={capacity}>
                  {capacity}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="color"
            label="Màu sắc"
            rules={[{ required: true, message: "Vui lòng chọn màu sắc" }]}
          >
            <Select
              placeholder="Chọn màu sắc"
              loading={isColorsLoading}
              disabled={isColorsLoading}
            >
              {colors?.map((color: string) => (
                <Option key={color} value={color}>
                  {color}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => onModalSubmit()}>
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddBillProvider;