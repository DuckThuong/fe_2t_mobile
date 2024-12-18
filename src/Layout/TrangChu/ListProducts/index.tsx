import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "../../../Components/ProductCard";
import { productApi } from "../../../api/api";
import { QUERY_KEY } from "../../../configs/apiConfig";
import { Pagination } from "antd";
import "../style.scss";

interface Props {
  level?: string;
}

export const ListProduct: React.FC<Props> = ({ level }) => {
  const { data: productData } = useQuery({
    queryKey: [QUERY_KEY.GET_PRODUCTS],
    queryFn: productApi.getAllProducts,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = productData?.ProductList?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="home-list">
      <div className="home-list_content">
        {currentProducts?.map((product) => (
          <ProductCard
            key={product.ProductID}
            product={{
              id: product.ProductID,
              name: product.Name,
              price: parseFloat(product.Price),
              image: product.ImageURL,
              description: product.Description,
              className: "home-list_content-item",
            }}
          />
        ))}
      </div>
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={productData?.ProductList?.length}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </div>
  );
};
