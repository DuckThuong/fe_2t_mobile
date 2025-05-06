import React, { useState, useEffect } from 'react';
import CartProduct from '../cart-product';
import './style.scss';
import Navbar from '../../HeaderWeb';
import { FooterWeb } from '../../FooterWeb';
import { CUSTOMER_ROUTER_PATH } from '../../../Routers/Routers';
import { useNavigate } from "react-router-dom";
import { cartApi, colorApi, capacityApi } from '../../../api/api';

interface CartItem {
  id: string;
  name: string;
  color: string;
  capacity: string;
  price: number;
  quantity: number;
  image: string;
  selected?: boolean;
}

export const Cartergories = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  const [selectAll, setSelectAll] = useState(false);

  // Dữ liệu tĩnh để hiển thị ngay lập tức
  const staticCartItems: CartItem[] = [
    {
      id: '1',
      name: 'iPhone 16 Pro Max',
      color: 'Black',
      capacity: '128GB',
      price: 100000,
      quantity: 1,
      image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png',
      selected: false,
    },
    {
      id: '2',
      name: 'iPhone 13 128GB',
      color: 'Titanium Gray',
      capacity: '128GB',
      price: 200000,
      quantity: 1,
      image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/2/12_3_8_2_8.jpg',
      selected: false,
    },
  ];

  // Hàm fetchCart để lấy dữ liệu từ API
  const fetchCart = async (userId: string = '13') => {
    console.log('Fetching cart for userId:', userId);
    try {
      const response = await cartApi.GetCartByUserId(userId);
      console.log('API response:', response);
      if (response && response.cartDetails && Array.isArray(response.cartDetails)) {
        const mappedItems = await Promise.all(
          response.cartDetails.map(async (detail: any, index: number) => {
            let colorName = 'Không xác định';
            try {
              if (detail.productDetail.color_id) {
                const colorResponse = await colorApi.getColorById(detail.productDetail.color_id.toString());
                colorName = colorResponse.name || 'Không xác định';
              }
            } catch (error) {
              console.error(`Lỗi lấy màu sắc cho color_id ${detail.productDetail.color_id}:`, error);
            }

            let capacityName = 'Không xác định';
            try {
              if (detail.productDetail.capacity_id) {
                const capacityResponse = await capacityApi.getCapacityById(detail.productDetail.capacity_id.toString());
                capacityName = capacityResponse.display_name || 'Không xác định';
              }
            } catch (error) {
              console.error(`Lỗi lấy dung lượng cho capacity_id ${detail.productDetail.capacity_id}:`, error);
            }

            return {
              id: detail.id.toString(),
              name: detail.productDetail.product.name || 'Không có tên',
              color: colorName,
              capacity: capacityName,
              price: parseFloat(detail.price) || 0,
              quantity: detail.quantity || 1,
              image: 'https://placehold.co/120',
              selected: false,
            };
          })
        );
        setCartItems(mappedItems);
        console.log('Cart items set:', mappedItems);
      } else {
        console.warn('No cart details found or invalid response:', response);
        setCartItems(staticCartItems); // Dùng dữ liệu tĩnh nếu API rỗng
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems(staticCartItems); // Dùng dữ liệu tĩnh nếu có lỗi
    }
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const updateCartItem = async (id: string, updates: Partial<CartItem>) => {
    try {
      const numericId = parseInt(id);
      if (isNaN(numericId)) throw new Error('ID không hợp lệ');
      await cartApi.updateCartItem(numericId, updates);
      setCartItems(cartItems.map(item => item.id === id ? { ...item, ...updates } : item));
    } catch (error) {
      console.error('Lỗi cập nhật sản phẩm:', error);
    }
  };

  const removeCartItem = async (id: string) => {
    try {
      await cartApi.deleteCartItem(id);
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Lỗi xóa sản phẩm:', error);
    }
  };

  useEffect(() => {
    fetchCart('13'); // Gọi fetchCart khi component mount
  }, []);

  useEffect(() => {
    console.log('Cartergories: cartItems updated:', cartItems);
  }, [cartItems]);

  const totalAmount = cartItems.reduce((sum, item) => {
    return item.selected ? sum + item.price * item.quantity : sum;
  }, 0);

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    Promise.all(
      cartItems.map(item =>
        updateCartItem(item.id, { selected: newSelectAll })
      )
    );
  };

  const updateProduct = (id: string, updates: Partial<CartItem>) => {
    updateCartItem(id, updates);
  };

  const handleRemoveProduct = (id: string) => {
    removeCartItem(id);
    if (cartItems.length === 1) {
      setSelectAll(false);
    }
  };

  return (
    <div>
      <div>
        <Navbar cartCount={totalCartItems} />
      </div>
      <div className="cart-container">
        <h2>Giỏ hàng của bạn</h2>
        
        {cartItems.length > 0 ? (
          <>
            <div className="cart-header">
              <div className="select-all">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                />
                <span>Chọn tất cả ({cartItems.length} sản phẩm)</span>
              </div>
            </div>

            <div className="cart-items">
              {cartItems.map((item) => (
                <CartProduct
                  key={item.id}
                  product={item}
                  onUpdate={updateProduct}
                  onRemove={handleRemoveProduct}
                />
              ))}
            </div>

            <div className="cart-summary">
              <div className="total-amount">
                Tổng thanh toán ({cartItems.filter(item => item.selected).length} sản phẩm):
                <span>{totalAmount.toLocaleString()}đ</span>
              </div>
              <button className="checkout-btn" onClick={() => { navigate(CUSTOMER_ROUTER_PATH.MUA_HANG); }}>
                Mua hàng
              </button>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <p>Giỏ hàng của bạn đang trống</p>
            <button className="continue-shopping">Tiếp tục mua sắm</button>
          </div>
        )}
      </div>
      <div>
        <FooterWeb />
      </div>
    </div>
  );
};