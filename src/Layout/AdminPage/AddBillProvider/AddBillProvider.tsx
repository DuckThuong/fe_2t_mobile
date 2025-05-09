import React, { useState, useCallback, useMemo } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Table,
  TimePicker,
  message,
  Row,
  Col,
  Upload,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import "./AddBillProvider.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  capacityApi,
  colorApi,
  productApi,
  vendorsApi,
} from "../../../api/api";
import {
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  CreateProductPayload,
  CreateVendorBillPayload,
} from "../../../api/constants";
import { convertImagesToBase64 } from "../../../api/authApi";

const { Option } = Select;

interface ProductRow {
  id: string;
  sku: string | null;
  name: string;
  capacity: string;
  color: string;
  quantity: number;
  price: number;
  total: number;
  productId: string | null;
}

const AddBillProvider: React.FC = () => {
  const [providerModalOpen, setProviderModalOpen] = useState(false);
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [form] = Form.useForm();
  const [newProductForm] = Form.useForm();
  const [providerForm] = Form.useForm();
  const [productRows, setProductRows] = useState<ProductRow[]>([
    {
      id: uuidv4(),
      sku: null,
      name: "",
      capacity: "",
      color: "",
      quantity: 0,
      price: 0,
      total: 0,
      productId: null,
    },
  ]);
  const shipmentCode = useMemo(() => `SHIP-${uuidv4().slice(0, 8)}`, []);

  const { data: providers, refetch: refetchProviders } = useQuery({
    queryKey: ["providers"],
    queryFn: vendorsApi.getAllVendors,
  });

  const { data: products = [], refetch: refetchProducts } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await productApi.getAllProducts();
      return Array.isArray(response) ? response : response?.data || [];
    },
  });

  const { data: capacities, isLoading: isCapacitiesLoading } = useQuery({
    queryKey: ["capacities"],
    queryFn: capacityApi.getAllCapacities,
  });

  const { data: colors, isLoading: isColorsLoading } = useQuery({
    queryKey: ["colors"],
    queryFn: colorApi.getAllColors,
  });

  const createProviderMutation = useMutation({
    mutationFn: vendorsApi.createVendor,
    onSuccess: () => {
      message.success("Thêm nhà cung cấp thành công!");
      setProviderModalOpen(false);
      providerForm.resetFields();
      refetchProviders();
    },
    onError: (error: Error) => {
      message.error(`Thêm nhà cung cấp thất bại: ${error.message}`);
    },
  });

  const createProductMutation = useMutation({
    mutationFn: productApi.createProduct,
    onSuccess: () => {
      message.success("Thêm sản phẩm thành công!");
      setShowNewProductModal(false);
      newProductForm.resetFields();
      refetchProducts();
    },
    onError: (error: any) => {
      message.error(
        `Thêm sản phẩm thất bại: ${
          error.response?.data?.message || error.message
        }`
      );
    },
  });

  const createBillMutation = useMutation({
    mutationFn: vendorsApi.createVendorBill,
    onSuccess: () => {
      message.success("Thêm lô hàng thành công!");
      form.resetFields();
      setProductRows([
        {
          id: uuidv4(),
          sku: null,
          name: "",
          capacity: "",
          color: "",
          quantity: 0,
          price: 0,
          total: 0,
          productId: null,
        },
      ]);
    },
    onError: (error: Error) => {
      message.error(`Thêm lô hàng thất bại: ${error.message}`);
    },
  });

  const handleProductChange = useCallback(
    (value: string, record: ProductRow) => {
      const selectedProduct = products.find((p: any) => p.id === value);

      const capacity = capacities?.find(
        (c: any) => c.id === selectedProduct?.productDetails[0].capacity.id
      );

      const productColors = colors?.filter(
        (c: any) => c.id === selectedProduct?.productColor[0].id
      );

      setProductRows((prev) =>
        prev.map((p) =>
          p.id === record.id
            ? {
                ...p,
                productId: value,
                sku: selectedProduct?.id || "",
                name: selectedProduct?.name || "",
                capacity: capacity?.display_name || "",
                color: productColors?.map((c: any) => c.name).join(", ") || "",
              }
            : p
        )
      );
    },
    [products, capacities, colors]
  );

  const handleChange = useCallback(
    (key: string, value: number, record: ProductRow) => {
      setProductRows((prev) =>
        prev.map((p) => {
          if (p.id !== record.id) return p;
          const updated = { ...p, [key]: value };
          return { ...updated, total: updated.quantity * updated.price };
        })
      );
    },
    []
  );

  const addProductRow = useCallback(() => {
    setProductRows((prev) => [
      ...prev,
      {
        id: uuidv4(),
        sku: null,
        name: "",
        capacity: "",
        color: "",
        quantity: 0,
        price: 0,
        total: 0,
        productId: null,
      },
    ]);
  }, []);

  const removeProductRow = useCallback(
    (id: string) => {
      if (productRows.length === 1) {
        message.warning("Phải có ít nhất một sản phẩm!");
        return;
      }
      setProductRows((prev) => prev.filter((row) => row.id !== id));
    },
    [productRows.length]
  );

  const columns: ColumnsType<ProductRow> = useMemo(
    () => [
      {
        title: "Mã sản phẩm",
        dataIndex: "sku",
        width: 220,
        render: (_, record) => (
          <Select
            value={record.productId}
            onChange={(val) => handleProductChange(val, record)}
            placeholder="Chọn mã sản phẩm"
            style={{ width: 160 }}
            disabled={!products.length}
          >
            {products.map((item: any) => (
              <Option key={item.id} value={item.id}>
                {item.id} - {item.name}
              </Option>
            ))}
          </Select>
        ),
      },
      { title: "Tên sản phẩm", dataIndex: "name" },
      { title: "Dung lượng", dataIndex: "capacity" },
      { title: "Màu sắc", dataIndex: "color" },
      {
        title: "Số lượng",
        dataIndex: "quantity",
        render: (text, record) => (
          <Input
            type="number"
            min={1}
            value={text}
            onChange={(e) =>
              handleChange("quantity", parseInt(e.target.value) || 0, record)
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
              handleChange("price", parseInt(e.target.value) || 0, record)
            }
          />
        ),
      },
      {
        title: "Tổng tiền",
        dataIndex: "total",
        render: (text) => <span>{text.toLocaleString()} đ</span>,
      },
      {
        title: "Hành động",
        dataIndex: "action",
        render: (_, record) => (
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => removeProductRow(record.id)}
          >
            Xóa
          </Button>
        ),
      },
    ],
    [products, handleProductChange, handleChange, removeProductRow]
  );

  const onModalSubmit = useCallback(async () => {
    try {
      const values = await newProductForm.validateFields();

      const base64Images = await convertImagesToBase64(
        values.images?.map((img: any) => img.originFileObj).filter(Boolean) ||
          []
      );

      const payload: CreateProductPayload = {
        name: values.name,
        capacity_id: parseInt(values.capacity) || 0,
        color_ids: values.color ? [parseInt(values.color)] : [],
        images: base64Images,
        description: "",
        release_year: new Date().getFullYear(),
        warranty_period: 0,
        provider_id: 0,
        is_featured: true,
        model: "",
        specs: {
          screen_size: "",
          resolution: "",
          chipset: "",
          ram: "",
          os: "",
          battery_capacity: "",
          charging_tech: "",
        },
        price: 0,
      };
      createProductMutation.mutate(payload);
    } catch (err) {
      console.log("Validation failed:", err);
    }
  }, [newProductForm, createProductMutation]);

  const onProviderSubmit = useCallback(async () => {
    try {
      const values = await providerForm.validateFields();
      const payload = {
        vendor_code: `VEND-${uuidv4().slice(0, 8)}`,
        name: values.name,
        phone: values.phone,
        email: values.email,
        address: values.address,
        contact_person_id: 0,
      };
      createProviderMutation.mutate(payload);
    } catch (err) {
      console.log("Validation failed:", err);
    }
  }, [providerForm, createProviderMutation]);

  const onFinish = useCallback(
    async (values: any) => {
      const payload: CreateVendorBillPayload = {
        lotCode: shipmentCode,
        itemType: values.type,
        vendorId: parseInt(values.provider),
        paymentMethod: values.paymentMethod === "cash" ? "CASH" : "BANK",
        orderDate: dayjs().format("YYYY-MM-DD"),
        orderTime: dayjs().format("HH:mm"),
        status: "PENDING",
        note: values.note || "",
        items: productRows
          .filter((row) => row.productId)
          .map((row) => ({
            productId: parseInt(row.productId!),
            quantity: row.quantity,
            unitPrice: row.price,
            totalPrice: row.quantity * row.price,
          })),
      };

      if (!payload.items.length) {
        message.error("Vui lòng thêm ít nhất một sản phẩm!");
        return;
      }

      createBillMutation.mutate(payload);
    },
    [shipmentCode, productRows, createBillMutation]
  );

  return (
    <div className="add-shipment-page">
      <h1>Thêm lô hàng</h1>
      <div style={{ marginBottom: 16 }}>
        <strong>Mã lô hàng:</strong> {shipmentCode}
      </div>

      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Loại hàng hóa"
          name="type"
          rules={[{ required: true, message: "Vui lòng chọn loại hàng hóa" }]}
        >
          <Select placeholder="Chọn loại hàng hóa">
            <Option value="Điện thoại">Điện thoại</Option>
            <Option value="Phụ kiện">Phụ kiện</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Nhà cung cấp" required>
          <div style={{ display: "flex", gap: 10 }}>
            <Form.Item
              name="provider"
              rules={[
                { required: true, message: "Vui lòng chọn nhà cung cấp" },
              ]}
              noStyle
            >
              <Select placeholder="Chọn nhà cung cấp" style={{ flex: 1 }}>
                {providers?.map((provider: any) => (
                  <Select.Option
                    key={provider.id}
                    value={provider.id.toString()}
                  >
                    {provider.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Button
              icon={<PlusOutlined />}
              onClick={() => setProviderModalOpen(true)}
            />
          </div>
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Phương thức thanh toán"
              name="paymentMethod"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn phương thức thanh toán",
                },
              ]}
            >
              <Select placeholder="Chọn phương thức">
                <Option value="cash">Tiền mặt</Option>
                <Option value="bank">Chuyển khoản</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Ngày nhập">
              <DatePicker value={dayjs()} disabled style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Giờ nhập">
              <TimePicker
                value={dayjs()}
                disabled
                format="HH:mm"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Ghi chú" name="note">
          <Input.TextArea rows={3} />
        </Form.Item>

        <h3>Chi tiết sản phẩm</h3>
        <Table
          dataSource={productRows}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
        <Button
          icon={<PlusOutlined />}
          style={{ marginTop: 10, marginRight: 10 }}
          onClick={addProductRow}
        >
          Thêm
        </Button>
        <Button
          icon={<PlusOutlined />}
          onClick={() => setShowNewProductModal(true)}
        >
          Thêm sản phẩm mới
        </Button>

        <div style={{ marginTop: 20 }}>
          <Button type="primary" style={{ marginRight: 10 }} htmlType="submit">
            Lưu
          </Button>
          <Button danger onClick={() => form.resetFields()}>
            Hủy
          </Button>
        </div>
      </Form>

      <Modal
        title="Thêm nhà cung cấp"
        open={providerModalOpen}
        onCancel={() => setProviderModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form layout="vertical" form={providerForm} onFinish={onProviderSubmit}>
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
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
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
              Thêm
            </Button>
            <Button
              onClick={() => setProviderModalOpen(false)}
              style={{ marginLeft: 10 }}
            >
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Thêm sản phẩm mới"
        open={showNewProductModal}
        onCancel={() => setShowNewProductModal(false)}
        footer={null}
      >
        <Form layout="vertical" form={newProductForm} onFinish={onModalSubmit}>
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
              {capacities?.map(
                (capacity: { id: number; display_name: string }) => (
                  <Option key={capacity.id} value={capacity.id.toString()}>
                    {capacity.display_name}
                  </Option>
                )
              )}
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
              {colors?.map((color: { id: number; name: string }) => (
                <Option key={color.id} value={color.id.toString()}>
                  {color.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="images"
            label="Hình ảnh"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload beforeUpload={() => false} listType="picture" multiple>
              <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddBillProvider;
