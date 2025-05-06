import { useQuery } from "@tanstack/react-query";
import { imageApi, productApi } from "../../api/api";
import { QUERY_KEY } from "../../api/apiConfig";
import { FooterWeb } from "../FooterWeb";
import Navbar from "../HeaderWeb";
import App from "../TrangChu/Content";
import { ListProduct2 } from "./ListProduct2/ListProduct2";
import ListProducts from "../TrangChu/ListProducts";
import React from "react";

export const ListPage = () => {
  const { data: imageData } = useQuery({
    queryKey: [QUERY_KEY.GET_IMAGE],
    queryFn: imageApi.getAllImage,
  });

  const [sortOption, setSortOption] = React.useState<string>("default");
  const [priceRange, setPriceRange] = React.useState<string>("all");

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceRange(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div style={{ width: "auto", height: "30px" }}></div>
      <div className="home">
        <div className="filter-controls" style={{ marginBottom: "20px" }}>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="default">Sắp xếp mặc định</option>
            <option value="priceHighToLow">Giá từ cao đến thấp</option>
            <option value="nameAZ">Tên A-Z</option>
          </select>
          <select value={priceRange} onChange={handlePriceRangeChange}>
            <option value="all">Tất cả giá</option>
            <option value="<10m">Dưới 10 triệu</option>
            <option value="10m-20m">10 - 20 triệu</option>
            <option value="">Trên 20 triệu</option>
          </select>
        </div>
        <div className="home_content">
          <ListProduct2 sortOption={sortOption} priceRange={priceRange} />
        </div>
      </div>
      <div style={{ width: "auto", height: "30px" }}></div>
      <FooterWeb />
    </>
  );
};