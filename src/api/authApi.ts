import axios from "axios";
import { QUERY_KEY } from "./apiConfig";

interface LoginResponse {
  token: string;
  user: any;
}

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post<LoginResponse>(
      QUERY_KEY.GET_USER + "/login",
      {
        email,
        password,
      }
    );
    if (response.data.token) {
      localStorage.setItem("accessToken", response.data.token);
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
