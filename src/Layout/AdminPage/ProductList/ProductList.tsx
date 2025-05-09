import React, { useRef, useState, useEffect } from "react";
import { Button, Space, Input, Spin, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CustomTable, {
  CustomTableRef,
} from "../../../Components/CustomTable/CustomTable";
import { ADMIN_ROUTER_PATH } from "../../../Routers/Routers";
import { productApi } from "../../../api/api";
import axios from "axios";
import dayjs from "dayjs";
import "./ProductList.scss";

interface IProduct {
  id: number;
  name: string;
  model: string;
  description?: string;
  warranty_period?: number;
  release_year?: number;
  is_featured?: boolean;
  status?: "Active" | "Inactive";
  vendor: { id: number; name: string } | null;
  serial_number?: string;
  import_price?: string;
  selling_price?: string;
  specs: {
    screen_size?: string;
    resolution?: string;
    chipset?: string;
    ram?: string;
    os?: string;
    battery_capacity?: string;
    charging_tech?: string;
  };
  image_urls?: string[];
  created_at: string;
  productDetails: IProductDetail[];
}

interface IProductDetail {
  id: number;
  stock_quantity: number;
  serial_number: string | null;
  color: {
    id: number;
    name: string;
    color_code: string;
  } | null;
  color_id: number | null;
  selling_price: string;
  capacity: {
    id: number;
    value: number;
    unit: string;
    display_name: string;
  } | null;
}

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3300";

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const productTableRef = useRef<CustomTableRef>(null);

  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Fetch products from API
  const fetchProducts = async (page: number = 1, size: number = 5) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productApi.getAllProducts({
        page,
        size,
        order: "DESC",
      });
      console.log("Raw API Response:", response);
      const productsData = Array.isArray(response)
        ? response
        : response.data || [];
      const total = response.pagination?.total || productsData.length;
      if (!Array.isArray(productsData)) {
        throw new Error("Dữ liệu trả về không phải là mảng");
      }
      productsData.forEach((product, index) => {
        console.log(`Product ${index + 1} Details:`, product.productDetails);
      });
      setProducts(productsData);
      setFilteredProducts(productsData);
      setTotalProducts(total);
    } catch (err: any) {
      setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại.");
      message.error(
        err?.response?.data?.message || "Lỗi khi tải danh sách sản phẩm!"
      );
      console.error("Lỗi fetch sản phẩm:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle search input
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
      return;
    }

    try {
      const searchTerms = searchQuery.trim().toLowerCase().split(/\s+/);
      const result = products.filter((product) =>
        searchTerms.every((term) =>
          [
            product.id.toString(),
            product.name.toLowerCase(),
            product.model?.toLowerCase() || "",
            product.vendor?.name?.toLowerCase() || "",
            product.productDetails?.[0]?.capacity?.display_name?.toLowerCase() ||
              "",
            product.productDetails?.[0]?.color?.name?.toLowerCase() || "",
          ].some((field) => field.includes(term))
        )
      );
      setFilteredProducts(result);
      console.log("Filtered Products:", result);
    } catch (err) {
      message.error("Lỗi khi tìm kiếm sản phẩm!");
      console.error("Search Error:", err);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/product/delete-product?id=${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      setFilteredProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );
      message.success("Xóa sản phẩm thành công!");
    } catch (err: any) {
      message.error(err?.response?.data?.message || "Lỗi khi xóa sản phẩm!");
      console.error("Lỗi xóa sản phẩm:", err);
    }
  };

  // Edit product
  const handleEditProduct = async (product: IProduct) => {
    try {
      const productData = await productApi.getProductById(
        product.id.toString()
      );
      console.log("Dữ liệu chi tiết sản phẩm:", productData);
      navigate(ADMIN_ROUTER_PATH.EDIT_PRODUCT(product.id), {
        state: { productData },
      });
    } catch (err: any) {
      message.error("Lỗi khi tải thông tin sản phẩm!");
      console.error("Lỗi fetch chi tiết sản phẩm:", err);
    }
  };

  // Table columns
  const productColumns = [
    { title: "Mã sản phẩm", dataIndex: "id", key: "id" },
    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    { title: "Model", dataIndex: "model", key: "model" },
    {
      title: "Dung lượng",
      key: "capacity",
      render: (_: any, record: IProduct) =>
        record.productDetails?.[0]?.capacity?.display_name || "Không có chi tiết",
    },
    {
      title: "Màu sắc",
      key: "color",
      render: (_: any, record: IProduct) => {
        const color = record.productDetails?.[0]?.color?.name;
        console.log(`Color for product ${record.id}:`, color);
        return color || "Không có chi tiết";
      },
    },
    {
      title: "Số lượng",
      key: "quantity",
      render: (_: any, record: IProduct) =>
        record.productDetails?.[0]?.stock_quantity ?? "Không có chi tiết",
    },
    {
      title: "Giá bán",
      key: "selling_price",
      render: (_: any, record: IProduct) => {
        const price =
          record.productDetails?.[0]?.selling_price || record.selling_price;
        return price
          ? `${parseFloat(price).toLocaleString("vi-VN")} VNĐ`
          : "Không có chi tiết";
      },
    },
    {
      title: "Nhà cung cấp",
      key: "vendor",
      render: (_: any, record: IProduct) => record.vendor?.name || "Không có chi tiết",
    },
    {
      title: "Ngày tạo",
      key: "created_at",
      render: (_: any, record: IProduct) =>
        dayjs(record.created_at).format("DD/MM/YYYY HH:mm"),
    },
  ];

  // Table actions
  const renderProductActions = (record: IProduct) => (
    <Space size="small">
      <Button type="primary" onClick={() => handleEditProduct(record)}>
        Sửa
      </Button>
      <Button
        type="primary"
        className="delete-btn"
        aria-label="Xóa"
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
        <div className="left-actions">
          <Button className="btn-refresh" onClick={() => fetchProducts()}>
            Tải lại
          </Button>
        </div>
        <div className="right-actions">
          <Input
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
            style={{ width: 200 }}
          />
          <Button
            className="btn-search"
            onClick={handleSearchClick}
            aria-label="Tìm kiếm sản phẩm"
          >
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
          <Button onClick={() => fetchProducts()}>Thử lại</Button>
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
          pagination={{
            pageSize: 5,
            current: currentPage,
            total: totalProducts,
            onChange: handlePageChange,
          }}
        />
      )}
    </div>
  );
};

export default ProductList;