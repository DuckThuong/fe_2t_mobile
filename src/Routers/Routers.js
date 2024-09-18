const CUSTOMER = ""; //đường dân của sever: localhost:3000
export const ACTION = {
  CREATE: "create", //đường dẫn cho tạo màn mới

  DETAIL: "detail", //đường dẫn cho việc xem màn vừa tạo mới
};
export const CUSTOMER_ROUTE_NAME = {//customer router name: tên của các màn mà trang web muốn hướng đến
  LOG_IN: "",
  SIGN_IN: "sign_in",
  SIGN_IN2: "sign_in2",
  SIGN_IN3: "sign_in3",
};
export const CUSTOMER_ROUTER_PATH = { //gộp 2 cái trên lại thì ra cục này, đường dẫn hoàn chỉnh: Customer path
  LOG_IN: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.LOG_IN}`,
  SIGN_IN: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.SIGN_IN}`,
  SIGN_IN2: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.SIGN_IN2}`,
  SIGN_IN3: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.SIGN_IN3}`,
  // đường dẫn này viết bằng JSON
};
