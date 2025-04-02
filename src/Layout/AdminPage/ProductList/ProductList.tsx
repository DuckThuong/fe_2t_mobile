import React, { useState, useRef } from "react";
import CustomTable, { CustomTableRef } from "../../../Components/CustomTable/CustomTable"; // Điều chỉnh đường dẫn
import { SearchOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import "./ProductList.scss";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTER_PATH } from "../../../Routers/Routers";

interface IProduct {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  createdAt: string;
}

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const tableRef = useRef<CustomTableRef>(null); // Thêm ref cho CustomTable
  const [products, setProducts] = useState<IProduct[]>([
    {
      id: 1,
      name: "OnePlus Nord N20",
      brand: "OnePlus",
      category: "Phones",
      price: 899,
      image:
        "https://muabandienthoai24h.vn/storage/images/GuMUm6Asw6_1679905172.jpg",
      createdAt: "2023-07-13",
    },
    {
      id: 2,
      name: "Nokia G10",
      brand: "Nokia",
      category: "Phones",
      price: 689,
      image:
        "https://muabandienthoai24h.vn/storage/images/GuMUm6Asw6_1679905172.jpg",
      createdAt: "2023-07-13",
    },
    {
      id: 3,
      name: "Samsung Galaxy S21",
      brand: "Samsung",
      category: "Phones",
      price: 799,
      image:
        "https://muabandienthoai24h.vn/storage/images/GuMUm6Asw6_1679905172.jpg",
      createdAt: "2023-08-05",
    },
    {
      id: 4,
      name: "iPhone 13",
      brand: "Apple",
      category: "Phones",
      price: 999,
      image:
        "https://muabandienthoai24h.vn/storage/images/GuMUm6Asw6_1679905172.jpg",
      createdAt: "2023-09-01",
    },
    {
      id: 5,
      name: "Google Pixel 6",
      brand: "Google",
      category: "Phones",
      price: 899,
      image:
        "https://muabandienthoai24h.vn/storage/images/GuMUm6Asw6_1679905172.jpg",
      createdAt: "2023-08-15",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    const searchTerms = searchQuery.trim().toLowerCase().split(/\s+/);
    const result = products.filter((product) =>
      searchTerms.every((term) => product.name.toLowerCase().includes(term))
    );
    setFilteredProducts(result);
  };

  const handleDelete = (id: number | string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
    setFilteredProducts((prevFilteredProducts) =>
      prevFilteredProducts.filter((product) => product.id !== id)
    );
  };

  const handleEdit = (product: IProduct) => {
    navigate(ADMIN_ROUTER_PATH.EDIT_PRODUCT, { state: { product } });
  };

  const handleCreate = () => {
    navigate(ADMIN_ROUTER_PATH.ADD_PRODUCT);
  };

  const productColumns = [
    { title: "STT", key: "index", render: (_: any, __: any, index: number) => index + 1 },
    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    { title: "Hãng", dataIndex: "brand", key: "brand" },
    { title: "Thể loại", dataIndex: "category", key: "category" },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price}VNĐ`,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img src={image} alt="product" style={{ width: 50, height: "auto" }} />
      ),
    },
    { title: "Ngày tạo", dataIndex: "createdAt", key: "createdAt" },
  ];

  const renderActions = (record: IProduct) => (
    <Space size="small">
      <Button type="primary" onClick={() => handleEdit(record)}>
        Sửa
      </Button>
      <Button
        type="primary"
        danger
        onClick={() => tableRef.current?.showDeleteConfirm(record.id)}
      >
        Xóa
      </Button>
    </Space>
  );

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1 className="title">Danh sách sản phẩm</h1>
      </div>
      <div className="product-list-actions">
        <div className="left-actions">
          <button className="btn-create" onClick={handleCreate}>
            Thêm mới
          </button>
          <button className="btn-refresh">Tải lại</button>
        </div>
        <div className="right-actions">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <button className="btn-search" onClick={handleSearchClick}>
            <SearchOutlined />
          </button>
        </div>
      </div>
      <CustomTable
        ref={tableRef} // Truyền ref vào CustomTable
        data={filteredProducts}
        columns={productColumns}
        customActions={renderActions}
        onDelete={handleDelete}
        deleteConfirmMessage={(record) =>
          `Bạn có chắc chắn muốn xóa sản phẩm ${record.name} không?`
        }
      />
    </div>
  );
};

export default ProductList;