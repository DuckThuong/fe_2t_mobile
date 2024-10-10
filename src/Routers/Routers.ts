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
  LIST_STUDENT: "list-student",
  //Student_information
  STUDENT_INFORMATION: "student-information",
  //CLASS_information
  CLASS_INFORMATION: "CLASS-information",
  //List_CLASS.
  LIST_CLASS: "list-class",
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
  LIST_STUDENT: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.LIST_STUDENT}`,
  //Student_information
  STUDENT_INFORMATION: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.STUDENT_INFORMATION}`,
  //Subject_information
  SUBJECT_INFORMATION: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.CLASS_INFORMATION}`,
  //List_CLASS
  LIST_CLASS: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.LIST_CLASS}`,
};
