import axios from "axios";
import { QUERY_KEY } from "./apiConfig";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "../Routers/Routers";

interface LoginResponse {
  token: string;
  user: any;
}

export const login = async (PhoneNumber: string, Password: string) => {
  try {
    const response = await axios.post<LoginResponse>(
      QUERY_KEY.GET_USER + "/log-in",
      {
        PhoneNumber,
        Password,
      }
    );
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } else {
      console.log("No token in response");
    }
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
