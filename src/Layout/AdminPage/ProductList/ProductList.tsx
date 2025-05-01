import React, { useRef, useState } from "react";
import CustomTable, { CustomTableRef } from "../../../Components/CustomTable/CustomTable";
import { Button, Space, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./ProductList.scss";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTER_PATH } from "../../../Routers/Routers";

interface IProduct {
  id: number;
  name: string;
  capacity: string; // Renamed from brand
  color: string; // Renamed from category
  quantity: number;
  price: number;
  shipmentId: string;
  image: string;
  createdAt: string;
}

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const productTableRef = useRef<CustomTableRef>(null);

  const [products, setProducts] = useState<IProduct[]>([
    {
      id: 1,
      name: "OnePlus Nord N20",
      capacity: "128GB",
      color: "Blue",
      quantity: 1,
      price: 899,
      shipmentId: "LH7769",
      image: "https://muabandienthoai24h.vn/storage/images/GuMUm6Asw6_1679905172.jpg",
      createdAt: "2023-07-13",
    },
    {
      id: 2,
      name: "Nokia G10",
      capacity: "64GB",
      color: "Black",
      quantity: 2,
      price: 689,
      shipmentId: "LH7769",
      image: "https://muabandienthoai24h.vn/storage/images/GuMUm6Asw6_1679905172.jpg",
      createdAt: "2023-07-13",
    },
    {
      id: 3,
      name: "Samsung Galaxy S21",
      capacity: "256GB",
      color: "White",
      quantity: 5,
      price: 799,
      shipmentId: "LH66c7c",
      image: "https://muabandienthoai24h.vn/storage/images/GuMUm6Asw6_1679905172.jpg",
      createdAt: "2023-08-05",
    },
    {
      id: 4,
      name: "iPhone 13",
      capacity: "128GB",
      color: "Red",
      quantity: 3,
      price: 999,
      shipmentId: "LH67357",
      image: "https://muabandienthoai24h.vn/storage/images/GuMUm6Asw6_1679905172.jpg",
      createdAt: "2023-09-01",
    },
    {
      id: 5,
      name: "Google Pixel 6",
      capacity: "128GB",
      color: "Green",
      quantity: 4,
      price: 899,
      shipmentId: "LH67357",
      image: "https://muabandienthoai24h.vn/storage/images/GuMUm6Asw6_1679905172.jpg",
      createdAt: "2023-08-15",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products);

  // Search for products
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

  // Delete product
  const handleDeleteProduct = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
    setFilteredProducts((prevFilteredProducts) =>
      prevFilteredProducts.filter((product) => product.id !== id)
    );
  };

  // Edit product
  const handleEditProduct = (product: IProduct) => {
    navigate(ADMIN_ROUTER_PATH.EDIT_PRODUCT(product.id), { state: { product } });
  };

  // Product table columns (renamed brand to Dung lượng, category to Màu sắc)
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

  // Product table actions
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
    </div>
  );
};

export default ProductList;