const CUSTOMER = ""; //đường dân của sever: localhost:3000
export const ACTION = {
  CREATE: "create", //đường dẫn cho tạo màn mới

  DETAIL: "detail", //đường dẫn cho việc xem màn vừa tạo mới
};
export const CUSTOMER_ROUTE_NAME = {
  //customer router name: tên của các màn mà trang web muốn hướng đến
  LOG_IN: "",
  //Sign_in
  EMAIL_INPUT: "email_input",
  PRIVACY_CODE: "privacy_code",
  CLAIM_ACCOUNT: "claim_account",
  //Forgot_password
  FORGOT_EMAIL_INPUT: "forgot-email-input",
  FORGOT_CODE_INPUT: "forgot-code-input",
  FORGOT_EDIT_PASSWORD: "forgot-edit-password",
  FORGOT_SUCCESS: "forgot-success",
};
export const CUSTOMER_ROUTER_PATH = {
  //gộp 2 cái trên lại thì ra cục này, đường dẫn hoàn chỉnh: Customer path
  LOG_IN: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.LOG_IN}`,
  //Sign_in
  EMAIL_INPUT: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.EMAIL_INPUT}`,
  PRIVACY_CODE: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.PRIVACY_CODE}`,
  CLAIM_ACCOUNT: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.CLAIM_ACCOUNT}`,
  //Forgot_password
  FORGOT_EMAIL_INPUT: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.FORGOT_EMAIL_INPUT}`,
  FORGOT_CODE_INPUT: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.FORGOT_CODE_INPUT}`,
  FORGOT_EDIT_PASSWORD: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.FORGOT_EDIT_PASSWORD}`,
  FORGOT_SUCCESS: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.FORGOT_SUCCESS}`,
};
