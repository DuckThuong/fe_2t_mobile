import { apiRequest } from "./api";
import { API_KEY } from "./apiConfig";

interface LoginResponse {
  token: string;
  user: any;
}

export const login = async (PhoneNumber: string, Password: string) => {
  try {
    if (localStorage.getItem("token") || localStorage.getItem("user")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

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

export const getUserAdminCheck = async () => {
  const response = (await apiRequest(
    API_KEY.USER + "/get-user-by-id",
    "GET"
  )) as LoginResponse;
  return response;
};

export const logout = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.id) {
      const response = await apiRequest(`${API_KEY.USER}/log-out`, "POST", {
        id: user.id,
      });
      if (response?.isLogin === false) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } else {
        throw new Error("Logout failed");
      }
    }
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
