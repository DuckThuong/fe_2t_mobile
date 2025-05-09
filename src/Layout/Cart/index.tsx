import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartApi, colorApi, capacityApi, productApi } from '../../api/api';
import './style.scss';
import Navbar from '../HeaderWeb';
import { message } from 'antd';
import { CUSTOMER_ROUTER_PATH } from '../../Routers/Routers';

interface CartItem {
  id: string;
  name: string;
  image: string;
  capacity: string;
  color: string;
  quantity: number;
  price: number;
  selected: boolean;
}

export interface DeleteItemInCart {
  cart_id: string;
  item_id: string;
}

export interface UpdateItemInCart {
  cart_id: string;
  item_id: string;
  quantity: number;
  price: number;
}

export const Cartergories = () => {
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = userData.id || 'unknown';
  console.log('bạn đang lấy ra userId =', userId);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [selectAll, setSelectAll] = useState(false);

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => 
    item.selected ? sum + item.price * item.quantity : sum, 0
  );

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await cartApi.GetCartByUserId(userId);
        console.log('Biến const Response đang trả về:', response);

        if (response && response.cartDetails) {
          const items: CartItem[] = Array.isArray(response.cartDetails)
            ? await Promise.all(
                response.cartDetails.map(async (detail: any) => {
                  let capacityDisplayName = 'Unknown';
                  let colorName = 'Unknown';
                  let productImage = 'https://via.placeholder.com/150';
                  let totalPrice = 0;

                  try {
                    const productDetail = detail.productDetail || {};
                    const product = productDetail.product || {};
                    console.log('Product Detail:', productDetail);
                    console.log('Product:', product);

                    // Lấy capacity
                    try {
                      if (productDetail.capacity_id) {
                        const capacityResponse = await capacityApi.getCapacityById(productDetail.capacity_id.toString(), "GB");
                        capacityDisplayName = capacityResponse?.display_name || 'Unknown';
                      }
                    } catch (err) {
                      console.error(`Lỗi khi lấy capacity cho capacity_id ${productDetail.capacity_id}:`, err);
                    }

                    // Lấy color
                    try {
                      if (productDetail.color_id) {
                        const colorResponse = await colorApi.getColorById(productDetail.color_id.toString());
                        colorName = colorResponse?.name || 'Unknown';
                      }
                    } catch (err) {
                      console.error(`Lỗi khi lấy color cho color_id ${productDetail.color_id}:`, err);
                    }

                    // Lấy product
                    try {
                      if (product.id) {
                        const productResponse = await productApi.getProductById(product.id.toString());
                        console.log('Product Response:', productResponse);
                        const thumbnailImage = productResponse?.images?.find((img: any) => img.isThumbnail === true);
                        productImage = thumbnailImage?.imageUrl || productResponse?.images?.[0]?.imageUrl || productImage;

                        const productDetailFromApi = productResponse?.productDetails?.find(
                          (pd: any) => pd.capacity.id === productDetail.capacity_id
                        );
                        let sellingPrice = 0;
                        let capacityPrice = 0;

                        if (productDetail.selling_price) {
                          sellingPrice = parseFloat(productDetail.selling_price.replace(/[^0-9.-]+/g, "") || '0');
                        }
                        if (productDetailFromApi && productDetailFromApi.capacity?.price) {
                          capacityPrice = parseFloat(productDetailFromApi.capacity.price.price || '0');
                        }
                        totalPrice = sellingPrice + capacityPrice;
                      }
                    } catch (err) {
                      console.error(`Lỗi khi lấy thông tin sản phẩm cho product_id ${product.id}:`, err);
                      totalPrice = parseFloat(productDetail.selling_price || '0');
                    }

                    return {
                      id: detail.id?.toString() || '',
                      name: product.name || 'Sản phẩm không xác định',
                      image: productImage,
                      capacity: capacityDisplayName,
                      color: colorName,
                      quantity: detail.quantity || 0,
                      price: totalPrice,
                      selected: false,
                    };
                  } catch (error) {
                    console.error('Lỗi khi xử lý item trong cart:', error);
                    return {
                      id: detail.id?.toString() || '',
                      name: 'Sản phẩm không xác định',
                      image: 'https://via.placeholder.com/150',
                      capacity: 'Unknown',
                      color: 'Unknown',
                      quantity: 0,
                      price: 0,
                      selected: false,
                    };
                  }
                })
              )
              : [];
            setCartItems(items);
            const fetchedCartId = response.id ? response.id.toString() : null;
            console.log('Fetched cartId:', fetchedCartId);
            setCartId(fetchedCartId);
          }
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
          setError('Không thể tải giỏ hàng. Vui lòng thử lại sau.');
        } finally {
          setLoading(false);
        }
      };

      fetchCart();
    }, [userId]);

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCartItems(cartItems.map(item => ({ ...item, selected: newSelectAll })));
  };

  const handleCheckboxChange = (id: string) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const updateProduct = async (id: string, updates: Partial<CartItem>) => {
    try {
      const itemIndex = cartItems.findIndex(item => item.id === id);
      if (itemIndex === -1 || !cartId) {
        console.log('Invalid itemIndex or cartId:', { itemIndex, cartId });
        return;
      }

      const newQuantity = Math.max(1, updates.quantity || cartItems[itemIndex].quantity);
      const currentPrice = cartItems[itemIndex].price;

      const updateParams: UpdateItemInCart = {
        cart_id: cartId,
        item_id: id,
        quantity: newQuantity,
        price: currentPrice
      };
      console.log('Update Params:', updateParams);

      const response = await cartApi.updateCartItem(updateParams);

      if (response) {
        console.log('Update successful, response:', response);
        message.success('Cập nhật số lượng thành công!');
        setCartItems(cartItems.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        ));
      }
    } catch (err: any) {
      console.error('Lỗi khi cập nhật sản phẩm:', err.response?.data || err.message);
      message.error('Không thể cập nhật số lượng: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleRemoveProduct = async (id: string) => {
    try {
      if (!cartId || !id) {
        console.log('Missing cartId or itemId:', { cartId, itemId: id });
        message.error('Thiếu thông tin giỏ hàng hoặc sản phẩm!');
        return;
      }

      const deleteParams: DeleteItemInCart = {
        cart_id: cartId,
        item_id: id
      };
      console.log('Delete Params:', deleteParams);

      const response = await cartApi.deleteCartItem(deleteParams);

      if (response) {
        console.log('Delete successful, response:', response);
        message.success('Xóa sản phẩm thành công!');
        setCartItems(cartItems.filter(item => item.id !== id));
        if (cartItems.length === 1) setSelectAll(false);
      } else {
        console.log('Delete failed, no response');
        message.error('Xóa sản phẩm thất bại. Vui lòng kiểm tra lại!');
      }
    } catch (err: any) {
      console.error('Lỗi khi xóa sản phẩm:', err.response?.data || err.message);
      message.error('Không thể xóa sản phẩm: ' + (err.response?.data?.message || err.message || 'Lỗi không xác định'));
    }
  };

  const handleCheckout = () => {
    const selectedItems = cartItems.filter(item => item.selected).map(item => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price
    }));
    if (selectedItems.length === 0) {
      message.error('Vui lòng chọn ít nhất một sản phẩm để thanh toán!');
      return;
    }
    navigate(CUSTOMER_ROUTER_PATH.MUA_HANG, { state: { selectedItems } });
  };

  return (
    <div>
      <Navbar />
      <div className="cart-container">
        <h2>Giỏ hàng của bạn</h2>
        {loading ? (
          <p>Đang tải giỏ hàng...</p>
        ) : error ? (
          <p>{error}</p>
        ) : cartItems.length > 0 ? (
          <>
            <div className="cart-header">
              <div className="select-all">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                />
                <span>Chọn tất cả ({totalCartItems} sản phẩm)</span>
              </div>
            </div>

            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-product">
                  <div className="product-select">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </div>
                  <div className="product-info">
                    <img src={item.image} alt={item.name} className="product-image" />
                    <div>
                      <h3>{item.name}</h3>
                      <p>Dung lượng: {item.capacity}</p>
                      <p>Màu sắc: {item.color}</p>
                    </div>
                  </div>
                  <div className="product-quantity">
                    <button onClick={() => updateProduct(item.id, { quantity: item.quantity - 1 })}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateProduct(item.id, { quantity: item.quantity + 1 })}>+</button>
                  </div>
                  <div className="product-total">
                    {(item.price * item.quantity).toLocaleString()}đ
                  </div>
                  <div className="product-remove">
                    <button onClick={() => handleRemoveProduct(item.id)} className="remove-btn">Xóa</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary fixed-summary">
              <div className="total-amount">
                Tổng thanh toán ({cartItems.filter(item => item.selected).length} sản phẩm):
                <span>{totalAmount.toLocaleString()}đ</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Mua hàng
              </button>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <p>Giỏ hàng của bạn đang trống</p>
            <button onClick={() => navigate(CUSTOMER_ROUTER_PATH.TRANG_CHU)} className="continue-shopping">Tiếp tục mua sắm</button>
          </div>
        )}
      </div>
    </div>
  );
};