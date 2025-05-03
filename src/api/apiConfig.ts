export const API_BASE_URL = "http://localhost:3300";

export const API_KEY = {
  USER: "user",
  IMAGE: "images",
  PRODUCT: "product",
  CART: "cart",
  REVIEW: "reviews",
  PAYMENT: "payments",
  ORDER: "orders",
  ORDER_DETAIL: "order-details",
  COLOR: "colors",
  CAPACITY: "capacities",
  PURCHASE: "purchases",
  VENDORS: "vendors",
};

export const QUERY_KEY = {
  GET_USER: `${API_BASE_URL}/${API_KEY.USER}`,
  GET_IMAGE: `${API_BASE_URL}/${API_KEY.IMAGE}`,
  GET_PRODUCT: `${API_BASE_URL}/${API_KEY.PRODUCT}`,
  GET_CART: `${API_BASE_URL}/${API_KEY.CART}`,
  GET_REVIEW: `${API_BASE_URL}/${API_KEY.REVIEW}`,
  GET_PAYMENT: `${API_BASE_URL}/${API_KEY.PAYMENT}`,
  GET_ORDER: `${API_BASE_URL}/${API_KEY.ORDER}`,
  GET_ORDER_DETAIL: `${API_BASE_URL}/${API_KEY.ORDER}`,
  GET_COLOR: `${API_BASE_URL}/${API_KEY.COLOR}`,
  GET_CAPACITY: `${API_BASE_URL}/${API_KEY.CAPACITY}`,
  CREATE_PURCHASE: `${API_BASE_URL}/${API_KEY.PURCHASE}`,
};
