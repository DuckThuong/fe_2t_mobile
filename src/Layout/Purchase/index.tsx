import { useState } from "react";
import "./styles.scss";
import { Cartergories } from "../Cart";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { useNavigate } from "react-router-dom";

// Dữ liệu sản phẩm
const phoneProducts = [
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    color: "Black",
    capacity: "128GB",
    currentPrice: "100000đ",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max-2.png",
    quantity: 1,
  },
  {
    id: 2,
    name: "iPhone 13",
    color: "Titanium Gray",
    capacity: "128GB",
    currentPrice: "200000đ",
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/2/12_3_8_2_8.jpg",
    quantity: 1,
  },
];
const idOrderCode = "hd213";
const encodedOrderCode = encodeURIComponent(idOrderCode);
// Dữ liệu khách hàng
const customerData = {
  name: "Trần Khánh Hùng",
  phone: "0948682103",
  email: "khanhhhungg213@gmail.com",
  memberId: "S-NULL",
};

export const Purchase = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [address, setAddress] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const [isProductListCollapsed, setIsProductListCollapsed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const navigate = useNavigate();

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      alert("Đặt hàng thành công!");
      navigate(CUSTOMER_ROUTER_PATH.TRANG_CHU);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleStepClick = (step) => {
    if (step === 1 && currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const toggleProductList = () => {
    setIsProductListCollapsed(!isProductListCollapsed);
  };

  // Tính tổng tiền
  const totalPrice = phoneProducts.reduce((total, product) => {
    const price = parseInt(product.currentPrice.replace(/\./g, "").replace("đ", ""));
    return total + price * product.quantity;
  }, 0);

  const formattedTotalPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(totalPrice).replace("₫", "đ");

  return (
    <div className="order-create">
      {/* Header với nút back (chỉ hiện ở trang thông tin) */}
      {currentStep === 1 && (
        <div className="page-header">
          <button className="back-button" onClick={() => navigate(CUSTOMER_ROUTER_PATH.CATERGORIES)}>
            &lt; Quay lại
          </button>
          <h1>Thông tin đơn hàng</h1>
        </div>
      )}

      {/* Steps indicator - có thể click để quay lại */}
      <div className="order-steps">
        <div
          className={`step ${currentStep === 1 ? "active" : ""} ${currentStep === 2 ? "clickable" : ""}`}
          onClick={() => handleStepClick(1)}
        >
          1. THÔNG TIN
        </div>
        <div className={`step ${currentStep === 2 ? "active" : ""}`}>
          2. THANH TOÁN
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="content-wrapper">
        {currentStep === 1 ? (
          <>
            {/* Card thông tin sản phẩm với chức năng thu gọn */}
            <div className="info-card product-info">
              <div className="product-list-header">
                <h3>Danh sách sản phẩm ({phoneProducts.length})</h3>
                <button className="collapse-button" onClick={toggleProductList}>
                  {isProductListCollapsed ? "Mở rộng" : "Thu gọn"}
                </button>
              </div>

              {!isProductListCollapsed && (
                <div className="product-list">
                  {phoneProducts.map((product) => (
                    <div key={product.id} className="product-item">
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="product-details">
                        <div className="product-name">
                          {product.name} <br/>{product.color} {product.capacity}
                        </div>
                        <div className="product-price-quantity">
                          <span className="current-price">
                            {product.currentPrice}
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

            {/* Card thông tin giao hàng */}
            <div className="info-card delivery-info">
              <h2>THÔNG TIN GIAO HÀNG</h2>

              <div className="address-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Tên người nhận</label>
                    <div className="value-display">{customerData.name}</div>
                  </div>
                  <div className="form-group">
                    <label>SĐT người nhận</label>
                    <div className="value-display">{customerData.phone}</div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Địa chỉ nhận hàng</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Nhập địa chỉ đầy đủ (số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố)"
                  />
                </div>

                <div className="form-group">
                  <label>Ghi chú khác (nếu có)</label>
                  <textarea
                    rows={3}
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                    placeholder="Ví dụ: Giao giờ hành chính..."
                  ></textarea>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Trang thanh toán */
          <div className="info-card payment-info">
            <h1>Thanh toán</h1>
            <h2>PHƯƠNG THỨC THANH TOÁN</h2>
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
                <label htmlFor="cod">Thanh toán khi nhận hàng (COD)</label>
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
                        src={`https://api.vietqr.io/image/970436-1019234868-P4ra6tV.jpg?accountName=TRAN%20KHANH%20HUNG&amount=${totalPrice}&addInfo=${encodedOrderCode}`}  
                        alt="Mã QR chuyển khoản"
                        style={{ width: "200px", marginTop: "10px" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Phần cố định ở dưới */}
      <div className="fixed-footer">
        <div className="total-price">
          <div className="price-row">
            <span>Tổng tiền tạm tính:</span>
            <span className="amount">{formattedTotalPrice}</span>
          </div>
        </div>

        <button
          className="continue-button"
          onClick={handleNextStep}
          disabled={currentStep === 1 && !address}
        >
          {currentStep === 1 ? "Tiếp tục" : "Đặt hàng"}
        </button>
      </div>
    </div>
  );
};