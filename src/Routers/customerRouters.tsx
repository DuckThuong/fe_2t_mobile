import { Route, Routes } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "./Routers";
import React from "react";
import { SuspenseWrapper } from "../SuspenseWrapper";
import Login from "../Layout/Login/login";
import { ForgotEmailInput } from "../Layout/ForgotPassword/ForgotEmailInput";
import { ForgotCodeInput } from "../Layout/ForgotPassword/ForgotCodeInput";
import { ForgotEditPassword } from "../Layout/ForgotPassword/ForgotEditPassword";
import { ForgotSuccess } from "../Layout/ForgotPassword/ForgotSuccess";
import { ListStudents } from "../Layout/Student/ListStudents";
import { StudentInformation } from "../Layout/Student/StudentInformation";
import { SubjectInformation } from "../Layout/Student/SubjectInformation";
import { ClassList } from "../Layout/Subject/SubjectList/ClassList";

export const CustomerRouter = () => (
  <Routes>
    {/* Login */}
    <Route
      path={CUSTOMER_ROUTER_PATH.LOG_IN}
      element={<SuspenseWrapper component={<Login />} />}
    ></Route>
    {/* Forgot_Password */}
    <Route
      path={CUSTOMER_ROUTER_PATH.FORGOT_EMAIL_INPUT}
      element={<SuspenseWrapper component={<ForgotEmailInput />} />}
    ></Route>
    <Route
      path={CUSTOMER_ROUTER_PATH.FORGOT_CODE_INPUT}
      element={<SuspenseWrapper component={<ForgotCodeInput />} />}
    ></Route>
    <Route
      path={CUSTOMER_ROUTER_PATH.FORGOT_EDIT_PASSWORD}
      element={<SuspenseWrapper component={<ForgotEditPassword />} />}
    ></Route>
    <Route
      path={CUSTOMER_ROUTER_PATH.FORGOT_SUCCESS}
      element={<SuspenseWrapper component={<ForgotSuccess />} />}
    ></Route>
    {/* List_Students */}
    <Route
      path={CUSTOMER_ROUTER_PATH.LIST_STUDENT}
      element={<SuspenseWrapper component={<ListStudents />} />}
    ></Route>
    {/* Student_Information */}
    <Route
      path={CUSTOMER_ROUTER_PATH.STUDENT_INFORMATION}
      element={<SuspenseWrapper component={<StudentInformation />} />}
    ></Route>
    {/* Subject_Information */}
    <Route
      path={CUSTOMER_ROUTER_PATH.SUBJECT_INFORMATION}
      element={<SuspenseWrapper component={<SubjectInformation />} />}
    ></Route>
    {/* List Subject */}
    <Route
      path={CUSTOMER_ROUTER_PATH.LIST_CLASS}
      element={<SuspenseWrapper component={<ClassList />} />}
    ></Route>
  </Routes>
);
