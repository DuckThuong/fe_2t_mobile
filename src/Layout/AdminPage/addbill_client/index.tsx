import React, { useState, useEffect } from "react";
import { Button, Form, Input, InputNumber, Select, Space, message } from "antd";
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

interface IUser {
  id: number;
  userName: string | null;
  phoneNumber: string;
  email: string;
  isAdmin: boolean;
  userRank: string;
  isActive: boolean;
  createdAt: string;
  userInformation: any;
}

interface IDiscount {
  id: number;
  title: string;
  description: string;
  discount_type: "fixed_amount" | "percentage";
  discount_value: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const AddBill_Client: React.FC = () => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState<ISelectedProduct[]>([]);
  const [selectedSale, setSelectedSale] = useState<{
    id: number;
    value: number;
    type: "fixed_amount" | "percentage";
  }>({ id: 0, value: 0, type: "fixed_amount" });
  const [paymentMethod, setPaymentMethod] = useState("cast");
  const [finalbill, setfinalbill] = useState(0);
  const [users, setUsers] = useState<IUser[]>([]);
  const [productOptions, setProductOptions] = useState<IProductOption[]>([]);
  const [discounts, setDiscounts] = useState<IDiscount[]>([]);

  // Hàm lấy danh sách người dùng
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3300/user/get-all-user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const result = await response.json();
      setUsers(result.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Không thể tải danh sách người dùng. Vui lòng thử lại!");
    }
  };

  // Hàm lấy danh sách sản phẩm từ API
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:3300/product/get-all-product?page=1&size=10&sort_by=created_at&sort_order=DESC",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const result = await response.json();
      const apiData = result.data || [];

      // Định dạng dữ liệu từ API sang cấu trúc IProductOption
      const formattedProducts: IProductOption[] = apiData.map(
        (product: any) => ({
          name: product.name,
          colors: product.productColor.map((color: any) => ({
            color: color.name,
            capacities: product.productDetails
              .filter((detail: any) => detail.color_id === color.id)
              .map((detail: any) => ({
                capacity: detail.capacity.display_name,
                price: parseFloat(
                  detail.capacity.price.discount_price ||
                    detail.capacity.price.price
                ),
              })),
          })),
        })
      );

      setProductOptions(formattedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      message.error("Không thể tải danh sách sản phẩm. Vui lòng thử lại!");
    }
  };

  // Hàm lấy danh sách mã khuyến mại từ API
  const fetchDiscounts = async () => {
    try {
      const response = await fetch(
        "http://localhost:3300/discount/get-all-discount",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch discounts");
      }

      const result = await response.json();
      setDiscounts(result.data || []);
    } catch (error) {
      console.error("Error fetching discounts:", error);
      message.error("Không thể tải danh sách mã khuyến mại. Vui lòng thử lại!");
    }
  };

  // Hàm gọi API tạo đơn hàng
  const callCreateOrderApi = async (orderData: any) => {
    try {
      const response = await fetch("http://localhost:3300/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  // Gọi API lấy danh sách người dùng, sản phẩm và mã khuyến mại khi component mount
  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchDiscounts();
  }, []);

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
            const price =
              productOptions
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

  // Tính giá trị giảm giá dựa trên loại khuyến mại
  const calculateDiscount = (discountId: number) => {
    if (discountId === 0) {
      return { id: 0, value: 0, type: "fixed_amount" as const };
    }

    const discount = discounts.find((d) => d.id === discountId);
    if (!discount) {
      return { id: 0, value: 0, type: "fixed_amount" as const };
    }

    let discountValue = 0;
    if (discount.discount_type === "fixed_amount") {
      discountValue = parseFloat(discount.discount_value);
    } else if (discount.discount_type === "percentage") {
      discountValue = (totalBill * parseFloat(discount.discount_value)) / 100;
    }

    return {
      id: discount.id,
      value: discountValue,
      type: discount.discount_type,
    };
  };

  const finalBill = Math.max(0, totalBill - selectedSale.value);
  const idOrderCode = "hd213";
  const encodedOrderCode = encodeURIComponent(idOrderCode);

  const handleFinish = async (values: any) => {
    if (products.length === 0) {
      message.error("Vui lòng thêm ít nhất một sản phẩm!");
      return;
    }

    // Chuẩn bị dữ liệu cho API
    const orderData = {
      user_id: values.user_id,
      payment_method: paymentMethod.toUpperCase(),
      expected_delivery_date: "2025/05/08",
      status: "PENDING",
      discount_id: selectedSale.id || null,
      discount_amount: selectedSale.value,
      order_details: products.map((product) => ({
        product_detail_id: 49,
        quantity: product.quantity,
        price: finalBill,
      })),
    };

    try {
      const result = await callCreateOrderApi(orderData);
      console.log("Đơn hàng đã được tạo:", result);

      // Log thông tin hóa đơn
      console.log("Thông tin hóa đơn:", {
        ...values,
        products,
        discount: selectedSale,
        finalBill,
      });

      // Reset form và state
      form.resetFields();
      setProducts([]);
      setSelectedSale({ id: 0, value: 0, type: "fixed_amount" });
      setPaymentMethod("cast");
      message.success("Tạo đơn hàng thành công!");
    } catch (error) {
      message.error("Lỗi khi tạo đơn hàng. Vui lòng thử lại!");
      console.error("Error creating order:", error);
    }
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
            label="Khách hàng"
            name="user_id"
            rules={[{ required: true, message: "Vui lòng chọn khách hàng" }]}
          >
            <Select
              placeholder="Chọn khách hàng"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.children as unknown as string)
                  ?.toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.userName || user.email || user.phoneNumber}
                </Option>
              ))}
            </Select>
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
          const selectedProduct = productOptions.find(
            (p) => p.name === product.name
          );
          const selectedColor = selectedProduct?.colors.find(
            (c) => c.color === product.color
          );
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
                    onChange={(val) =>
                      updateProduct(product.id, "capacity", val)
                    }
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
                    onChange={(val) =>
                      updateProduct(product.id, "quantity", val || 1)
                    }
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
            value={selectedSale.id}
            onChange={(value) => setSelectedSale(calculateDiscount(value))}
            style={{ width: 200 }}
          >
            <Option key={0} value={0}>
              Không áp dụng
            </Option>
            {discounts
              .filter((d) => d.is_active && new Date(d.end_date) >= new Date())
              .map((discount) => (
                <Option key={discount.id} value={discount.id}>
                  {discount.title} (
                  {discount.discount_type === "fixed_amount"
                    ? `${parseFloat(discount.discount_value).toLocaleString()}₫`
                    : `${discount.discount_value}%`}
                  )
                </Option>
              ))}
          </Select>
        </Form.Item>

        <div className="bill-footer">
          <div className="summary">
            <p>Tổng tiền hàng: {totalBill.toLocaleString()}₫</p>
            <p>Giảm giá: {selectedSale.value.toLocaleString()}₫</p>
            <p>
              <strong>Thành tiền: {finalBill.toLocaleString()} ₫</strong>
            </p>
          </div>
          <div className="info-card payment-info">
            <h1>PHƯƠNG THỨC THANH TOÁN</h1>

            <div className="payment-methods">
              <div className="payment-method">
                <input
                  type="radio"
                  id="cast"
                  name="payment"
                  value="cast"
                  checked={paymentMethod === "cast"}
                  onChange={() => setPaymentMethod("cast")}
                />
                <label htmlFor="cast">Thanh toán bằng tiền mặt</label>
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
