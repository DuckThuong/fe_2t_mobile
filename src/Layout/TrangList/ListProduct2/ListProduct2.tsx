import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "../../../Components/ProductCard";
import { productApi } from "../../../api/api";
import "./ListProduct2.scss";

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
      console.log("API Response in ListProduct2:", response);
      return response;
    },
  });

  if (isLoading) return <div className="text-center py-8">Đang tải...</div>;
  if (error) return <div className="text-center py-8">Không thể tải sản phẩm: {(error as Error).message}</div>;

  const products = apiResponse?.data || [];
  console.log("Products after API call:", products);

  if (!products.length) {
    return <div className="text-center py-8">Không có sản phẩm nào để hiển thị</div>;
  }

  // Lọc và sắp xếp sản phẩm
  let filteredProducts = [...products];

  // Lọc theo giá
  if (priceRange !== "all") {
    filteredProducts = filteredProducts.filter((product) => {
      const productDetail = product.productDetails[0] || {};
      const sellingPrice = productDetail.selling_price
        ? parseFloat(productDetail.selling_price.replace(/[^0-9.-]+/g, "")) || 0
        : 0;
      const capacityPrice = productDetail.capacity?.price?.price
        ? parseFloat(productDetail.capacity.price.price.replace(/[^0-9.-]+/g, "")) || 0
        : 0;
      const totalPrice = sellingPrice + capacityPrice;
      console.log(`Filtering product ${product.name}: totalPrice=${totalPrice}, range=${priceRange}`);

      switch (priceRange) {
        case "<10m": return totalPrice < 10000000;
        case "10m-20m": return totalPrice >= 10000000 && totalPrice <= 20000000;
        case ">20m": return totalPrice > 20000000;
        default: return true;
      }
    });
  }

  // Sắp xếp
  if (sortOption === "priceHighToLow") {
    filteredProducts.sort((a, b) => {
      const priceA = (parseFloat(a.productDetails[0]?.selling_price?.replace(/[^0-9.-]+/g, "") || "0") || 0) +
                     (parseFloat(a.productDetails[0]?.capacity?.price?.price?.replace(/[^0-9.-]+/g, "") || "0") || 0);
      const priceB = (parseFloat(b.productDetails[0]?.selling_price?.replace(/[^0-9.-]+/g, "") || "0") || 0) +
                     (parseFloat(b.productDetails[0]?.capacity?.price?.price?.replace(/[^0-9.-]+/g, "") || "0") || 0);
      return priceB - priceA;
    });
  } else if (sortOption === "nameAZ") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  console.log("Filtered and sorted products:", filteredProducts);

  if (!filteredProducts.length) {
    return <div className="text-center py-8">Không tìm thấy sản phẩm phù hợp với bộ lọc</div>;
  }

  return (
    <div className="home-list">
      <div className="home-list_content">
        {filteredProducts.map((product) => {
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

          const imageUrl = product.images?.find(img => img.isThumbnail)?.imageUrl || "https://via.placeholder.com/150";

          if (!product.id || !product.name || totalPrice === 0 || !imageUrl) {
            console.warn("Sản phẩm thiếu dữ liệu, bỏ qua:", product);
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
    </div>
  );
};

export default ListProduct2;