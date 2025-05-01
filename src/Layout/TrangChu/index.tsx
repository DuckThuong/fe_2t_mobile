import { useQuery } from "@tanstack/react-query";
import { imageApi, productApi, userApi } from "../../api/api";
import { QUERY_KEY } from "../../api/apiConfig";
import { FooterWeb } from "../FooterWeb";
import Navbar from "../HeaderWeb";
import { HomeHeader } from "./HomeHeader";
import { ListProduct } from "./ListProducts";
import App from "./Content";
import { getProfile } from "../../api/authApi";


export const Home = () => {
// authApi.get("/user/profile");
const { data: userProfile } = useQuery({
  queryKey: ["user-profile"],
  queryFn: getProfile,
});
  return (
    <>
      <Navbar />
      <div className="home">
        {/* <HomeHeader
          className="home-header"
          //imageUrls={imageData?.ImageList?.map((image) => image.ImageURL)}
          imageUrls={["https://example.com/your-image.jpg"]}
        /> */}
        <div>
          <App />
        </div>
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
              Danh sách sản phẩm mới
            </p>
          </div>
          <ListProduct itemPerPage={4} />
        </div>
         <div className="home_content">
          <div className="home-list_header">
            <p className="home-list_header-title">
              Danh sách sản phẩm phụ kiện
            </p>
          </div>
          <ListProduct itemPerPage={4} />
        </div>
      </div>
      <div style={{ width: "auto", height: "30px" }}>
      </div>
      <FooterWeb />
    </>
  );
   

};
