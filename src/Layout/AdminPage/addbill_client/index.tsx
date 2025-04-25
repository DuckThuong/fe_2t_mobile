import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import "./style.scss";

const { Option } = Select;

interface IProductOption {
  name: string;
  colors: {
    color: string;
    capacities: {
      capacity: string;
      price: number;
    }[];
  }[];
}

interface ISelectedProduct {
  id: number;
  name: string;
  color: string;
  capacity: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

const productOptions: IProductOption[] = [
  {
    name: "iPhone 14",
    colors: [
      {
        color: "Đen",
        capacities: [
          { capacity: "128GB", price: 20000000 },
          { capacity: "256GB", price: 22000000 },
        ],
      },
      {
        color: "Trắng",
        capacities: [
          { capacity: "128GB", price: 20000000 },
          { capacity: "256GB", price: 22000000 },
        ],
      },
    ],
  },
  {
    name: "iPhone 15 Pro",
    colors: [
      {
        color: "Titan",
        capacities: [
          { capacity: "128GB", price: 27000000 },
          { capacity: "256GB", price: 29000000 },
          { capacity: "512GB", price: 33000000 },
        ],
      },
    ],
  },
];

const saleOptions = [
  { label: "Không áp dụng", value: 0 },
  { label: "Giảm 500.000₫", value: 500000 },
  { label: "Giảm 1.000.000₫", value: 1000000 },
  { label: "Giảm 5.000.000₫", value: 5000000 },
];
const idOrderCode = "hd213";
const encodedOrderCode = encodeURIComponent(idOrderCode);

const AddBill_Client: React.FC = () => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState<ISelectedProduct[]>([]);
  const [selectedSale, setSelectedSale] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: Date.now(),
        name: "",
        color: "",
        capacity: "",
        quantity: 1,
        price: 0,
        totalPrice: 0,
      },
    ]);
  };

  const removeProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const updateProduct = (
    id: number,
    field: keyof ISelectedProduct,
    value: string | number
  ) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, [field]: value };

          if (field === "name") {
            updated.color = "";
            updated.capacity = "";
            updated.price = 0;
          }

          if (field === "color") {
            updated.capacity = "";
            updated.price = 0;
          }

          if (field === "capacity") {
            const price = productOptions
              .find((prod) => prod.name === updated.name)
              ?.colors.find((c) => c.color === updated.color)
              ?.capacities.find((cap) => cap.capacity === value)?.price || 0;
            updated.price = price;
          }

          updated.totalPrice = updated.price * updated.quantity;
          return updated;
        }
        return p;
      })
    );
  };

  const totalBill = products.reduce((sum, p) => sum + p.totalPrice, 0);
  const finalBill = Math.max(0, totalBill - selectedSale);

  const handleFinish = (values: any) => {
    console.log("Thông tin hóa đơn:", {
      ...values,
      products,
      discount: selectedSale,
      finalBill,
    });
  };

  return (
    <div className="add-bill-container">
      <h1 className="main-title">Thêm mới hóa đơn cho khách hàng</h1>

      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        className="bill-form"
      >
        <div className="form-row">
          <Form.Item
            label="Tên khách hàng"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên khách hàng" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>
        </div>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Ghi chú" name="note">
          <Input.TextArea rows={3} />
        </Form.Item>

        <h3>Thông tin sản phẩm</h3>
        {products.map((product) => {
          const selectedProduct = productOptions.find((p) => p.name === product.name);
          const selectedColor = selectedProduct?.colors.find((c) => c.color === product.color);
          const capacities = selectedColor?.capacities || [];

          return (
            <div key={product.id} className="product-item">
              <Space align="baseline" wrap>
                <Form.Item label="Tên máy">
                  <Select
                    placeholder="Chọn máy"
                    value={product.name}
                    onChange={(val) => updateProduct(product.id, "name", val)}
                    style={{ width: 150 }}
                  >
                    {productOptions.map((p) => (
                      <Option key={p.name} value={p.name}>
                        {p.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item label="Màu">
                  <Select
                    placeholder="Chọn màu"
                    value={product.color}
                    onChange={(val) => updateProduct(product.id, "color", val)}
                    disabled={!product.name}
                    style={{ width: 120 }}
                  >
                    {selectedProduct?.colors.map((c) => (
                      <Option key={c.color} value={c.color}>
                        {c.color}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item label="Dung lượng">
                  <Select
                    placeholder="Chọn dung lượng"
                    value={product.capacity}
                    onChange={(val) => updateProduct(product.id, "capacity", val)}
                    disabled={!product.color}
                    style={{ width: 140 }}
                  >
                    {capacities.map((cap) => (
                      <Option key={cap.capacity} value={cap.capacity}>
                        {cap.capacity}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item label="Số lượng">
                  <InputNumber
                    min={1}
                    value={product.quantity}
                    onChange={(val) => updateProduct(product.id, "quantity", val || 1)}
                  />
                </Form.Item>

                <Form.Item label="Đơn giá">
                  <span>{product.price.toLocaleString()}₫</span>
                </Form.Item>

                <Form.Item label="Thành tiền">
                  <span>{product.totalPrice.toLocaleString()}₫</span>
                </Form.Item>

                <Button danger onClick={() => removeProduct(product.id)}>
                  Xóa
                </Button>
              </Space>
            </div>
          );
        })}

        <Button type="dashed" onClick={addProduct} className="add-product-btn">
          Thêm sản phẩm
        </Button>

        <Form.Item label="Mã giảm giá">
          <Select
            value={selectedSale}
            onChange={(value) => setSelectedSale(value)}
            style={{ width: 200 }}
          >
            {saleOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <div className="bill-footer">
          <div className="summary">
            <p>Tổng tiền hàng: {totalBill.toLocaleString()}₫</p>
            <p>Giảm giá: {selectedSale.toLocaleString()}₫</p>
            <p>
              <strong>Thành tiền: {finalBill.toLocaleString()}₫</strong>
            </p>
          </div>

          <div className="info-card payment-info">
            <h1>PHƯƠNG THỨC THANH TOÁN</h1>
            
            <div className="payment-methods">
              <div className="payment-method">
                <input
                  type="radio"
                  id="cod"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <label htmlFor="cod">Thanh toán bằng tiền mặt</label>
              </div>
              <div className="payment-method">
                <input
                  type="radio"
                  id="banking"
                  name="payment"
                  value="banking"
                  checked={paymentMethod === "banking"}
                  onChange={() => setPaymentMethod("banking")}
                />
                <label htmlFor="banking">Chuyển khoản ngân hàng</label>
              </div>

              {paymentMethod === "banking" && (
                <div className="bank-transfer-details">
                  <div className="qr-code-box">
                    <img
                      src={`https://api.vietqr.io/image/970436-1019234868-P4ra6tV.jpg?accountName=TRAN%20KHANH%20HUNG&amount=${finalBill}&addInfo=${encodedOrderCode}`}
                      alt="Mã QR chuyển khoản"
                      style={{ width: "200px", marginTop: "10px" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Xác nhận đơn
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddBill_Client;
