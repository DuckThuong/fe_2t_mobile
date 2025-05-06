import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "../../../Components/ProductCard";
import { productApi } from "../../../api/api";

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
  capacity: Capacity;
  images: Image[];
}

interface Product {
  id: number;
  name: string;
  productDetails: ProductDetail[];
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
  itemPerPage?: number;
  sortOption?: string;
  priceRange?: string;
}

export const ListProduct2: React.FC<Props> = ({ itemPerPage = 4, sortOption = "default", priceRange = "all" }) => {
  const { data: apiResponse, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await productApi.getAllProducts();
      console.log("Số lượng sản phẩm từ API:", response.data.length);
      return response;
    },
  });

  if (isLoading) return <div>Đang tải...</div>;
  if (error) return <div>Không thể tải sản phẩm: {(error as Error).message}</div>;

  const products = apiResponse?.data || [];
  let filteredProducts = [...products];

  // Lọc theo khoảng giá với log kiểm tra
  if (priceRange !== "all") {
    filteredProducts = filteredProducts.filter((product) => {
      const productDetail = product.productDetails[0] || {};
      const price = parseFloat(productDetail.capacity?.price?.discount_price || "0");
      console.log(`Product ID: ${product.id}, Price: ${price}, Range: ${priceRange}`);
      switch (priceRange) {
        case "<10m":
          return price < 10000000;
        case "10m-20m":
          return price >= 10000000 && price <= 20000000;
        case ">20m":
          return price > 20000000;
        default:
          return true;
      }
    });
  }

  // Sắp xếp sản phẩm
  if (sortOption === "priceHighToLow") {
    filteredProducts.sort((a, b) => {
      const priceA = parseFloat(a.productDetails[0]?.capacity?.price?.discount_price || "0");
      const priceB = parseFloat(b.productDetails[0]?.capacity?.price?.discount_price || "0");
      return priceB - priceA;
    });
  } else if (sortOption === "nameAZ") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Hiển thị toàn bộ sản phẩm thay vì giới hạn 4
  const currentProducts = filteredProducts; // Bỏ slice để hiển thị tất cả

  if (!currentProducts.length && !isLoading) {
    return <div>Không có sản phẩm nào để hiển thị với bộ lọc hiện tại.</div>;
  }

  return (
    <div className="home-list">
      <div className="home-list_content">
        {currentProducts.map((product) => {
          const productDetail = product.productDetails[0] || {};
          const capacityDisplayName = productDetail.capacity?.display_name || "N/A";
          const price = productDetail.capacity?.price?.discount_price || "0";
          const imageUrl = productDetail.images?.find(img => img.isThumbnail)?.imageUrl || "";

          if (!product.id || !product.name || !price || !imageUrl) {
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
                price: parseFloat(price),
                image: imageUrl,
                className: "home-list_content-item",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct2;