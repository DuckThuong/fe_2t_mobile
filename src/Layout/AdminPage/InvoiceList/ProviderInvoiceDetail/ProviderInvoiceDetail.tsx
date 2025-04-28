import React, { useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import CustomTable, {
  CustomTableRef,
} from "../../../../Components/CustomTable/CustomTable";

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
  capacity: string; // Renamed from brand
  color: string; // Renamed from category
  quantity: number;
  price: number;
  shipmentId: string;
  image: string;
  createdAt: string;
}

interface ISupplierInvoice {
  id: number;
  supplierName: string;
  total: number;
  payment_method: string;
  paymentStatus: "Pending" | "Completed" | "Failed";
  invoiceStatus: "Pending" | "Paid" | "Cancelled";
  created_at: string;
}

const ProviderInvoiceDetail: React.FC = () => {
  const location = useLocation();
  const invoice = location.state?.invoice as ISupplierInvoice;

  const shipmentTableRef = useRef<CustomTableRef>(null);
  const productTableRef = useRef<CustomTableRef>(null);

  const [shipments, setShipments] = useState<IShipment[]>([
    {
      id: "LH7769",
      name: "12 pro max",
      date: "04/03/2025",
      totalValue: 30000000,
      quantity: 3,
    },
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
  ]);

  const [products, setProducts] = useState<IProduct[]>([
    {
      id: 1,
      name: "OnePlus Nord N20",
      capacity: "128GB", // Changed from brand
      color: "Blue", // Changed from category
      quantity: 1,
      price: 899,
      shipmentId: "LH7769",
      image:
        "https://muabandienthoai24h.vn/storage/images/GuMUm6Asw6_1679905172.jpg",
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
      image:
        "https://muabandienthoai24h.vn/storage/images/GuMUm6Asw6_1679905172.jpg",
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
      image:
        "https://muabandienthoai24h.vn/storage/images/GuMUm6Asw6_1679905172.jpg",
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
      image:
        "https://muabandienthoai24h.vn/storage/images/GuMUm6Asw6_1679905172.jpg",
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
      image:
        "https://muabandienthoai24h.vn/storage/images/GuMUm6Asw6_1679905172.jpg",
      createdAt: "2023-08-15",
    },
  ]);

  const [selectedShipment, setSelectedShipment] = useState<IShipment | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredShipments, setFilteredShipments] =
    useState<IShipment[]>(shipments);

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
  const filteredProducts = selectedShipment
    ? products.filter((product) => product.shipmentId === selectedShipment.id)
    : [];

  // Shipment table columns (reordered: quantity before totalValue, no actions)
  const shipmentColumns = [
    { title: "Mã lô hàng", dataIndex: "id", key: "id" },
    { title: "Tên lô hàng", dataIndex: "name", key: "name" },
    { title: "Ngày nhập", dataIndex: "date", key: "date" },
    { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
    {
      title: "Tổng tiền",
      dataIndex: "totalValue",
      key: "totalValue",
      render: (value: number) => `${value.toLocaleString()} VND`,
    },
  ];

  // Product table columns (renamed brand to Dung lượng, category to Màu sắc, no actions)
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

  if (!invoice) {
    return <div>Không tìm thấy hóa đơn</div>;
  }

  return (
    <div className="product-list-container">
      {/* Invoice Details */}
      <div className="product-list-header">
        <h1 className="title">Chi tiết hóa đơn</h1>
      </div>
      <div className="product-list-actions">
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
        pagination={{ pageSize: 5 }}
        onRow={(record: IShipment) => ({
          onClick: () => handleShipmentSelect(record),
          style: {
            cursor: "pointer",
            background: selectedShipment?.id === record.id ? "#e6f7ff" : "",
          },
        })}
      />

      {/* Product Table */}
      <div className="product-list-header">
        <h2 className="title">Sản phẩm</h2>
      </div>
      <CustomTable
        ref={productTableRef}
        data={filteredProducts}
        columns={productColumns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ProviderInvoiceDetail;
