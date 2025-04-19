import React, { useState, useRef } from "react";
import CustomTable, { CustomTableRef } from "../../../Components/CustomTable/CustomTable"; 
import { SearchOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import "./ProductList.scss";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTER_PATH } from "../../../Routers/Routers";

interface IShipment {
  id: string;
  name: string;
  date: string;
  totalValue: number;
  quantity: number;
}

interface IProduct {
  id: number;
  name: string;
  brand: string;
  category: string;
  quantity: number;
  price: number; 
  shipmentId: string; 
  image: string;
  createdAt: string;
}

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const shipmentTableRef = useRef<CustomTableRef>(null);
  const productTableRef = useRef<CustomTableRef>(null);

  const [shipments, setShipments] = useState<IShipment[]>([
    {
      id: "LH7769",
      name: "pro max test",
      date: "04/03/2025",
      totalValue: 30000000,
      quantity: 3,
    },
    { id: "LH66bda", name: "", date: "11/04/2025", totalValue: 0, quantity: 0 },
    {
      id: "LH66c7c",
      name: "13 pro max",
      date: "04/04/2025",
      totalValue: 13000,
      quantity: 10,
    },
    {
      id: "LH67357",
      name: "14 PRO MAX",
      date: "04/04/2025",
      totalValue: 60000,
      quantity: 20,
    },
    { id: "LH6938f", name: "", date: "11/04/2025", totalValue: 0, quantity: 0 },
  ]);

  const [products, setProducts] = useState<IProduct[]>([
    {
      id: 1,
      name: "OnePlus Nord N20",
      brand: "OnePlus",
      category: "Phones",
      quantity: 1,
      price: 899,
      shipmentId: "LH7769",
      image: "https://muabandienthoai24h.vn/storage/images/GuMUm6Asw6_1679905172.jpg",
      createdAt: "2023-07-13",
    },
    {
      id: 2,
      name: "Nokia G10",
      brand: "Nokia",
      category: "Phones",
      quantity: 2,
      price: 689,
      shipmentId: "LH7769",
      image: "https://muabandienthoai24h.vn/storage/images/GuMUm6Asw6_1679905172.jpg",
      createdAt: "2023-07-13",
    },
    {
      id: 3,
      name: "Samsung Galaxy S21",
      brand: "Samsung",
      category: "Phones",
      quantity: 5,
      price: 799,
      shipmentId: "LH66c7c",
      image: "https://muabandienthoai24h.vn/storage/images/GuMUm6Asw6_1679905172.jpg",
      createdAt: "2023-08-05",
    },
    {
      id: 4,
      name: "iPhone 13",
      brand: "Apple",
      category: "Phones",
      quantity: 3,
      price: 999,
      shipmentId: "LH67357",
      image: "https://muabandienthoai24h.vn/storage/images/GuMUm6Asw6_1679905172.jpg",
      createdAt: "2023-09-01",
    },
    {
      id: 5,
      name: "Google Pixel 6",
      brand: "Google",
      category: "Phones",
      quantity: 4,
      price: 899,
      shipmentId: "LH67357",
      image: "https://muabandienthoai24h.vn/storage/images/GuMUm6Asw6_1679905172.jpg",
      createdAt: "2023-08-15",
    },
  ]);

  const [selectedShipment, setSelectedShipment] = useState<IShipment | null>(shipments[0]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredShipments, setFilteredShipments] = useState<IShipment[]>(shipments);

  // Search for shipments
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    const searchTerms = searchQuery.trim().toLowerCase().split(/\s+/);
    const result = shipments.filter((shipment) =>
      searchTerms.every(
        (term) =>
          shipment.id.toLowerCase().includes(term) ||
          shipment.name.toLowerCase().includes(term)
      )
    );
    setFilteredShipments(result);
  };

  // Handle shipment selection
  const handleShipmentSelect = (shipment: IShipment) => {
    setSelectedShipment(shipment);
  };

  // Filter products based on selected shipment
  const filteredProducts = products.filter(
    (product) => product.shipmentId === selectedShipment?.id
  );

  // Delete shipment
  const handleDeleteShipment = (id: string) => {
    setShipments((prevShipments) =>
      prevShipments.filter((shipment) => shipment.id !== id)
    );
    setFilteredShipments((prevFilteredShipments) =>
      prevFilteredShipments.filter((shipment) => shipment.id !== id)
    );
    if (selectedShipment?.id === id) {
      setSelectedShipment(null);
    }
  };

  // Delete product
  const handleDeleteProduct = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  // Edit shipment
  const handleEditShipment = (shipment: IShipment) => {
    // navigate(ADMIN_ROUTER_PATH.EDIT_SHIPMENT, { state: { shipment } });
  };

  // Edit product
  const handleEditProduct = (product: IProduct) => {
    navigate(ADMIN_ROUTER_PATH.EDIT_PRODUCT, { state: { product } });
  };

  // Create shipment
  const handleCreateShipment = () => {
    // navigate(ADMIN_ROUTER_PATH.ADD_SHIPMENT);
  };

  // Shipment table columns
  const shipmentColumns = [
    { title: "Mã lô hàng", dataIndex: "id", key: "id" },
    { title: "Tên lô hàng", dataIndex: "name", key: "name" },
    { title: "Ngày nhập", dataIndex: "date", key: "date" },
    {
      title: "Tổng tiền",
      dataIndex: "totalValue",
      key: "totalValue",
      render: (value: number) => `${value.toLocaleString()} VND`,
    },
    { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
  ];

  // Product table columns
  const productColumns = [
    { title: "Mã sản phẩm", dataIndex: "id", key: "id" },
    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    { title: "Hãng", dataIndex: "brand", key: "brand" },
    { title: "Thể loại", dataIndex: "category", key: "category" },
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
        `${(record.price * 2).toLocaleString()} VNĐ`, // Giá bán = Giá gốc * 2
    },
  ];

  // Shipment table actions
  const renderShipmentActions = (record: IShipment) => (
    <Space size="small">
      <Button type="primary" onClick={() => handleEditShipment(record)}>
        Sửa
      </Button>
      <Button
        type="primary"
        danger
        onClick={() => shipmentTableRef.current?.showDeleteConfirm(record.id)}
      >
        Xóa
      </Button>
    </Space>
  );

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
      {/* Shipment Table */}
      <div className="product-list-header">
        <h1 className="title">Quản lý kho hàng</h1>
      </div>
      <div className="product-list-actions">
        <div className="left-actions">
          <button className="btn-create" onClick={handleCreateShipment}>
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
        ref={shipmentTableRef}
        data={filteredShipments}
        columns={shipmentColumns}
        customActions={renderShipmentActions}
        // onDelete={handleDeleteShipment}
        deleteConfirmMessage={(record) =>
          `Bạn có chắc chắn muốn xóa lô hàng ${record.id} không?`
        }
        pagination={{ pageSize: 5 }}
        // onRow={(record: IShipment) => ({
        //   onClick: () => handleShipmentSelect(record),
        //   style: {
        //     cursor: "pointer",
        //     background: selectedShipment?.id === record.id ? "#e6f7ff" : "",
        //   },
        // })}
      />

      {/* Product Table */}
      {selectedShipment && (
        <>
          <div className="product-list-header">
            <h1 className="title">Sản phẩm</h1>
          </div>
          <CustomTable
            ref={productTableRef}
            data={filteredProducts}
            columns={productColumns}
            customActions={renderProductActions}
            // onDelete={handleDeleteProduct}
            deleteConfirmMessage={(record) =>
              `Bạn có chắc chắn muốn xóa sản phẩm ${record.name} không?`
            }
            pagination={{ pageSize: 5 }}
          />
        </>
      )}
    </div>
  );
};

export default ProductList;