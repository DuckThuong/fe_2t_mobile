import React, { useState, useEffect } from "react";
import { Button, DatePicker, Form, Input, Modal, Select, Table, Radio, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./EditShipment.scss";
import AdminProviderForm from "../../../../Components/AdminProviderForm/AdminProviderForm";

const { Option } = Select;

interface IShipment {
  id: string;
  name: string;
  date: string;
  totalValue: number;
  quantity: number;
}

interface IProduct {
  id: number;
  name: string;
  brand: string;
  category: string;
  quantity: number;
  price: number;
  shipmentId: string;
  image: string;
  createdAt: string;
}

const EditShipment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const shipment: IShipment | undefined = location.state?.shipment;
  const products: IProduct[] = location.state?.products || [];

  const [providerModalOpen, setProviderModalOpen] = useState(false);
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [form] = Form.useForm();
  const [newProductForm] = Form.useForm();
  const [productRows, setProductRows] = useState<any[]>([]);

  useEffect(() => {
    if (shipment && id === shipment.id) {
      const shipmentProducts = products
        .filter((p) => p.shipmentId === shipment.id)
        .map((p) => ({
          id: p.id.toString(),
          sku: `SKU-${p.id}`,
          name: p.name,
          brand: p.brand,
          category: p.category,
          quantity: p.quantity,
          price: p.price,
          total: p.quantity * p.price,
        }));
      setProductRows(shipmentProducts);

      // Khởi tạo form với date và time không thể chỉnh sửa
      form.setFieldsValue({
        name: shipment.name,
        date: shipment.date ? dayjs(shipment.date, "DD/MM/YYYY") : dayjs(),
        time: dayjs(), // Giả sử lấy giờ hiện tại, vì IShipment không có time
        type: "Điện thoại",
        provider: "1",
        paymentMethod: "cash",
      });
    }
  }, [shipment, products, id, form]);

  const handleAddProductRow = () => {
    setProductRows([
      ...productRows,
      {
        id: uuidv4(),
        sku: null,
        name: "",
        brand: "",
        category: "",
        quantity: 1,
        price: 0,
        total: 0,
      },
    ]);
  };

  const handleNewProduct = (values: any) => {
    const newProduct = {
      id: uuidv4(),
      sku: `SKU-${Date.now()}`,
      name: values.name,
      brand: values.brand,
      category: values.category,
      quantity: 1,
      price: 0,
      total: 0,
    };
    setProductRows([...productRows, newProduct]);
    setShowNewProductModal(false);
    newProductForm.resetFields();
  };

  const handleProductChange = (value: string, record: any) => {
    const updated = productRows.map((p) =>
      p.id === record.id
        ? {
            ...p,
            sku: value,
            name: mockSKUs.find((sku) => sku.value === value)?.label || "",
            brand: mockSKUs.find((sku) => sku.value === value)?.brand || p.brand,
            category: mockSKUs.find((sku) => sku.value === value)?.category || p.category,
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
        total: (p.quantity || 0) * (p.price || 0),
      }))
    );
  };

  const handleSubmit = () => {
    form.validateFields()
      .then((values) => {
        if (!shipment) return;
        const updatedShipment: IShipment = {
          ...shipment,
          name: values.name,
          date: values.date ? values.date.format("DD/MM/YYYY") : shipment.date,
          totalValue: productRows.reduce((sum, p) => sum + (p.total || 0), 0),
          quantity: productRows.reduce((sum, p) => sum + (p.quantity || 0), 0),
        };

        const updatedProducts = productRows.map((p) => ({
          id: parseInt(p.id) || Math.floor(Math.random() * 1000),
          name: p.name,
          brand: p.brand,
          category: p.category,
          quantity: p.quantity,
          price: p.price,
          shipmentId: shipment.id,
          image: p.image || "https://muabandienthoai24h.vn/storage/images/GuMUm6Asw6_1679905172.jpg",
          createdAt: p.createdAt || new Date().toISOString().split("T")[0],
        }));

        location.state?.onUpdate?.(updatedShipment, updatedProducts);
        message.success("Cập nhật lô hàng thành công!");
        navigate("/admin/product-list");
      })
      .catch(() => {
        message.error("Vui lòng kiểm tra lại thông tin!");
      });
  };

  const columns: ColumnsType<any> = [
    {
      title: "Mã sản phẩm",
      dataIndex: "sku",
      render: (text, record) => (
        <Select
          value={text}
          onChange={(val) => handleProductChange(val, record)}
          placeholder="Chọn mã sản phẩm"
          style={{ width: 160 }}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Button
                icon="+"
                type="link"
                onClick={() => setShowNewProductModal(true)}
                style={{ marginLeft: 8 }}
              >
                Thêm sản phẩm mới
              </Button>
            </>
          )}
        >
          {mockSKUs.map((item) => (
            <Option key={item.value} value={item.value}>
              {item.value} - {item.label}
            </Option>
          ))}
        </Select>
      ),
    },
    { title: "Tên sản phẩm", dataIndex: "name" },
    {
      title: "Hãng",
      dataIndex: "brand",
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleChange("brand", e.target.value, record)}
        />
      ),
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleChange("category", e.target.value, record)}
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
            handleChange("quantity", parseInt(e.target.value) || 1, record)
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
      render: (text) => <span>{text.toLocaleString()} VND</span>,
    },
  ];

  if (!shipment || id !== shipment.id) {
    return <div>Không tìm thấy lô hàng!</div>;
  }

  return (
    <div className="add-shipment-page">
      <h1>Chỉnh sửa lô hàng</h1>
      <div style={{ marginBottom: 16 }}>
        <strong>Mã lô hàng:</strong> {shipment.id}
      </div>

      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Tên lô hàng"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên lô hàng" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Loại hàng hóa"
          name="type"
          rules={[{ required: true, message: "Vui lòng chọn loại hàng hóa" }]}
        >
          <Select>
            <Option value="Điện thoại">Điện thoại</Option>
            <Option value="Phụ kiện">Phụ kiện</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Nhà cung cấp"
          name="provider"
          rules={[{ required: true, message: "Vui lòng chọn nhà cung cấp" }]}
        >
          <div style={{ display: "flex", gap: 10 }}>
            <Select placeholder="Chọn nhà cung cấp" style={{ flex: 1 }}>
              <Option value="1">Công ty A</Option>
              <Option value="2">Công ty B</Option>
            </Select>
            <Button icon="+" onClick={() => setProviderModalOpen(true)} />
          </div>
        </Form.Item>

        <Form.Item
          label="Phương thức thanh toán"
          name="paymentMethod"
          rules={[{ required: true, message: "Vui lòng chọn phương thức thanh toán" }]}
        >
          <Radio.Group>
            <Radio value="cash">Tiền mặt</Radio>
            <Radio value="bank">Chuyển khoản</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Ngày nhập" name="date">
          <DatePicker format="DD/MM/YYYY" disabled />
        </Form.Item>

        <Form.Item label="Giờ nhập" name="time">
          <DatePicker.TimePicker format="HH:mm" disabled />
        </Form.Item>

        <h3>Chi tiết sản phẩm</h3>
        <Table
          dataSource={productRows}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
        <Button onClick={handleAddProductRow} style={{ marginTop: 10 }}>
          Thêm sản phẩm
        </Button>

        <div style={{ marginTop: 20 }}>
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            htmlType="submit"
          >
            Lưu
          </Button>
          <Button danger onClick={() => navigate("/admin/product-list")}>
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
        <Form layout="vertical" form={newProductForm} onFinish={handleNewProduct}>
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="brand"
            label="Hãng"
            rules={[{ required: true, message: "Vui lòng nhập hãng" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Thể loại"
            rules={[{ required: true, message: "Vui lòng nhập thể loại" }]}
          >
            <Input />
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

export default EditShipment;

const mockSKUs = [
  { value: "SKU001", label: "OnePlus Nord N20", brand: "OnePlus", category: "Phones" },
  { value: "SKU002", label: "Nokia G10", brand: "Nokia", category: "Phones" },
  { value: "SKU003", label: "Samsung Galaxy S21", brand: "Samsung", category: "Phones" },
  { value: "SKU004", label: "iPhone 13", brand: "Apple", category: "Phones" },
  { value: "SKU005", label: "Google Pixel 6", brand: "Google", category: "Phones" },
];