import axios from "axios";
import { QUERY_KEY } from "./apiConfig";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(QUERY_KEY.GET_USER + "/login", {
      email,
      password,
    });
    console.log(response);
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      console.log("LoginSuccess");
      return response.data;
    }
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
