import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartApi, colorApi, capacityApi } from '../../../api/api';

export interface CartItem {
  id: string;
  name: string;
  color: string;
  capacity: string;
  price: number;
  quantity: number;
  image: string;
  selected?: boolean;
}

interface CartContextType {
  cartItems: CartItem[];
  totalCartItems: number;
  updateCartItem: (id: string, updates: Partial<CartItem>) => Promise<void>;
  removeCartItem: (id: string) => Promise<void>;
  fetchCart: (userId?: string) => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalCartItems: 0,
  updateCartItem: async () => {},
  removeCartItem: async () => {},
  fetchCart: async () => {},
});

// Định nghĩa interface cho props của CartProvider
interface CartProviderProps {
  children: React.ReactNode;
  userId?: string;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children, userId }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCart = async (userId?: string) => {
    const effectiveUserId = userId || '13'; // Mặc định userId là '13' nếu không có
    console.log('Fetching cart for userId:', effectiveUserId);
    try {
      const response = await cartApi.GetCartByUserId(effectiveUserId);
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
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
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
    fetchCart(userId);
  }, [userId]);

  return (
    <CartContext.Provider value={{ cartItems, totalCartItems, updateCartItem, removeCartItem, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);