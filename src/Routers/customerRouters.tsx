import { Route, Routes } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "./Routers";
import React from "react";
import { SuspenseWrapper } from "../SuspenseWrapper";
import EmailInput from "../Layout/SingIn/EmailInput";
import PrivacyCode from "../Layout/SingIn/PrivacyCode";
import ClaimAccount from "../Layout/SingIn/ClaimAccount";
import Login from "../Layout/Login/login";

export const CustomerRouter = () => (
  <Routes>
    <Route
      path={CUSTOMER_ROUTER_PATH.LOG_IN}
      element={<SuspenseWrapper component={<Login />} />}
    ></Route>
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
  </Routes>
);
