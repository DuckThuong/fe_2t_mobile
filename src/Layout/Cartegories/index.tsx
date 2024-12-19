import { useQuery } from "@tanstack/react-query";
import Navbar from "../HeaderWeb";
import { QUERY_KEY } from "../../configs/apiConfig";
import { cartApi } from "../../api/api";
import useUser from "../../hooks/useUser";

export const Cartergories = () => {
  const { id, email, fullName } = useUser();
  const { data: cartData } = useQuery({
    queryKey: [QUERY_KEY.GET_IMAGE],
    queryFn: () => cartApi.GetCartByUserId("3"),
  });
  console.log({ cartData, id });
  return (
    <>
      <Navbar />
      <div className="catergories"></div>
    </>
  );
};
