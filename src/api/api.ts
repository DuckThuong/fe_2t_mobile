import axios from "axios";
import { DeleteItemInCart, UpdateItemInCart } from "../Layout/Cart";
import { API_BASE_URL, API_KEY } from "./apiConfig";
import {
  CreateDiscountsPayload,
  CreateProductPayload,
  CreatePurchasePayload,
  CreateVendorBillPayload,
  CreateVendorsPayload,
  ProductDetailFilterParams,
  RegisterPayload,
  UpdateProductPayload,
} from "./constants";

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
  PENDING = "PENDING",
  CONFIRMING = "Confirming",
  DELIVERING = "Delivering",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
  RETURNED = "Returned",
}

export const userApi = {
  doUpdateProfile: (data: any) =>
    apiRequest("user/update-profile", "PUT", null, data),
  doRegister: (data: RegisterPayload) =>
    apiRequest(`${API_KEY.USER}/sign-up`, "POST", data),
  doGetAllUsers: () => apiRequest(`${API_KEY.USER}/get-all-user`, "GET"),
  doDeleteUser: (id: string | number) =>
    apiRequest(`${API_KEY.USER}/delete-user-by-id?Id=${id}`, "DELETE"),
  doGetUserById: (id: string | number) =>
    apiRequest(`${API_KEY.USER}/get-user-by-id?id=${id}`, "GET"),
  doSearchUsers: (query: string) =>
    apiRequest(`${API_KEY.USER}/search-user`, "GET", null, { query }),
  getUserAdminCheck: (
    id: string | number // Hàm mới
  ) => apiRequest(`${API_KEY.USER}/get-user-by-id?id=${id}`, "GET"),
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
  getAllProducts: (params?: {
    name?: string;
    model?: string;
    provider_id?: number;
    color_ids?: number[];
    capacity_id?: number;
    status?: string;
    is_featured?: boolean;
    page?: number;
    size?: number;
    sort_by?: string;
    order?: string;
  }) =>
    apiRequest(`${API_KEY.PRODUCT}/get-all-product`, "GET", undefined, params),
  getProductById: (id: string) =>
    apiRequest(`${API_KEY.PRODUCT}/get-product-by-id?id=${id}`, "GET"),
  createProduct: (productData: CreateProductPayload) =>
    apiRequest(`${API_KEY.PRODUCT}`, "POST", productData),
  updateProduct: (id: string, productData: UpdateProductPayload) =>
    apiRequest(`${API_KEY.PRODUCT}/update-product`, "PUT", productData),
  deleteProduct: (id: string) =>
    apiRequest(`${API_KEY.PRODUCT}/delete-product?id=${id}`, "DELETE"),
  getProductDetailByFilters: (params: ProductDetailFilterParams) =>
    apiRequest(
      `${API_KEY.PRODUCT}/get-product-detail-id-by-product-id-and-color-id-and-capacity-id`,
      "GET",
      null,
      params
    ),
  getAllProductsWithoutPagination: (params = {}) =>
    apiRequest(`${API_KEY.PRODUCT}/get-all-product`, "GET", null, {
      ...params,
      size: 1000, // Số lượng lớn để lấy tất cả
      page: 1,
    }),
};

// export const colorApi = {
//   getAllColors: () => apiRequest(`color/get-all-colors`, "GET"),
//   getColorById: (id: string) => apiRequest(`${API_KEY.COLOR}/get-color-by-id/${id}`, "GET"),
// };

// export const capacityApi = {
//   getAllCapacities: () => apiRequest(`${API_KEY.CAPACITY}/get-all-capacities`, "GET"),
//   getCapacityById: (id: string) => apiRequest(`${API_KEY.CAPACITY}/get-capacity-by-id/${id}`, "GET"),
// };
export const colorApi = {
  getAllColors: () => apiRequest(`${API_KEY.COLOR}/get-all-colors`, "GET"),
  getColorById: (id: string) =>
    apiRequest(`${API_KEY.COLOR}/get-color-by-id?id=${id}`, "GET"),
};

export const capacityApi = {
  getAllCapacities: () =>
    apiRequest(`${API_KEY.CAPACITY}/get-all-capacities`, "GET"),
  getCapacityById: (id: string, unit: string = "GB") =>
    apiRequest(
      `${API_KEY.CAPACITY}/get-capacity-by-id?id=${id}&unit=${unit}`,
      "GET"
    ),
};

export const purchaseApi = {
  createPurchase: (PurchaseData: CreatePurchasePayload) =>
    apiRequest(`${API_KEY.PURCHASE}`, "POST", PurchaseData),
  getAllPurchase: () => apiRequest(`${API_KEY.PURCHASE}`, "GET"),
  getPurchaseById: (id: string) =>
    apiRequest(`${API_KEY.PURCHASE}/${id}`, "GET"),
  deletePurchase: (id: string) =>
    apiRequest(`${API_KEY.PURCHASE}/${id}`, "DELETE"),
  updatePurchase: (id: string, purchaseData: CreatePurchasePayload) =>
    apiRequest(`${API_KEY.PURCHASE}/${id}`, "PATCH", purchaseData),
};

export const vendorsApi = {
  getAllVendors: () => apiRequest(`${API_KEY.VENDORS}/get-all-vendors`, "GET"),
  getVendorById: (id: string) =>
    apiRequest(`${API_KEY.VENDORS}/get-vendor-by-id?id=${id}`, "GET"),
  createVendor: (vendorData: CreateVendorsPayload) =>
    apiRequest(`${API_KEY.VENDORS}/create`, "POST", vendorData),
  updateVendor: (id: string, vendorData: CreateVendorsPayload) =>
    apiRequest(`${API_KEY.VENDORS}/update`, "PUT", { ...vendorData, id }),
  deleteVendor: (id: string) =>
    apiRequest(`${API_KEY.VENDORS}/delete`, "DELETE", { id }),
  createVendorBill: (billData: CreateVendorBillPayload) =>
    apiRequest(`${API_KEY.VENDOR_BILL}`, "POST", billData),
};

export const discountApi = {
  getAllDiscounts: () =>
    apiRequest(`${API_KEY.DISCOUNT}/get-all-discount`, "GET"),
  getDiscountById: (id: string) =>
    apiRequest(`${API_KEY.DISCOUNT}/get-discount-by-id?id=${id}`, "GET"),
  createDiscount: (vendorData: CreateDiscountsPayload) =>
    apiRequest(`${API_KEY.DISCOUNT}/create-discount`, "POST", vendorData),
  updateDiscount: (id: string, vendorData: CreateDiscountsPayload) =>
    apiRequest(`${API_KEY.DISCOUNT}/update-discount`, "PUT", {
      ...vendorData,
      id,
    }),
  deleteDiscount: (id: string) =>
    apiRequest(`${API_KEY.DISCOUNT}/delete-discount?id=${id}`, "DELETE"),
};
export const cartApi = {
  creatCart: (id: string) =>
    apiRequest(`${API_KEY.CART}/create-cart`, "POST", id),
  getAllCartItems: () => apiRequest(API_KEY.CART),
  GetCartByUserId: (id: string) =>
    apiRequest(`cart/get-cart-by-user?user_id=${id}`, "GET"),
  //GetCartByUserId: (id: string) => apiRequest(`${API_KEY.CART}/get-cart-by-user/${id}`, "GET"),

  GetCardByUserAndCartId: (userId: string, cartID: string) =>
    axios.get(`/api/getCart/${userId}`, { params: { cartID } }),
  addCartItem: (itemData: any) =>
    apiRequest(`${API_KEY.CART}/add-item-to-cart`, "POST", itemData),
  updateCartItem: (itemData: UpdateItemInCart) => {
    const url = `${API_KEY.CART}/update-cart-item?cart_id=${encodeURIComponent(
      itemData.cart_id
    )}&item_id=${encodeURIComponent(itemData.item_id)}`;
    console.log("Update URL:", url);
    return apiRequest(url, "PUT", itemData);
  },
  deleteCartItem: (params: DeleteItemInCart) => {
    const url = `${API_KEY.CART}/delete-cart-item?cart_id=${encodeURIComponent(
      params.cart_id
    )}&item_id=${encodeURIComponent(params.item_id)}`;
    console.log("Delete URL:", url);
    return apiRequest(url, "DELETE", null);
  },
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
  getOrderById: (id: string) => apiRequest(`${API_KEY.ORDER}/orderby/${id}`),
  // getOrderByUserID: (id: string) =>
  //   apiRequest(`${API_KEY.ORDER}/orders/user/${id}`),
  getOrderByUserID: (id: string) => apiRequest(`${API_KEY.ORDER}/user/${id}`),
  createOrder: (orderData: any) => apiRequest(API_KEY.ORDER, "POST", orderData),
  updateOrder: (id: string, orderData: any) =>
    apiRequest(`${API_KEY.ORDER}/${id}`, "PATCH", orderData),
  deleteOrder: (id: string) => apiRequest(`${API_KEY.ORDER}/${id}`, "DELETE"),
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
