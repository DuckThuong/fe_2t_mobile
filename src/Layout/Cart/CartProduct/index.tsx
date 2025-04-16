import React from 'react';
import './style.scss';

interface CartProductProps {
  product: {
    id: string;
    name: string;
    color:string;
    capacity:string;
    price: number;
    quantity: number;
    image: string;
    selected?: boolean;
  };
  onUpdate: (id: string, updates: any) => void;
  onRemove: (id: string) => void;
}

const CartProduct = ({ product, onUpdate, onRemove }: CartProductProps) => {
  const toggleSelection = () => {
    onUpdate(product.id, { selected: !product.selected });
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      // Nếu số lượng = 0 thì xóa sản phẩm
      onRemove(product.id);
      return;
    }
    onUpdate(product.id, { quantity: newQuantity });
  };

  const handleRemove = () => {
    onRemove(product.id);
  };

  return (
    <div className="cart-product">
      <div className="product-select">
        <input
          type="checkbox"
          checked={product.selected || false}
          onChange={toggleSelection}
        />
      </div>
      
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      
      <div className="product-info">
        <h3>{product.name} {product.capacity}</h3>
        
        
        <h3>Màu sắc: {product.color}</h3>
        <div className="product-price">{product.price.toLocaleString()}đ</div>
      </div>
      
      <div className="product-quantity">
        <button onClick={() => handleQuantityChange(product.quantity - 1)}>
          -
        </button>
        <span>{product.quantity}</span>
        <button onClick={() => handleQuantityChange(product.quantity + 1)}>
          +
        </button>
      </div>
      
      <div className="product-total">
        {(product.price * product.quantity).toLocaleString()}đ
      </div>

      <div className="product-remove">
        <button onClick={handleRemove} className="remove-btn">
          Xóa
        </button>
      </div>
    </div>
  );
};

export default CartProduct;