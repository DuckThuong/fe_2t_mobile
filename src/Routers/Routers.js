const CUSTOMER = ""; //Đường dẫn của server: localhost:3000
export const ACTION = {
  CREATE: "create", // Đường dẫn cho màn tạo màn mới..
  DETAIL: "detail", // Đường dẫn cho việc xem màn vừa tạo mới.
};
export const CUSTOMER_ROUTE_NAME = {
  //Customer router name: tên của các màn mà trang web muốn hướng đến.
  LOG_IN: "",
  SIGN_IN: "sign_in",
  SIGN_IN2: "sign_in2",
  SIGN_IN3: "sign_in3",
};
export const CUSTOMER_ROUTER_PATH = {
  //Customer path: đường dẫn hoàn chỉnh của trang web
  LOG_IN: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.LOG_IN}`,
  SIGN_IN: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.SIGN_IN}`,
  SIGN_IN2: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.SIGN_IN2}`,
  SIGN_IN3: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.SIGN_IN3}`,
};
