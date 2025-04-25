import React, { createContext, useState, useContext, useEffect } from 'react';

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

interface CartContextType {
  cartItems: CartItem[];
  totalCartItems: number;
  updateCart: (items: CartItem[]) => void;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalCartItems: 0,
  updateCart: () => {},
});

export const CartProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const updateCart = (items: CartItem[]) => {
    setCartItems(items);
  };

  return (
    <CartContext.Provider value={{ cartItems, totalCartItems, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);