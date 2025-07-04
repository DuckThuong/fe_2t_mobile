import React, { useRef, useState, useEffect } from "react";
import CustomTable, { CustomTableRef } from "../../../Components/CustomTable/CustomTable";
import { Button, Space, Input, Spin, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./ProductList.scss";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTER_PATH } from "../../../Routers/Routers";
import { productApi } from "../../../api/api"; // Đường dẫn tới file API của bạn

interface IProduct {
  id: number;
  name: string;
  capacity: string;
  color: string;
  quantity: number;
  price: number;
  shipmentId: string;
  image: string;
  createdAt: string;
}

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const productTableRef = useRef<CustomTableRef>(null);

  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lấy danh sách sản phẩm từ API
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productApi.getAllProducts();
      setProducts(response);
      setFilteredProducts(response);
    } catch (err) {
      setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại.");
      message.error("Lỗi khi tải danh sách sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    fetchProducts();
  }, []);

  // Tìm kiếm sản phẩm (phía client)
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    const searchTerms = searchQuery.trim().toLowerCase().split(/\s+/);
    const result = products.filter((product) =>
      searchTerms.every(
        (term) =>
          product.id.toString().toLowerCase().includes(term) ||
          product.name.toLowerCase().includes(term) ||
          product.capacity.toLowerCase().includes(term) ||
          product.color.toLowerCase().includes(term)
      )
    );
    setFilteredProducts(result);
  };

  // Xóa sản phẩm
  const handleDeleteProduct = async (id: number) => {
    try {
      await productApi.deleteProduct(id.toString());
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
      setFilteredProducts((prevFilteredProducts) =>
        prevFilteredProducts.filter((product) => product.id !== id)
      );
      message.success("Xóa sản phẩm thành công!");
    } catch (err) {
      message.error("Lỗi khi xóa sản phẩm. Vui lòng thử lại!");
    }
  };

  // Sửa sản phẩm
  const handleEditProduct = (product: IProduct) => {
    navigate(ADMIN_ROUTER_PATH.EDIT_PRODUCT(product.id), { state: { product } });
  };

  // Cột của bảng sản phẩm
  const productColumns = [
    { title: "Mã sản phẩm", dataIndex: "id", key: "id" },
    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    { title: "Dung lượng", dataIndex: "capacity", key: "capacity" },
    { title: "Màu sắc", dataIndex: "color", key: "color" },
    { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
    {
      title: "Giá gốc",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString()} VNĐ`,
    },
    {
      title: "Giá bán",
      key: "sellingPrice",
      render: (_: any, record: IProduct) =>
        `${(record.price * 2).toLocaleString()} VNĐ`,
    },
  ];

  // Hành động trên bảng sản phẩm
  const renderProductActions = (record: IProduct) => (
    <Space size="small">
      <Button type="primary" onClick={() => handleEditProduct(record)}>
        Sửa
      </Button>
      <Button
        type="primary"
        danger
        onClick={() => productTableRef.current?.showDeleteConfirm(record.id)}
      >
        Xóa
      </Button>
    </Space>
  );

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h2 className="title">Quản lý kho hàng</h2>
      </div>
      <div className="product-list-actions">
        <div className="right-actions">
          <Input
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
            style={{ width: 200 }}
          />
          <Button className="btn-search" onClick={handleSearchClick}>
            <SearchOutlined />
          </Button>
        </div>
      </div>
      {loading ? (
        <div className="loading-container">
          <Spin tip="Đang tải dữ liệu..." />
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
          <Button onClick={fetchProducts}>Thử lại</Button>
        </div>
      ) : (
        <CustomTable
          ref={productTableRef}
          data={filteredProducts}
          columns={productColumns}
          customActions={renderProductActions}
          onDelete={handleDeleteProduct}
          deleteConfirmMessage={(record) =>
            `Bạn có chắc chắn muốn xóa sản phẩm ${record.name} không?`
          }
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
};

export default ProductList;