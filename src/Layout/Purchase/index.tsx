import { useState, useEffect } from "react";
import "./styles.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { cartApi, colorApi, capacityApi, productApi } from '../../api/api'; // Thêm productApi
import { message } from 'antd';
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";

interface CartItem {
  id: string;
  name: string;
  image: string;
  capacity: string;
  color: string;
  quantity: number;
  price: number;
}

interface DeleteItemInCart {
  cart_id: string;
  item_id: string;
}

const customerData = {
  email: "khanhhhungg213@gmail.com",
  memberId: "S-NULL",
};

export const Purchase = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const [isProductListCollapsed, setIsProductListCollapsed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { selectedItems = [], discount = 'none' } = location.state || {};
  const userId = localStorage.getItem('user_id') || '18';
  const idOrderCode = "hd213";
  const encodedOrderCode = encodeURIComponent(idOrderCode);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      setError(null);

      try {
        // Lấy toàn bộ danh sách colors và capacities trước
        const colorsResponse = await colorApi.getAllColors();
        const capacitiesResponse = await capacityApi.getAllCapacities();
        console.log('Colors Response:', colorsResponse);
        console.log('Capacities Response:', capacitiesResponse);

        // Tạo map để tra cứu nhanh
        const colorsMap = colorsResponse.reduce((map: { [key: string]: string }, color: any) => {
          map[color.id] = color.name || 'Không xác định';
          return map;
        }, {});
        const capacitiesMap = capacitiesResponse.reduce((map: { [key: string]: string }, capacity: any) => {
          map[capacity.id] = capacity.display_name || 'Unknown';
          return map;
        }, {});

        console.log('Fetching cart for userId:', userId);
        const response = await cartApi.GetCartByUserId(userId);
        console.log('Cart Response:', response);

        if (response && response.cartDetails) {
          const items: CartItem[] = Array.isArray(response.cartDetails)
            ? await Promise.all(
                response.cartDetails
                  .filter((detail: any) => selectedItems.includes(detail.id.toString()))
                  .map(async (detail: any) => {
                    const productDetail = detail.productDetail;
                    const product = productDetail.product;

                    // Gọi API getProductById để lấy thông tin hình ảnh
                    let productImage = 'https://via.placeholder.com/150';
                    try {
                      const productResponse = await productApi.getProductById(product.id.toString());
                      console.log(`Product Response for product_id ${product.id}:`, productResponse);
                      const thumbnailImage = productResponse.images.find((img: any) => img.isThumbnail === true);
                      productImage = thumbnailImage ? thumbnailImage.imageUrl : productResponse.images[0]?.imageUrl || productImage;
                    } catch (err) {
                      console.error(`Lỗi khi lấy thông tin sản phẩm cho product_id ${product.id}:`, err);
                    }

                    // Tính giá mới: price + selling_price
                    const price = parseFloat(detail.price || '0');
                    const sellingPrice = parseFloat(productDetail.selling_price || '0');
                    const totalPrice = price + sellingPrice;

                    return {
                      id: detail.id.toString(),
                      name: product.name || 'Sản phẩm không xác định',
                      image: productImage,
                      capacity: capacitiesMap[productDetail.capacity_id] || 'Unknown',
                      color: colorsMap[productDetail.color_id] || 'Không xác định',
                      quantity: detail.quantity,
                      price: totalPrice,
                    };
                  })
              )
            : [];
          setCartItems(items);
          const fetchedCartId = response.id ? response.id.toString() : null;
          setCartId(fetchedCartId);
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
        setError('Không thể tải dữ liệu đơn hàng. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    if (selectedItems.length > 0) {
      fetchCart();
    } else {
      setError('Không có sản phẩm nào được chọn.');
      setLoading(false);
    }
  }, [userId, selectedItems]);

  const deleteCartItems = async () => {
    if (!cartId || selectedItems.length === 0) {
      message.error('Thiếu thông tin giỏ hàng hoặc không có sản phẩm để xóa!');
      return false;
    }

    try {
      for (const itemId of selectedItems) {
        const deleteParams: DeleteItemInCart = {
          cart_id: cartId,
          item_id: itemId,
        };
        console.log('Delete Params:', deleteParams);
        const response = await cartApi.deleteCartItem(deleteParams);
        if (!response) {
          throw new Error(`Xóa sản phẩm ${itemId} thất bại`);
        }
      }
      message.success('Đã xóa các sản phẩm khỏi giỏ hàng!');
      return true;
    } catch (err: any) {
      console.error('Lỗi khi xóa sản phẩm:', err.response?.data || err.message);
      message.error('Không thể xóa sản phẩm: ' + (err.response?.data?.message || err.message || 'Lỗi không xác định'));
      return false;
    }
  };

  const handleNextStep = async () => {
    if (currentStep === 1) {
      if (!recipientName || !recipientPhone || !address) {
        message.error('Vui lòng nhập đầy đủ tên, số điện thoại và địa chỉ!');
        return;
      }
      setCurrentStep(2);
    } else {
      const deleted = await deleteCartItems();
      if (deleted) {
        alert("Đặt hàng thành công!");
        navigate(CUSTOMER_ROUTER_PATH.TRANG_CHU);
      }
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

  const totalPrice = cartItems.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
  const discountedTotal = discount === '10off' ? totalPrice * 0.9 : totalPrice;

  const formattedTotalPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(discountedTotal).replace("₫", "đ");

  return (
    <div className="order-create">
      {currentStep === 1 && (
        <div className="page-header">
          <button className="back-button" onClick={() => navigate(CUSTOMER_ROUTER_PATH.CATERGORIES)}>
            Quay lại
          </button>
          <h1>Thông tin đơn hàng</h1>
        </div>
      )}

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

              {!isProductListCollapsed && (
                <div className="product-list">
                  {cartItems.map((product) => (
                    <div key={product.id} className="product-item">
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="product-details">
                        <div className="product-name">
                          {product.name} <br /> {product.capacity} - {product.color}
                        </div>
                        <div className="product-price-quantity">
                          <span className="current-price">
                            {(product.price * product.quantity).toLocaleString()}đ
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
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Nhập tên người nhận"
                    />
                  </div>
                  <div className="form-group">
                    <label>SĐT người nhận</label>
                    <input
                      type="text"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
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
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Nhập số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                    />
                  </div>
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
                        src={`https://api.vietqr.io/image/970436-1019234868-P4ra6tV.jpg?accountName=TRAN%20KHANH%20HUNG&amount=${discountedTotal}&addInfo=${encodedOrderCode}`}
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
          disabled={
            currentStep === 1 &&
            (!recipientName || !recipientPhone || !address)
          }
        >
          {currentStep === 1 ? "Tiếp tục" : "Đặt hàng"}
        </button>
      </div>
    </div>
  );
};