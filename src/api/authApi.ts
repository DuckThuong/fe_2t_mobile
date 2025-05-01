import { apiRequest } from "./api";
import { API_KEY } from "./apiConfig";

interface LoginResponse {
  token: string;
  user: any;
}

export const login = async (PhoneNumber: string, Password: string) => {
  try {
    const response = (await apiRequest(API_KEY.USER + "/log-in", "POST", {
      PhoneNumber,
      Password,
    })) as LoginResponse;
    if (response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      return response;
    } else {
      console.log("No token in response");
    }
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
