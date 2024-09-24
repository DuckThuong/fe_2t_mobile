import { Route, Routes } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "./Routers";
import React from "react";
import { SuspenseWrapper } from "../SuspenseWrapper";
import EmailInput from "../Layout/SingIn/EmailInput";
import PrivacyCode from "../Layout/SingIn/PrivacyCode";
import ClaimAccount from "../Layout/SingIn/ClaimAccount";
import Login from "../Layout/Login/login";
import { ForgotEmailInput } from "../Layout/ForgotPassword/ForgotEmailInput";
import { ForgotCodeInput } from "../Layout/ForgotPassword/ForgotCodeInput";
import { ForgotEditPassword } from "../Layout/ForgotPassword/ForgotEditPassword";
import { ForgotSuccess } from "../Layout/ForgotPassword/ForgotSuccess";

export const CustomerRouter = () => (
  <Routes>
    {/* Login */}
    <Route
      path={CUSTOMER_ROUTER_PATH.LOG_IN}
      element={<SuspenseWrapper component={<Login />} />}
    ></Route>
    {/* Sign_In */}
    <Route
      path={CUSTOMER_ROUTER_PATH.EMAIL_INPUT}
      element={<SuspenseWrapper component={<EmailInput />} />}
    ></Route>
    <Route
      path={CUSTOMER_ROUTER_PATH.PRIVACY_CODE}
      element={<SuspenseWrapper component={<PrivacyCode />} />}
    ></Route>
    <Route
      path={CUSTOMER_ROUTER_PATH.CLAIM_ACCOUNT}
      element={<SuspenseWrapper component={<ClaimAccount />} />}
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
  </Routes>
);
