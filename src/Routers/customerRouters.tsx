import { Route, Routes } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "./Routers";
import React from "react";
import { SuspenseWrapper } from "../SuspenseWrapper";
import EmailInput from "../Layout/SignUI/SingIn/EmailInput";
import PrivacyCode from "../Layout/SignUI/SingIn/PrivacyCode";
import ClaimAccount from "../Layout/SignUI/SingIn/ClaimAccount";
import Login from "../Layout/Login/login";

export const CustomerRouter = () => (
  <Routes>
    <Route
      path={CUSTOMER_ROUTER_PATH.LOG_IN}
      element={<SuspenseWrapper component={<Login />} />}
    ></Route>
    <Route
      path={CUSTOMER_ROUTER_PATH.SIGN_IN}
      element={<SuspenseWrapper component={<EmailInput />} />}
    ></Route>
    <Route
      path={CUSTOMER_ROUTER_PATH.SIGN_IN2}
      element={<SuspenseWrapper component={<PrivacyCode />} />}
    ></Route>
    <Route
      path={CUSTOMER_ROUTER_PATH.SIGN_IN3}
      element={<SuspenseWrapper component={<ClaimAccount />} />}
    ></Route>
  </Routes>
);
