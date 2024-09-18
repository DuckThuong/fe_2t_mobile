import Login from "../Login/login";
import { Route, Routes } from "react-router-dom";
import { CUSTOMER_ROUTER_PATH } from "./Routers";
import React from "react";
import { SuspenseWrapper } from "../SuspenseWrapper";
import SignIn from "../SignUI/SingIn/signin";
import SignIn2 from "../SignUI/SignIn2/signin2";
import Signin3 from "../SignUI/SignIn3/signin3";

export const CustomerRouter = () => (
  <Routes>
    <Route
      path={CUSTOMER_ROUTER_PATH.LOG_IN}
      element={<SuspenseWrapper component={<Login />} />}
    ></Route>
    <Route
      path={CUSTOMER_ROUTER_PATH.SIGN_IN}
      element={<SuspenseWrapper component={<SignIn />} />}
    ></Route>
    <Route
      path={CUSTOMER_ROUTER_PATH.SIGN_IN2}
      element={<SuspenseWrapper component={<SignIn2 />} />}
    ></Route>
    <Route
      path={CUSTOMER_ROUTER_PATH.SIGN_IN3}
      element={<SuspenseWrapper component={<Signin3 />} />}
    ></Route>
  </Routes>
);
