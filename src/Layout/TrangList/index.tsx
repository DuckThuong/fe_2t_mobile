import { useQuery } from "@tanstack/react-query";
import { imageApi, productApi } from "../../api/api";
import { QUERY_KEY } from "../../api/apiConfig";
import { FooterWeb } from "../FooterWeb";
import Navbar from "../HeaderWeb";



import App from "../TrangChu/Content";
// import { ListProduct2 } from "./ListProduct2/ListProduct2";
import { ListProduct2 } from "./ListProduct2/ListProduct2";





export const ListPage = () => {
  const { data: imageData } = useQuery({
     queryKey: [QUERY_KEY.GET_IMAGE],
    // queryKey: [QUERY_KEY.GET_PRODUCTS],
    queryFn: imageApi.getAllImage,
    //  staleTime: 60000, // Giữ cache 1 phút
    // retry: 1, // Thử lại 1 lần nếu lỗi
  });

  return (
    <>
      <Navbar />
      <div style={{ width: "auto", height: "30px" }}>
      </div>
      <div className="home">
     
     
        <div className="home_content">
          
          <ListProduct2  />
        </div>
        
   
      </div>
      <div style={{ width: "auto", height: "30px" }}>
      </div>
      <FooterWeb />
    </>
  );
   

};
