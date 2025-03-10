import { useQuery } from "@tanstack/react-query";
import { imageApi } from "../../api/api";
import { QUERY_KEY } from "../../api/apiConfig";
import { FooterWeb } from "../FooterWeb";
import Navbar from "../HeaderWeb";
import { HomeHeader } from "./HomeHeader";
import { ListProduct } from "./ListProducts";
import "./style.scss";

export const Home = () => {
  const { data: imageData } = useQuery({
    queryKey: [QUERY_KEY.GET_IMAGE],
    queryFn: imageApi.getAllImage,
  });

  return (
    <>
      <Navbar />
      <div className="home">
        <HomeHeader
          className="home-header"
          imageUrls={imageData?.ImageList?.map((image) => image.ImageURL)}
        />
        <div className="home_content">
          <div className="home-list_header">
            <p className="home-list_header-title">
              Danh sách sản phẩm bán chạy
            </p>
          </div>
          <ListProduct itemPerPage={4} />
        </div>
        <div className="home_content">
          <div className="home-list_header">
            <p className="home-list_header-title">
              Danh sách sản phẩm bán chạy
            </p>
          </div>
          <ListProduct itemPerPage={4} />
        </div>
      </div>
      <FooterWeb />
    </>
  );
};
