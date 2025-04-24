const CUSTOMER = "";
export const ACTION = {
  CREATE: "create",

  DETAIL: "detail",
};
export const CUSTOMER_ROUTE_NAME = {
  //Log_In
  LOG_IN: "",
  //sign_in
  SIGN_UP: "sign-up",
  //Forgot_password
  FORGOT_EMAIL_INPUT: "forgot-email-input",
  FORGOT_CODE_INPUT: "forgot-code-input",
  FORGOT_EDIT_PASSWORD: "forgot-edit-password",
  FORGOT_SUCCESS: "forgot-success",
  MUA_HANG: "mua-hang",

  //List_Students
  TRANG_CHU: "trang-chu",
  TRANG_DS_SP: "trang_ds_sp",
  //Catergories
  CATERGORIES: "catergories",
  //Product_Detail:
  PRODUCT_DETAIL: "trang-chu/:id",
  // Order
  ORDER_LIST: "order",
  ORDER_DETAIL: "order/:id",
  //cá nhân
  PROFILE: "profile",
};
export const CUSTOMER_ROUTER_PATH = {
  //Log_In
  LOG_IN: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.LOG_IN}`,
  SIGN_UP: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.SIGN_UP}`,
  //Forgot_password
  FORGOT_EMAIL_INPUT: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.FORGOT_EMAIL_INPUT}`,
  FORGOT_CODE_INPUT: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.FORGOT_CODE_INPUT}`,
  FORGOT_EDIT_PASSWORD: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.FORGOT_EDIT_PASSWORD}`,
  FORGOT_SUCCESS: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.FORGOT_SUCCESS}`,
  //List_students
  TRANG_CHU: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.TRANG_CHU}`,
  TRANG_DS_SP: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.TRANG_DS_SP}`,

  //Catergories
  CATERGORIES: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.CATERGORIES}`,
  //Product_detail
  PRODUCT_DETAIL: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.PRODUCT_DETAIL}`,
  // Order
  ORDER_LIST: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.ORDER_LIST}`,
  ORDER_DETAIL: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.ORDER_DETAIL}`,
  MUA_HANG: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.MUA_HANG}`,
  //cá nhân
  PROFILE: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.PROFILE}`,
};

const ADMIN = "admin";

export const ADMIN_ROUTE_NAME = {
  ADMIN: `/${ADMIN}`,
  DASHBOARD: `/${ADMIN}/dashboard`,
  USER_LIST: `/${ADMIN}/user-list`,
  PROVIDER_LIST: `/${ADMIN}/provider-list`,
  ADD_PROVIDER: `/${ADMIN}/provider-list/add-provider`,
  EDIT_PROVIDER: (id: string | number) =>
    `/${ADMIN}/provider-list/edit-provider/${id}`,
  PRODUCT_LIST: `/${ADMIN}/product-list`,
  ADD_SHIPMENT: `/${ADMIN}/product-list/add-shipment`,
  ADD_PRODUCT: `/${ADMIN}/product-list/add-provider`,
  EDIT_PRODUCT: `/${ADMIN}/product-list/edit-provider`,
  ORDER: `/${ADMIN}/order`,
};

export const ADMIN_ROUTER_PATH = {
  ADMIN: `/${ADMIN}`,
  DASHBOARD: `/${ADMIN}/dashboard`,
  USER_LIST: `/${ADMIN}/user-list`,
  PROVIDER_LIST: `/${ADMIN}/provider-list`,
  ADD_PROVIDER: `/${ADMIN}/provider-list/add-provider`,
  EDIT_PROVIDER: (id: string | number) =>
    `/${ADMIN}/provider-list/edit-provider/${id}`,

  PRODUCT_LIST: `/${ADMIN}/product-list`,
  ADD_SHIPMENT: `/${ADMIN}/product-list/add-shipment`,
  ADD_PRODUCT: `/${ADMIN}/product-list/add-product`,
  EDIT_PRODUCT: `/${ADMIN}/product-list/edit-product`,
  ORDER: `/${ADMIN}/order`,
};
