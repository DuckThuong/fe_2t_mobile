import { SuspenseWrapper } from "../SuspenseWrapper";
import { CUSTOMER_ROUTER_PATH } from "./Routers";
import Login from "../Layout/Login/login";
import { ForgotEmailInput } from "../Layout/ForgotPassword/ForgotEmailInput";
import { ForgotCodeInput } from "../Layout/ForgotPassword/ForgotCodeInput";
import { ForgotEditPassword } from "../Layout/ForgotPassword/ForgotEditPassword";
import { ForgotSuccess } from "../Layout/ForgotPassword/ForgotSuccess";
import { Route, Routes } from "react-router-dom";

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
  </Routes>
);
