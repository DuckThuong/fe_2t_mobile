import axios from "axios";
import { API_BASE_URL, API_KEY } from "./apiConfig";

const apiRequest = async (
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

  const { data: responseData } = await axios(config);
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
