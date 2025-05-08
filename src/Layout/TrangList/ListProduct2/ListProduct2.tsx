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

export const ListProduct2: React.FC<Props> = ({ 
  itemPerPage = 4, 
  sortOption = "default", 
  priceRange = "all" 
}) => {
  const { data: apiResponse, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["products", { priceRange, sortOption }],
    queryFn: async () => {
      const response = await productApi.getAllProductsWithoutPagination();
      console.log("API Response:", response);
      return response;
    },
  });

  if (isLoading) return <div>Đang tải...</div>;
  if (error) return <div>Không thể tải sản phẩm: {(error as Error).message}</div>;

  const products = apiResponse?.data || [];
  
  // Lọc và sắp xếp sản phẩm
  let filteredProducts = [...products];

  // Lọc theo giá
  if (priceRange !== "all") {
    filteredProducts = filteredProducts.filter((product) => {
      const productDetail = product.productDetails[0] || {};
      const price = parseFloat(productDetail.capacity?.price?.discount_price || "0");
      
      switch (priceRange) {
        case "<10m": return price < 10000000;
        case "10m-20m": return price >= 10000000 && price <= 20000000;
        case ">20m": return price > 20000000;
        default: return true;
      }
    });
  }

  // Sắp xếp
  if (sortOption === "priceHighToLow") {
    filteredProducts.sort((a, b) => {
      const priceA = parseFloat(a.productDetails[0]?.capacity?.price?.discount_price || "0");
      const priceB = parseFloat(b.productDetails[0]?.capacity?.price?.discount_price || "0");
      return priceB - priceA;
    });
  } else if (sortOption === "nameAZ") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (!filteredProducts.length) {
    return <div className="text-center py-8">Không tìm thấy sản phẩm phù hợp</div>;
  }

  return (
    <div className="home-list">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => {
          const productDetail = product.productDetails[0] || {};
          const capacityDisplayName = productDetail.capacity?.display_name || "N/A";
          const price = productDetail.capacity?.price?.discount_price || "0";
          const imageUrl = productDetail.images?.find(img => img.isThumbnail)?.imageUrl || "";

          if (!product.id || !product.name || !price || !imageUrl) {
            console.warn("Sản phẩm thiếu dữ liệu:", product);
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
                className: "w-full",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct2;