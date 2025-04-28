import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AdminUpdatePhone.scss";
import { ADMIN_ROUTER_PATH } from "../../Routers/Routers";

interface ISpecs {
  id?: number; // Optional for new products
  screen_size: string;
  resolution: string;
  chipset: string;
  ram: string;
  os: string;
  battery_capacity: string;
  charging_tech: string;
}

interface IProduct {
  id: number;
  name: string;
  capacity: string; // Renamed from brand
  color: string; // Renamed from category
  quantity: number;
  price: number;
  shipmentId: string;
  image: string;
  specs?: ISpecs; // Optional for new products
}

const AdminUpdatePhone: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingProduct = location.state?.product as IProduct | undefined;

  const [formData, setFormData] = useState<IProduct>({
    id: editingProduct?.id || Date.now(),
    name: editingProduct?.name || "",
    capacity: editingProduct?.capacity || "",
    color: editingProduct?.color || "",
    quantity: editingProduct?.quantity || 0,
    price: editingProduct?.price || 0,
    shipmentId: editingProduct?.shipmentId || "",
    image: editingProduct?.image || "",
    specs: editingProduct?.specs || {
      screen_size: "",
      resolution: "",
      chipset: "",
      ram: "",
      os: "",
      battery_capacity: "",
      charging_tech: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (["screen_size", "resolution", "chipset", "ram", "os", "battery_capacity", "charging_tech"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        specs: {
          ...prev.specs!,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          name === "price" || name === "quantity"
            ? parseFloat(value) || 0
            : value,
      }));
    }
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
          <label>Dung lượng</label>
          <input
            type="text"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Màu sắc</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Số lượng</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Giá gốc</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mã lô hàng</label>
          <input
            type="text"
            name="shipmentId"
            value={formData.shipmentId}
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
        <h3>Thông số kỹ thuật</h3>
        <div className="form-group">
          <label>Kích thước màn hình</label>
          <input
            type="text"
            name="screen_size"
            value={formData.specs?.screen_size || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Độ phân giải</label>
          <input
            type="text"
            name="resolution"
            value={formData.specs?.resolution || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Chipset</label>
          <input
            type="text"
            name="chipset"
            value={formData.specs?.chipset || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>RAM</label>
          <input
            type="text"
            name="ram"
            value={formData.specs?.ram || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Hệ điều hành</label>
          <input
            type="text"
            name="os"
            value={formData.specs?.os || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Dung lượng pin</label>
          <input
            type="text"
            name="battery_capacity"
            value={formData.specs?.battery_capacity || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Công nghệ sạc</label>
          <input
            type="text"
            name="charging_tech"
            value={formData.specs?.charging_tech || ""}
            onChange={handleChange}
          />
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

export default AdminUpdatePhone;