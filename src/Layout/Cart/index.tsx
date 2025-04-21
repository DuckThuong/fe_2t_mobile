import React, { useState } from 'react';
import CartProduct from './CartProduct';
import './style.scss';
import Navbar from '../HeaderWeb';
import { FooterWeb } from '../FooterWeb';
import { CUSTOMER_ROUTER_PATH } from '../../Routers/Routers';
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: string;
  name: string;
  color:string;
  capacity:string;
  price: number;
  
  quantity: number;
  image: string;
  selected?: boolean;
}

export const Cartergories = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'iPhone 16 Pro Max',
      color: 'màu bạc',
      capacity:'128GB',
      price: 100000,
      quantity: 1,
      image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png',
      selected: false,
    },
    {
      id: '2',
      name: 'iPhone 13 128GB',
      color: 'màu bạc',
      capacity:'128GB',
      price: 200000,
      quantity: 2,
      image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/1/11_3_12_2_1_5.jpg',
      selected: false,
    },
  ]);
  const navigate = useNavigate();
  const [selectAll, setSelectAll] = useState(false);

  const totalAmount = cartItems.reduce((sum, item) => {
    return item.selected ? sum + item.price * item.quantity : sum;
  }, 0);

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCartItems(cartItems.map(item => ({ ...item, selected: newSelectAll })));
  };

  const updateProduct = (id: string, updates: Partial<CartItem>) => {
    setCartItems(
      cartItems.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const handleRemoveProduct = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    // Nếu xóa hết sản phẩm thì tắt chọn tất cả
    if (cartItems.length === 1) {
      setSelectAll(false);
    }
  };

  return (
    <div>
      <div>
        <Navbar/>
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
            {/* <button className="checkout-btn" onClick={=>{navigate(CUSTOMER_ROUTER_PATH.MUA_HANG);}}>Mua hàng</button> */}
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
      <FooterWeb/>
    </div>
    </div>
  );
};

//export default Cart;