import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "../../../Components/ProductCard";
import { productApi } from "../../../api/api";
import { Pagination } from "antd";

import { QUERY_KEY } from "../../../api/apiConfig";
import { mockProducts } from "../../TrangChu/ListProducts";


interface Props {
  //level?: string;
  itemPerPage?: number;
}

// const mockProducts = [
//   {
//     ProductID: 1,
//     ProductName: "iPhone 16 Pro Max",
//     Price: "30590000",
//     images: [{ ImageURL: "https://https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png.placeholder.com/150" }],
//     Description: "Điện thoại cao cấp với chip A17 Bionic.",
//     productColors: [
//       { ProductID: 1, ColorID: 101, color: { ColorID: 101, ColorName: "Blue" } },
//       { ProductID: 1, ColorID: 102, color: { ColorID: 102, ColorName: "Black" } },
//       { ProductID: 1, ColorID: 103, color: { ColorID: 103, ColorName: "Silver" } },
//     ],
//   },
//   {
//     ProductID: 2,
//     ProductName: "iPhone 15",
//     Price: "15690000",
//     images: [{ ImageURL: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png" }],
//     Description: "Smartphone mạnh mẽ với camera 200MP.",
//     productColors: [
//       { ProductID: 2, ColorID: 201, color: { ColorID: 201, ColorName: "White" } },
//       { ProductID: 2, ColorID: 202, color: { ColorID: 202, ColorName: "Green" } },
//       { ProductID: 2, ColorID: 203, color: { ColorID: 203, ColorName: "Phantom Black" } },
//     ],
//   },
//   {
//     ProductID: 3,
//     ProductName: "iPhone 15 Pro",
//     Price: "28590000",
//     images: [{ ImageURL: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png" }],
//     Description: "Hiệu năng mạnh mẽ với Snapdragon 8 Gen 2.",
//     productColors: [
//       { ProductID: 3, ColorID: 301, color: { ColorID: 301, ColorName: "Black" } },
//       { ProductID: 3, ColorID: 302, color: { ColorID: 302, ColorName: "Ceramic White" } },
//     ],
//   },
//   {
//     ProductID: 4,
//     ProductName: "iPhone 16 Pro",
//     Price: "25090000",
//     images: [{ ImageURL: "https://https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro_1.png.placeholder.com/150" }],
//     Description: "Camera AI thông minh với chip Tensor G3.",
//     productColors: [
//       { ProductID: 4, ColorID: 401, color: { ColorID: 401, ColorName: "Obsidian" } },
//       { ProductID: 4, ColorID: 402, color: { ColorID: 402, ColorName: "Rose" } },
//       { ProductID: 4, ColorID: 403, color: { ColorID: 403, ColorName: "Hazel" } },
//     ],
//   },
//   {
//     ProductID: 5,
//     ProductName: "iPhone 16e",
//     Price: "16190000",
//     images: [{ ImageURL: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16e-128gb.png" }],
//     Description: "Màn hình đẹp, camera xuất sắc với Hasselblad.",
//     productColors: [
//       { ProductID: 5, ColorID: 501, color: { ColorID: 501, ColorName: "Gold" } },
//       { ProductID: 5, ColorID: 502, color: { ColorID: 502, ColorName: "Black" } },
//       { ProductID: 5, ColorID: 503, color: { ColorID: 503, ColorName: "Orange" } },
//     ],
//   },
//   {
//     ProductID: 6,
//     ProductName: "iPhone 14",
//     Price: "12790000",
//     images: [{ ImageURL: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14_1.png" }],
//     Description: "Flagship killer với Snapdragon 8 Gen 2.",
//     productColors: [
//       { ProductID: 6, ColorID: 601, color: { ColorID: 601, ColorName: "Titan Black" } },
//       { ProductID: 6, ColorID: 602, color: { ColorID: 602, ColorName: "Eternal Green" } },
//     ],
//   },
//   {
//     ProductID: 7,
//     ProductName: "iPhone 16",
//     Price: "18990000",
//     images: [{ ImageURL: "https://via.plahttps://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-1.pngceholder.com/150" }],
//     Description: "Thiết kế độc đáo với mặt lưng LED.",
//     productColors: [
//       { ProductID: 7, ColorID: 701, color: { ColorID: 701, ColorName: "White" } },
//       { ProductID: 7, ColorID: 702, color: { ColorID: 702, ColorName: "Black" } },
//     ],
//   },
//   {
//     ProductID: 8,
//     ProductName: "iPhone 15 Plus",
//     Price: "19190000",
//     images: [{ ImageURL: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1_.png" }],
//     Description: "Gaming phone với màn hình 165Hz.",
//     productColors: [
//       { ProductID: 8, ColorID: 801, color: { ColorID: 801, ColorName: "Storm White" } },
//       { ProductID: 8, ColorID: 802, color: { ColorID: 802, ColorName: "Phantom Black" } },
//     ],
//   },
//   {
//     ProductID: 9,
//     ProductName: "iPhone 14 pro MAX",
//     Price: "25590000",
//     images: [{ ImageURL: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro_2__5.png" }],
//     Description: "Gaming phone với màn hình 165Hz.",
//     productColors: [
//       { ProductID: 8, ColorID: 801, color: { ColorID: 801, ColorName: "Storm White" } },
//       { ProductID: 8, ColorID: 802, color: { ColorID: 802, ColorName: "Phantom Black" } },
//     ],
//   },
//   {
//     ProductID: 10,
//     ProductName: "iPhone 11",
//     Price: "9490000",
//     images: [{ ImageURL: "hhttps://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-11-128gb.png" }],
//     Description: "Gaming phone với màn hình 165Hz.",
//     productColors: [
//       { ProductID: 8, ColorID: 801, color: { ColorID: 801, ColorName: "Storm White" } },
//       { ProductID: 8, ColorID: 802, color: { ColorID: 802, ColorName: "Phantom Black" } },
//     ],
//   },
//   {
//     ProductID: 11,
//     ProductName: "Nothing Phone (2)",
//     Price: "15990000",
//     images: [{ ImageURL: "https://via.placeholder.com/150" }],
//     Description: "Thiết kế độc đáo với mặt lưng LED.",
//     productColors: [
//       { ProductID: 7, ColorID: 701, color: { ColorID: 701, ColorName: "White" } },
//       { ProductID: 7, ColorID: 702, color: { ColorID: 702, ColorName: "Black" } },
//     ],
//   },
//   {
//     ProductID: 12,
//     ProductName: "iPhone 12 Pro Max",
//     Price: "23990000",
//     images: [{ ImageURL: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/_/1_251_1.jpg" }],
//     Description: "Gaming phone với màn hình 165Hz.",
//     productColors: [
//       { ProductID: 8, ColorID: 801, color: { ColorID: 801, ColorName: "Storm White" } },
//       { ProductID: 8, ColorID: 802, color: { ColorID: 802, ColorName: "Phantom Black" } },
//     ],
//   },
//   {
//     ProductID: 13,
//     ProductName: "iPhone 16e",
//     Price: "23990000",
//     images: [{ ImageURL: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png" }],
//     Description: "Gaming phone với màn hình 165Hz.",
//     productColors: [
//       { ProductID: 8, ColorID: 801, color: { ColorID: 801, ColorName: "Storm White" } },
//       { ProductID: 8, ColorID: 802, color: { ColorID: 802, ColorName: "Phantom Black" } },
//     ],
//   },
//   {
//     ProductID: 14,
//     ProductName: "Asus ROG Phone 7",
//     Price: "23990000",
//     images: [{ ImageURL: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png" }],
//     Description: "Gaming phone với màn hình 165Hz.",
//     productColors: [
//       { ProductID: 8, ColorID: 801, color: { ColorID: 801, ColorName: "Storm White" } },
//       { ProductID: 8, ColorID: 802, color: { ColorID: 802, ColorName: "Phantom Black" } },
//     ],
//   },

// ];


export const ListProduct2: React.FC<Props> = ({  itemPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Sử dụng giá trị mặc định cho itemPerPage nếu không truyền vào
  const itemPerPageValue = itemPerPage ?? mockProducts.length; // Hiển thị tất cả sản phẩm nếu không có itemPerPage

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Chỉ cần sử dụng tất cả sản phẩm, không phân trang nữa
  const currentProducts = mockProducts; // Hiển thị tất cả sản phẩm

  return (
    <div className="home-list">
      <div className="home-list_content">
        {currentProducts?.map((product) => (
          <ProductCard
            key={product.ProductID}
            product={{
              id: product.ProductID,
              name: product.ProductName,
              price: parseFloat(product.Price),
              image:
                product.images.length > 0
                  ? product.images[0].ImageURL
                  : "default-image-url",
              // description: product.Description,
              // colors: product?.productColors,
              className: "home-list_content-item",
            }}
          />
        ))}
      </div>

      {/* Nếu không muốn phân trang nữa, bạn có thể xóa Pagination hoặc để nó vẫn giữ để phân trang nếu cần */}
      {/* <Pagination
        current={currentPage}
        pageSize={itemPerPageValue}
        total={mockProducts.length}
        onChange={handlePageChange}
        showSizeChanger={false}
      /> */}
    </div>
  );
};
