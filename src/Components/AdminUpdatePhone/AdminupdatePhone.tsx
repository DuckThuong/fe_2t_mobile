// ProductFormPage.tsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AdminUpdatePhone.scss";
import { ADMIN_ROUTER_PATH } from "../../Routers/Routers";

interface IProduct {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  createdAt: string;
}

// Không cần IProductFormPageProps nữa
const ProductFormPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingProduct = location.state?.product as IProduct | undefined;

  const [formData, setFormData] = useState<IProduct>({
    id: editingProduct?.id || Date.now(),
    name: editingProduct?.name || "",
    brand: editingProduct?.brand || "",
    category: editingProduct?.category || "",
    price: editingProduct?.price || 0,
    image: editingProduct?.image || "",
    createdAt: editingProduct?.createdAt || new Date().toISOString().split("T")[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(ADMIN_ROUTER_PATH.PRODUCT_LIST, { state: { updatedProduct: formData } });
  };

  const handleCancel = () => {
    navigate(ADMIN_ROUTER_PATH.PRODUCT_LIST);
  };

  return (
    <div className="product-form-page">
      <h2>{editingProduct ? "Sửa sản phẩm" : "Thêm mới sản phẩm"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Hãng</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Thể loại</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Giá</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Ảnh</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {formData.image && (
            <img src={formData.image} alt="Preview" className="image-preview" />
          )}
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {editingProduct ? "Lưu thay đổi" : "Thêm sản phẩm"}
          </button>
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFormPage;