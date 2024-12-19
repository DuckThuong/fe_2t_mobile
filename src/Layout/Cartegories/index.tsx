import { useQuery } from "@tanstack/react-query";
import Navbar from "../HeaderWeb";
import { QUERY_KEY } from "../../configs/apiConfig";
import { cartApi } from "../../api/api";

export const Cartergories = () => {
  const { data: cartData } = useQuery({
    queryKey: [QUERY_KEY.GET_IMAGE],
    queryFn: () => cartApi.GetCartByUserId("3"),
  });
  console.log(cartData);
  return (
    <>
      <Navbar />
      <div className="catergories"></div>
    </>
  );
};
