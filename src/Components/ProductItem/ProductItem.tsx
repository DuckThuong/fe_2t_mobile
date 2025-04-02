import "./ProductItem.scss";

interface ProductProps {
  product: {
    id: number;
    name: string;
    brand: string;
    category: string;
    price: number;
    image: string;
    createdAt: string;
  };
  onEdit: () => void;
  onDelete: (id: number) => void;
}

const ProductItem: React.FC<ProductProps> = ({ product, onDelete, onEdit }) => {
  return (
    <tr className="product-item">
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.brand}</td>
      <td>{product.category}</td>
      <td>{product.price}</td>
      <td>
        <img src={product.image} alt={product.name} className="product-image" />
      </td>
      <td>{product.createdAt}</td>
      <td className="product-action">
        <button onClick={() => onEdit()} className="btn-edit">
          Sửa
        </button>
        <button onClick={() => onDelete(product.id)} className="btn-delete">
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default ProductItem;
