const CUSTOMER = "";
export const ACTION = {
  CREATE: "create",

  DETAIL: "detail",
};
export const CUSTOMER_ROUTE_NAME = {
  //Log_In
  LOG_IN: "",
  //Forgot_password
  FORGOT_EMAIL_INPUT: "forgot-email-input",
  FORGOT_CODE_INPUT: "forgot-code-input",
  FORGOT_EDIT_PASSWORD: "forgot-edit-password",
  FORGOT_SUCCESS: "forgot-success",
  //List_Students
  TRANG_CHU: "trang-chu",
  //Catergories
  CATERGORIES: "catergories",
  //Product_Detail:
  PRODUCT_DETAIL: "trang-chu/:id",
  // Order
  ORDER_LIST: "order",
  ORDER_DETAIL: "order/:id",
};
export const CUSTOMER_ROUTER_PATH = {
  //Log_In
  LOG_IN: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.LOG_IN}`,
  //Forgot_password
  FORGOT_EMAIL_INPUT: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.FORGOT_EMAIL_INPUT}`,
  FORGOT_CODE_INPUT: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.FORGOT_CODE_INPUT}`,
  FORGOT_EDIT_PASSWORD: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.FORGOT_EDIT_PASSWORD}`,
  FORGOT_SUCCESS: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.FORGOT_SUCCESS}`,
  //List_students
  TRANG_CHU: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.TRANG_CHU}`,
  //Catergories
  CATERGORIES: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.CATERGORIES}`,
  //Product_detail
  PRODUCT_DETAIL: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.PRODUCT_DETAIL}`,
  // Order
  ORDER_LIST: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.ORDER_LIST}`,
  ORDER_DETAIL: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.ORDER_DETAIL}`,
};

const ADMIN = "admin";

export const ADMIN_ROUTE_NAME = {
  ADMIN: `/${ADMIN}`,
  DASHBOARD: `/${ADMIN}/dashboard`,
  SUPPLIER_LIST: `/${ADMIN}/supplier-list`,
  PRODUCT_LIST: `/${ADMIN}/product-list`,
  ADD_PRODUCT: `/${ADMIN}/product-list/add-product`,
  EDIT_PRODUCT: `/${ADMIN}/product-list/edit-product`,
  ORDER: `/${ADMIN}/order`,
};

export const ADMIN_ROUTER_PATH = {
  ADMIN: `/${ADMIN}`,
  DASHBOARD: `/${ADMIN}/dashboard`,
  SUPPLIER_LIST: `/${ADMIN}/supplier-list`,
  PRODUCT_LIST: `/${ADMIN}/product-list`,
  ADD_PRODUCT: `/${ADMIN}/product-list/add-product`,
  EDIT_PRODUCT: `/${ADMIN}/product-list/edit-product`,
  ORDER: `/${ADMIN}/order`,
};
