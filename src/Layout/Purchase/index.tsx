import { useState, useEffect } from "react";
import "./styles.scss";
import { useNavigate, useLocation } from "react-router-dom";
import {
  cartApi,
  orderApi,
  capacityApi,
  colorApi,
  productApi,
  discountApi,
} from "../../api/api";
import { Button, Col, message, Radio } from "antd";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import RowWrap from "../../Components/RowWrap";
import { RightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { API_KEY } from "../../api/apiConfig";

// Định nghĩa các interface
interface SelectedItem {
  id: string;
  quantity: number;
  price: number;
}

interface CartItem {
  id: string;
  productDetailId: number;
  name: string;
  image: string;
  capacity: string;
  color: string;
  colorId: number;
  capacityId: number;
  quantity: number;
  price: number;
}

interface OrderDetail {
  product_detail_id: number;
  color_id: number;
  capacity_id: number;
  quantity: number;
  price: number;
}

interface CreateOrderPayload {
  user_id: number;
  payment_method: "CAST" | "BANKING";
  expected_delivery_date: string;
  status: string;
  userName: string;
  userPhone: string;
  userLocation: string;
  note: string;
  order_details: OrderDetail[];
}

interface DeleteItemInCart {
  cart_id: string;
  item_id: string;
}

export const Purchase = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [recipientName, setRecipientName] = useState<string>("");
  const [recipientPhone, setRecipientPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [deliveryNote, setDeliveryNote] = useState<string>("");
  const [isProductListCollapsed, setIsProductListCollapsed] =
    useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<"cast" | "banking">(
    "cast"
  );
  const [purchaseAmount, setPurchaseAmount] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDiscount, setSelectedDiscount] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [isDiscountExpanded, setIsDiscountExpanded] = useState<boolean>(false);
  const [appliedDiscount, setAppliedDiscount] = useState<string | null>(null);
  const [appliedDiscountAmount, setAppliedDiscountAmount] = useState<number>(0);

  const navigate = useNavigate();
  const location = useLocation();
  const { selectedItems = [] } =
    (location.state as { selectedItems?: SelectedItem[] }) || {};
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = userData.id || "unknown";

  const encodedOrderCode = encodeURIComponent(userId);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await cartApi.GetCartByUserId(userId);
        console.log("Cart Response in Purchase:", response);

        if (response && response.cartDetails) {
          const items: CartItem[] = await Promise.all(
            response.cartDetails.map(async (detail: any) => {
              let capacityDisplayName = "Unknown";
              let colorName = "Unknown";
              let colorId = null;
              let capacityId = null;
              let productImage = "https://via.placeholder.com/150";
              let totalPrice = 0;

              try {
                const productDetail = detail.productDetail || {};
                const product = productDetail.product || {};

                if (productDetail.capacity_id) {
                  try {
                    const capacityResponse = await capacityApi.getCapacityById(
                      productDetail.capacity_id.toString(),
                      "GB"
                    );
                    capacityDisplayName =
                      capacityResponse?.display_name || "Unknown";
                  } catch (err) {
                    console.error(
                      `Lỗi khi lấy capacity cho capacity_id ${productDetail.capacity_id}:`,
                      err
                    );
                  }
                }

                if (productDetail.color_id) {
                  try {
                    const colorResponse = await colorApi.getColorById(
                      productDetail.color_id.toString()
                    );
                    colorName = colorResponse?.name || "Unknown";
                  } catch (err) {
                    console.error(
                      `Lỗi khi lấy color cho color_id ${productDetail.color_id}:`,
                      err
                    );
                  }
                }

                if (product.id) {
                  try {
                    const productResponse = await productApi.getProductById(
                      product.id.toString()
                    );
                    console.log("Product Response:", productResponse);
                    const thumbnailImage = productResponse?.images?.find(
                      (img: any) => img.isThumbnail === true
                    );
                    productImage =
                      thumbnailImage?.imageUrl ||
                      productResponse?.images?.[0]?.imageUrl ||
                      productImage;

                    const productDetailFromApi =
                      productResponse?.productDetails?.find(
                        (pd: any) => pd.id === productDetail.id
                      );
                    let sellingPrice = 0;
                    let capacityPrice = 0;

                    if (productDetail.selling_price) {
                      sellingPrice =
                        parseFloat(
                          productDetail.selling_price.replace(
                            /[^0-9.-]+/g,
                            ""
                          ) || "0"
                        ) || 0;
                    }
                    if (
                      productDetailFromApi &&
                      productDetailFromApi.capacity?.price
                    ) {
                      capacityPrice =
                        parseFloat(
                          productDetailFromApi.capacity.price.price || "0"
                        ) || 0;
                    }
                    totalPrice = sellingPrice + capacityPrice;
                  } catch (err) {
                    console.error(
                      `Lỗi khi lấy thông tin sản phẩm cho product_id ${product.id}:`,
                      err
                    );
                    totalPrice = parseFloat(
                      productDetail.selling_price || detail.price || "0"
                    );
                  }
                } else {
                  totalPrice = parseFloat(detail.price || "0");
                }

                return {
                  id: detail.id?.toString() || "",
                  productDetailId: productDetail.id || 0,
                  name: product.name || "Sản phẩm không xác định",
                  image: productImage,
                  colorId: productDetail?.color_id,
                  capacityId: productDetail?.capacity_id,
                  capacity: capacityDisplayName,
                  color: colorName,
                  quantity: detail.quantity || 0,
                  price: totalPrice,
                };
              } catch (error) {
                console.error("Lỗi khi xử lý item trong cart:", error);
                return {
                  id: detail.id?.toString() || "",
                  productDetailId: 0,
                  name: "Sản phẩm không xác định",
                  image: "https://via.placeholder.com/150",
                  capacity: "Unknown",
                  color: "Unknown",
                  quantity: 0,
                  price: 0,
                };
              }
            })
          );

          const filteredItems = items.filter((item) =>
            selectedItems.some((selected) => selected.id === item.id)
          );

          const updatedItems = filteredItems.map((item) => {
            const selected = selectedItems.find((s) => s.id === item.id);
            return {
              ...item,
              quantity: selected?.quantity || item.quantity,
              price: selected?.price || item.price,
            };
          });

          setCartItems(updatedItems);
          const fetchedCartId = response.id ? response.id.toString() : null;
          setCartId(fetchedCartId);

          if (updatedItems.length === 0) {
            setError("Không có sản phẩm nào được chọn để mua hàng.");
          }
        } else {
          setError("Giỏ hàng trống hoặc không có dữ liệu.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu giỏ hàng:", error);
        setError("Không thể tải dữ liệu đơn hàng. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId, selectedItems]);

  const deleteCartItems = async (): Promise<boolean> => {
    if (!cartId || cartItems.length === 0) {
      message.error("Thiếu thông tin giỏ hàng hoặc không có sản phẩm để xóa!");
      return false;
    }

    try {
      for (const item of cartItems) {
        const deleteParams: DeleteItemInCart = {
          cart_id: cartId,
          item_id: item.id,
        };
        const response = await cartApi.deleteCartItem(deleteParams);
        if (!response) {
          throw new Error(`Xóa sản phẩm ${item.id} thất bại`);
        }
      }
      message.success("Đã xóa các sản phẩm khỏi giỏ hàng!");
      return true;
    } catch (err: any) {
      console.error("Lỗi khi xóa sản phẩm:", err.response?.data || err.message);
      message.error(
        "Không thể xóa sản phẩm: " +
          (err.response?.data?.message || err.message || "Lỗi không xác định")
      );
      return false;
    }
  };

  const handleCreateOrder = async () => {
    if (!cartId || cartItems.length === 0) {
      message.error("Không có sản phẩm để đặt hàng!");
      return;
    }

    const orderDetails: OrderDetail[] = cartItems.map((item) => ({
      product_detail_id: item.productDetailId,
      color_id: item?.colorId,
      capacity_id: item.capacityId,
      quantity: item.quantity,
      price: purchaseAmount / cartItems.length,
    }));

    const today = new Date();
    today.setDate(today.getDate() + 3);
    const expectedDeliveryDate = today.toISOString().split("T")[0];

    const orderData: CreateOrderPayload = {
      user_id: parseInt(userId),
      payment_method: paymentMethod === "cast" ? "CAST" : "BANKING",
      expected_delivery_date: expectedDeliveryDate,
      status: "PENDING",
      userName: recipientName,
      userPhone: recipientPhone,
      userLocation: address,
      note: deliveryNote || "",
      order_details: orderDetails,
    };

    try {
      console.log("Order Data:", orderData); // Ghi log để kiểm tra payload
      const response = await orderApi.createOrder(orderData);
      message.success("Đặt hàng thành công!");
      const deleted = await deleteCartItems();
      if (deleted) {
        navigate(CUSTOMER_ROUTER_PATH.TRANG_CHU);
      }
    } catch (err: any) {
      console.error("Lỗi khi tạo đơn hàng:", err.response?.data || err.message);
      message.error(
        "Không thể tạo đơn hàng: " +
          (err.response?.data?.message || err.message || "Lỗi không xác định")
      );
    }
  };

  const handleNextStep = async () => {
    if (currentStep === 1) {
      if (!recipientName || !recipientPhone || !address) {
        message.error("Vui lòng nhập đầy đủ tên, số điện thoại và địa chỉ!");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      await handleCreateOrder();
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleStepClick = (step: number) => {
    if (step === 1 && currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const toggleProductList = () => {
    setIsProductListCollapsed(!isProductListCollapsed);
  };

  const totalPrice = cartItems.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const formattedTotalPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  })
    .format(totalPrice)
    .replace("₫", "đ");

  const { data: discountData } = useQuery({
    queryKey: [API_KEY.DISCOUNT],
    queryFn: () => discountApi.getAllDiscounts(),
  });

  const calculateDiscount = (discount: any) => {
    if (!discount) return 0;

    if (discount.discount_type === "percentage") {
      return (totalPrice * parseFloat(discount.discount_value)) / 100;
    } else if (discount.discount_type === "fixed_amount") {
      return parseFloat(discount.discount_value);
    }
    return 0;
  };

  const handleApplyDiscount = () => {
    if (selectedDiscount) {
      const selectedDiscountData = discountData?.data.find(
        (d) => d.id.toString() === selectedDiscount
      );
      const discount = calculateDiscount(selectedDiscountData);
      setAppliedDiscount(selectedDiscount);
      setAppliedDiscountAmount(discount);
      setIsDiscountExpanded(false);
    }
  };

  useEffect(() => {
    const purchase = totalPrice - appliedDiscountAmount;
    setPurchaseAmount(purchase);
  }, [appliedDiscountAmount, totalPrice]);

  return (
    <div className="order-create">
      {currentStep === 1 && (
        <div className="page-header">
          <button
            className="back-button"
            onClick={() => navigate(CUSTOMER_ROUTER_PATH.CATERGORIES)}
          >
            Quay lại
          </button>
          <h1>Thông tin đơn hàng</h1>
        </div>
      )}

      <div className="order-steps">
        <div
          className={`step ${currentStep === 1 ? "active" : ""} ${
            currentStep === 2 ? "clickable" : ""
          }`}
          onClick={() => handleStepClick(1)}
        >
          1. THÔNG TIN
        </div>
        <div className={`step ${currentStep === 2 ? "active" : ""}`}>
          2. THANH TOÁN
        </div>
      </div>

      <div className="content-wrapper">
        {loading ? (
          <p>Đang tải đơn hàng...</p>
        ) : error ? (
          <p>{error}</p>
        ) : currentStep === 1 ? (
          <>
            <div className="info-card product-info">
              <div className="product-list-header">
                <h3>Danh sách sản phẩm ({cartItems.length})</h3>
                <button className="collapse-button" onClick={toggleProductList}>
                  {isProductListCollapsed ? "Mở rộng" : "Thu gọn"}
                </button>
              </div>

              {isProductListCollapsed && (
                <div className="product-list">
                  {cartItems.map((product) => (
                    <div key={product.id} className="product-item">
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="product-details">
                        <div className="product-name">
                          {product.name} <br /> {product.capacity} -{" "}
                          {product.color}
                        </div>
                        <div className="product-price-quantity">
                          <span className="current-price">
                            {(
                              product.price * product.quantity
                            ).toLocaleString()}
                            đ
                          </span>
                          <span className="quantity">
                            Số lượng: {product.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="info-card delivery-info">
              <h2>THÔNG TIN GIAO HÀNG</h2>
              <div className="address-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Tên người nhận</label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setRecipientName(e.target.value)
                      }
                      placeholder="Nhập tên người nhận"
                    />
                  </div>
                  <div className="form-group">
                    <label>SĐT người nhận</label>
                    <input
                      type="text"
                      value={recipientPhone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setRecipientPhone(e.target.value)
                      }
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Địa chỉ giao hàng</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setAddress(e.target.value)
                      }
                      placeholder="Nhập số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Ghi chú khác (nếu có)</label>
                  <textarea
                    rows={3}
                    value={deliveryNote}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setDeliveryNote(e.target.value)
                    }
                    placeholder="Ví dụ: Giao giờ hành chính..."
                  />
                </div>
              </div>
            </div>
            <RowWrap className="discount-section_header">
              <Col span={22}>
                {appliedDiscount ? (
                  <div className="applied-discount">
                    <div className="applied-discount-title">
                      Phiếu giảm giá đã áp dụng:
                    </div>
                    <div className="applied-discount-detail">
                      <span className="discount-info">
                        {
                          discountData?.data.find(
                            (d) => d.id.toString() === appliedDiscount
                          )?.description
                        }
                      </span>
                      <span className="discount-amount">
                        (-
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                          .format(appliedDiscountAmount)
                          .replace("₫", "đ")}
                        )
                      </span>
                    </div>
                  </div>
                ) : (
                  "Phiếu giảm giá"
                )}
              </Col>
              <Col span={2}>
                <Button
                  icon={<RightOutlined />}
                  onClick={() => setIsDiscountExpanded(!isDiscountExpanded)}
                />
              </Col>
            </RowWrap>
            {isDiscountExpanded && (
              <RowWrap className="discount-section_body">
                <Radio.Group
                  value={selectedDiscount}
                  onChange={(e) => setSelectedDiscount(e.target.value)}
                >
                  {discountData?.data.map((item, index) => (
                    <div key={index} className="discount-section_body-item">
                      <Radio value={item.id.toString()}>
                        {item.description}
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
                <Button
                  type="primary"
                  onClick={handleApplyDiscount}
                  disabled={!selectedDiscount}
                  style={{ marginTop: "10px" }}
                >
                  Áp dụng
                </Button>
              </RowWrap>
            )}
          </>
        ) : (
          <div className="info-card payment-info">
            <h1>Thanh toán</h1>
            <h2>PHƯƠNG THỨC THANH TOÁN</h2>
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
                <label htmlFor="cast">Thanh toán CAST</label>
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
                  <div className="transfer-info">
                    <div className="qr-code-box">
                      <img
                        src={`https://api.vietqr.io/image/970436-1019234868-P4ra6tV.jpg?accountName=TRAN%20KHANH%20HUNG&amount=${purchaseAmount}&addInfo=${encodedOrderCode}`}
                        alt="Mã QR chuyển khoản"
                        style={{ width: "300px", marginTop: "10px" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="fixed-footer">
        <div className="total-price">
          <div className="price-row">
            <span>Tổng tiền tạm tính:</span>
            <span className="amount">{formattedTotalPrice}</span>
          </div>
          {appliedDiscountAmount > 0 && (
            <div className="price-row">
              <span>Giảm giá:</span>
              <span className="amount discount">
                -
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })
                  .format(appliedDiscountAmount)
                  .replace("₫", "đ")}
              </span>
            </div>
          )}
          <div className="price-row total">
            <span>Thành tiền:</span>
            <span className="amount">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              })
                .format(purchaseAmount)
                .replace("₫", "đ")}
            </span>
          </div>
        </div>
        <button
          className="continue-button"
          onClick={handleNextStep}
          disabled={
            currentStep === 1 && (!recipientName || !recipientPhone || !address)
          }
        >
          {currentStep === 1 ? "Tiếp tục" : "Đặt hàng"}
        </button>
      </div>
    </div>
  );
};