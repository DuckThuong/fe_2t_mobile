import axios from "axios";
import { API_BASE_URL, API_KEY } from "./apiConfig";
import { CreateProductPayload, RegisterPayload } from "./constants";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiRequest = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  data?: any,
  params?: any
) => {
  const url = `${API_BASE_URL}/${endpoint}`;
  const config = {
    method,
    url,
    data: method !== "GET" ? data : undefined,
    params: method === "GET" ? params : undefined,
  };

  const { data: responseData } = await axiosInstance(config);
  return responseData;
};

export enum OrderStateEnum {
  ALL = "ALL",
  CONFIRMING = "Confirming",
  DELIVERING = "Delivering",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
  RETURNED = "Returned",
}

export const userApi = {
  doRegister: (data: RegisterPayload) =>
    apiRequest(`${API_KEY.USER}/sign-up`, "POST", data),
  doGetAllUsers: () => apiRequest(`${API_KEY.USER}/get-all-user`, "GET"),
  doDeleteUser: (id: string | number) =>
    apiRequest(`${API_KEY.USER}/delete-user-by-id/${id}`, "DELETE"),
  doGetUserById: (id: string | number) =>
    apiRequest(`${API_KEY.USER}/get-user-by-id/${id}`, "GET"),
  doSearchUsers: (query: string) =>
    apiRequest(`${API_KEY.USER}/search-user`, "GET", null, { query }),
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
  getAllProducts: () => apiRequest(API_KEY.PRODUCT),
  getProductById: (id: string) => apiRequest(`${API_KEY.PRODUCT}/${id}`),
  createProduct: (productData: CreateProductPayload) =>
    apiRequest(`${API_KEY.PRODUCT}/create-product`, "POST", productData),
  updateProduct: (id: string, productData: any) =>
    apiRequest(`${API_KEY.PRODUCT}/${id}`, "PATCH", productData),
  deleteProduct: (id: string) =>
    apiRequest(`${API_KEY.PRODUCT}/${id}`, "DELETE"),
};

export const cartApi = {
  getAllCartItems: () => apiRequest(API_KEY.CART),
  GetCartByUserId: (id: string) => apiRequest(`${API_KEY.CART}/${id}`),
  GetCardByUserAndCartId: (userId: string, cartID: string) =>
    axios.get(`/api/getCart/${userId}`, { params: { cartID } }),
  addCartItem: (itemData: any) => apiRequest(API_KEY.CART, "POST", itemData),
  updateCartItem: (id: number, itemData: any) =>
    apiRequest(`${API_KEY.CART}/update/${id}`, "PATCH", itemData),
  deleteCartItem: (id: string) =>
    apiRequest(`${API_KEY.CART}/delete/${id}`, "DELETE"),
};

export const reviewApi = {
  getAllReview: () => apiRequest(API_KEY.REVIEW),
  getReviewById: (id: string) => apiRequest(`${API_KEY.REVIEW}/${id}`),
  createReview: (reviewData: any) =>
    apiRequest(API_KEY.REVIEW, "POST", reviewData),
  updateReview: (id: string, reviewData: any) =>
    apiRequest(`${API_KEY.REVIEW}/${id}`, "PATCH", reviewData),
  deleteReview: (id: string) => apiRequest(`${API_KEY.REVIEW}/${id}`, "DELETE"),
  getAllReviewByProductId: (productId: string) =>
    apiRequest(`${API_KEY.REVIEW}/reviewByProduct/${productId}`),
};

export const paymentApi = {
  getAllPayments: () => apiRequest(API_KEY.PAYMENT),
  getPaymentById: (id: string) => apiRequest(`${API_KEY.PAYMENT}/${id}`),
  createPayment: (paymentData: any) =>
    apiRequest(API_KEY.PAYMENT, "POST", paymentData),
  updatePayment: (id: string, paymentData: any) =>
    apiRequest(`${API_KEY.PAYMENT}/${id}`, "PATCH", paymentData),
  deletePayment: (id: string) =>
    apiRequest(`${API_KEY.PAYMENT}/${id}`, "DELETE"),
};

export const orderApi = {
  getAllOrders: () => apiRequest(API_KEY.ORDER),
  getOrderById: (id: string) => apiRequest(`${API_KEY.ORDER}/orderbyId/${id}`),
  createOrder: (orderData: any) => apiRequest(API_KEY.ORDER, "POST", orderData),
  updateOrder: (id: string, orderData: any) =>
    apiRequest(`${API_KEY.ORDER}/${id}`, "PATCH", orderData),
  deleteOrder: (id: string) => apiRequest(`${API_KEY.ORDER}/${id}`, "DELETE"),
  getOrderByIdAndState: (userID: string, state: OrderStateEnum) =>
    apiRequest(`${API_KEY.ORDER}/by-state`, "GET", null, {
      userID,
      state,
    }),
};

export const orderDetailApi = {
  getAllOrderDetails: () => apiRequest(API_KEY.ORDER_DETAIL),
  getOrderDetailById: (id: string) =>
    apiRequest(`${API_KEY.ORDER_DETAIL}/${id}`),
  createOrderDetail: (orderDetailData: any) =>
    apiRequest(API_KEY.ORDER_DETAIL, "POST", orderDetailData),
  updateOrderDetail: (id: string, orderDetailData: any) =>
    apiRequest(`${API_KEY.ORDER_DETAIL}/${id}`, "PATCH", orderDetailData),
  deleteOrderDetail: (id: string) =>
    apiRequest(`${API_KEY.ORDER_DETAIL}/${id}`, "DELETE"),
};
