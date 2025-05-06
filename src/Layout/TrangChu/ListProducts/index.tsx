import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "../../../Components/ProductCard";
import { productApi } from "../../../api/api";
import { Pagination } from "antd";
import "../style.scss";

interface Capacity {
  id: number;
  value: number;
  unit: string;
  display_name: string;
  price: {
    id: number;
    price: string;
    discount_price: string;
  };
}

interface Image {
  id: number;
  imageUrl: string;
  isThumbnail: boolean;
  sortOrder: number;
}

interface ProductDetail {
  id: number;
  stock_quantity: number;
  serial_number: string;
  import_price?: string | null;
  selling_price: string;
  capacity: Capacity;
}

interface Product {
  id: number;
  name: string;
  productDetails: ProductDetail[];
  images: Image[];
}

interface ApiResponse {
  data: Product[];
  pagination: {
    total: number;
    page: string;
    size: string;
    total_pages: number;
  };
}

interface Props {
  level?: string;
  itemPerPage?: number;
}

export const ListProduct: React.FC<Props> = ({ level, itemPerPage = 4 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: apiResponse, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["products", currentPage, itemPerPage],
    queryFn: async () => {
      const response = await productApi.getAllProducts({ page: currentPage, size: itemPerPage });
      console.log("API Response:", response); // Debug response
      return response;
    },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <div>Đang tải...</div>;
  if (error) return <div>Không thể tải sản phẩm: {(error as Error).message}</div>;

  const productData = apiResponse?.data || [];
  const totalItems = apiResponse?.pagination.total || 0;
  console.log("Total Items:", totalItems, "Products:", productData.length); // Debug total and current page data

  if (!productData.length && !isLoading) {
    return <div>Không có sản phẩm nào để hiển thị.</div>;
  }

  return (
    <div className="home-list">
      <div className="home-list_content">
        {productData.map((product) => {
          const productDetail = product.productDetails[0] || {};
          const capacityDisplayName = productDetail.capacity?.display_name || "N/A";
          
          // Tính tổng giá: selling_price + capacity.price.price
          const sellingPrice = productDetail.selling_price
            ? parseFloat(productDetail.selling_price.replace(/[^0-9.-]+/g, "")) || 0
            : 0;
          const capacityPrice = productDetail.capacity?.price?.price
            ? parseFloat(productDetail.capacity.price.price.replace(/[^0-9.-]+/g, "")) || 0
            : 0;
          const totalPrice = sellingPrice + capacityPrice;

          // Lấy imageUrl từ images của product
          const imageUrl = product.images?.find((img) => img.isThumbnail)?.imageUrl || "https://via.placeholder.com/150";

          // Kiểm tra dữ liệu hợp lệ
          if (!product.id || !product.name || totalPrice === 0) {
            console.warn(`Sản phẩm có dữ liệu không đầy đủ:`, product);
            return null;
          }

          return (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                capacity: capacityDisplayName,
                price: totalPrice,
                image: imageUrl,
                className: "home-list_content-item",
              }}
            />
          );
        })}
      </div>
      <Pagination
        current={currentPage}
        pageSize={itemPerPage}
        total={totalItems}
        onChange={handlePageChange}
        showSizeChanger={false}
        showTotal={(total) => `Tổng ${total} sản phẩm`}
      />
    </div>
  );
};

export default ListProduct;