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
  //List_Tuitioin.
  LIST_TUITION: "list-tuition",
  //Tuition_information
  TUITION_INFORMATION: "tuition-information",
  //Discipline and reward
  DISCIPLINE_AND_REWARD: "discipline-and-reward",
  REWARD_INFORMATION: "reward-information",
  DISCIP_INFORMATION: "discip_information",
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
  //List_Tuition
  LIST_TUITION: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.LIST_TUITION}`,
  //Tuition_information
  TUITION_INFORMATION: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.TUITION_INFORMATION}`,
  //Discipline and reward
  DISCIPLINE_AND_REWARD: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.DISCIPLINE_AND_REWARD}`,
  REWARD_INFORMATION: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.REWARD_INFORMATION}`,
  DISCIP_INFORMATION: `${CUSTOMER}/${CUSTOMER_ROUTE_NAME.DISCIP_INFORMATION}`,
};
