import { useQuery } from "@tanstack/react-query";
import { imageApi } from "../../api/api";
import { QUERY_KEY } from "../../api/apiConfig";
import { useUser } from "../../api/useHook";
import { FooterWeb } from "../FooterWeb";
import Navbar from "../HeaderWeb";
import App from "./Content";
import { ListProduct } from "./ListProducts";
export const Home = () => {
  const { data: imageData } = useQuery({
    queryKey: [QUERY_KEY.GET_IMAGE],
    // queryKey: [QUERY_KEY.GET_PRODUCTS],
    queryFn: imageApi.getAllImage,
    //  staleTime: 60000, // Giữ cache 1 phút
    // retry: 1, // Thử lại 1 lần nếu lỗi
  });
  const user = useUser();
  console.log(user);
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
            <p className="home-list_header-title">Danh sách sản phẩm mới</p>
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
      <div style={{ width: "auto", height: "30px" }}></div>
      <FooterWeb />
    </>
  );
};
