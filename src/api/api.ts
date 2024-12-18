import axios from "axios";
import { API_BASE_URL, API_KEY } from "../configs/apiConfig";

const apiRequest = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  data?: any
) => {
  const url = `${API_BASE_URL}/${endpoint}`;
  const config = { method, url, data };

  const { data: responseData } = await axios(config);
  return responseData;
};

export const userApi = {
  getAllUsers: () => apiRequest(API_KEY.USER),
  getUserByIds: (id: string) => apiRequest(`${API_KEY.USER}/${id}`),
  confirmreateUser: (userData: any) =>
    apiRequest(API_KEY.USER, "POST", userData),
  updateUser: (id: string, userData: any) =>
    apiRequest(`${API_KEY.USER}/${id}`, "PATCH", userData),
  deleteUser: (id: string) => apiRequest(`${API_KEY.USER}/${id}`, "DELETE"),
};
