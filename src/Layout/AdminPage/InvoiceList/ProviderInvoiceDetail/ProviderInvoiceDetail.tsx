import React, { useState, useRef, useEffect } from "react";
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
  capacity: string;
  color: string;
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
  const purchaseOrder = location.state?.purchaseOrder;

  const shipmentTableRef = useRef<CustomTableRef>(null);
  const productTableRef = useRef<CustomTableRef>(null);

  const [shipments, setShipments] = useState<IShipment[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedShipment, setSelectedShipment] = useState<IShipment | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredShipments, setFilteredShipments] = useState<IShipment[]>([]);

  // Map JSON data to shipments and products
  useEffect(() => {
    if (purchaseOrder) {
      // Treat the purchase order as a single shipment
      const totalQuantity = purchaseOrder.purchaseOrderItems.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0
      );
      const totalValue = purchaseOrder.purchaseOrderItems.reduce(
        (sum: number, item: any) => sum + parseFloat(item.totalPrice),
        0
      );

      const shipment: IShipment = {
        id: purchaseOrder.lotCode || `PO-${purchaseOrder.id}`,
        name: purchaseOrder.itemType || "Purchase Order",
        date: purchaseOrder.orderDate || new Date().toISOString().split("T")[0],
        totalValue,
        quantity: totalQuantity,
      };

      const mappedProducts: IProduct[] = purchaseOrder.purchaseOrderItems.map((item: any) => ({
        id: parseInt(item.id),
        name: item.product.name || "Unknown Product",
        capacity: item.product.productDetails[0]?.capacity?.display_name || "N/A",
        color: item.product.productDetails[0]?.color?.name || "N/A",
        quantity: item.quantity,
        price: parseFloat(item.unitPrice) || 0,
        shipmentId: shipment.id,
        image: item.product.image || "https://via.placeholder.com/150",
        createdAt: item.created_at || new Date().toISOString().split("T")[0],
      }));

      setShipments([shipment]);
      setFilteredShipments([shipment]);
      setProducts(mappedProducts);
    }
  }, [purchaseOrder]);

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

  // Shipment table columns
  const shipmentColumns = [
    { title: "Mã lô hàng", dataIndex: "id", key: "id" },
    { title: "Tên lô hàng", dataIndex: "name", key: "name" },
    { title: "Ngày nhập", dataIndex: "date", key: "date" },
    { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
    {
      title: "Tổng tiền",
      dataIndex: "totalValue",
      key: "totalValue",
      render: (value: number) => `${value.toLocaleString()} VNĐ`,
    },
  ];

  // Product table columns
  const productColumns = [
    { title: " Mã sản phẩm", dataIndex: "id", key: "id" },
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
        `${(record.price * 1.1).toLocaleString()} VNĐ`, // Assume 10% markup
    },
  ];

  if (!invoice || !purchaseOrder) {
    return <div>Không tìm thấy hóa đơn hoặc dữ liệu đơn hàng</div>;
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