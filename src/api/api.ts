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
export const imageApi = {
  getAllImage: () => apiRequest(API_KEY.IMAGE),
  getImageByID: (id: string) => apiRequest(`${API_KEY.IMAGE}/${id}`),
  confirmreateImage: (userData: any) =>
    apiRequest(API_KEY.IMAGE, "POST", userData),
  updateImages: (id: string, userData: any) =>
    apiRequest(`${API_KEY.IMAGE}/${id}`, "PATCH", userData),
  deleteImages: (id: string) => apiRequest(`${API_KEY.IMAGE}/${id}`, "DELETE"),
};

export const productApi = {
  getAllProducts: () => apiRequest(API_KEY.PRODUCTS),
  getProductById: (id: string) => apiRequest(`${API_KEY.PRODUCTS}/${id}`),
  createProduct: (productData: any) =>
    apiRequest(API_KEY.PRODUCTS, "POST", productData),
  updateProduct: (id: string, productData: any) =>
    apiRequest(`${API_KEY.PRODUCTS}/${id}`, "PATCH", productData),
  deleteProduct: (id: string) =>
    apiRequest(`${API_KEY.PRODUCTS}/${id}`, "DELETE"),
};

export const cartApi = {
  getAllCartItems: () => apiRequest(API_KEY.CART),
  GetCartByUserId: (id: string) => apiRequest(`${API_KEY.CART}/${id}`),
  GetCardByUserAndCartId: (userId: string, cartID: string) =>
    axios.get(`/api/getCart/${userId}`, { params: { cartID } }),
  addCartItem: (itemData: any) => apiRequest(API_KEY.CART, "POST", itemData),
  updateCartItem: (id: number, itemData: any) =>
    apiRequest(`${API_KEY.CART}/${id}`, "PATCH", itemData),
  deleteCartItem: (id: string) => apiRequest(`${API_KEY.CART}/${id}`, "DELETE"),
};
