import { Route, Routes } from "react-router-dom";
import { Cartergories } from "../Layout/Cart";
import { ForgotCodeInput } from "../Layout/ForgotPassword/ForgotCodeInput";
import { ForgotEditPassword } from "../Layout/ForgotPassword/ForgotEditPassword";
import { ForgotEmailInput } from "../Layout/ForgotPassword/ForgotEmailInput";
import { ForgotSuccess } from "../Layout/ForgotPassword/ForgotSuccess";
import Login from "../Layout/Login/login";
import Signup from "../Layout/Signup/signup";
import { ProductDetail } from "../Layout/Products/ProductDetail";
import { Home } from "../Layout/TrangChu";
import { ListPage } from "../Layout/TrangList";
import { SuspenseWrapper } from "../SuspenseWrapper";
import { CUSTOMER_ROUTER_PATH } from "./Routers";
import Order from "../Layout/Order";
import { Purchase } from "../Layout/Purchase";
import Profile from "../Layout/Profile";

export const CustomerRouter = () => (
  <Routes>
    {/* Login */}
    <Route
      path={CUSTOMER_ROUTER_PATH.LOG_IN}
      element={<SuspenseWrapper component={<Login />} />}
    ></Route>
    {/* Signup */}
    <Route
      path={CUSTOMER_ROUTER_PATH.SIGN_UP}
      element={<SuspenseWrapper component={<Signup />} />}
    ></Route>

    {/* Forgot_Password */}
    <Route>
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
    </Route>
    {/* Trang Chủ */}
    <Route>
      <Route
        path={CUSTOMER_ROUTER_PATH.TRANG_CHU}
        element={<SuspenseWrapper component={<Home />} />}
      ></Route>
    </Route>
    <Route>
      <Route
        path={CUSTOMER_ROUTER_PATH.TRANG_DS_SP}
        element={<SuspenseWrapper component={<ListPage />} />}
      ></Route>
    </Route>

    {/* Giỏ hàng */}
    <Route>
      <Route
        path={CUSTOMER_ROUTER_PATH.CATERGORIES}
        element={<SuspenseWrapper component={<Cartergories />} />}
      ></Route>
    </Route>
    <Route>
      <Route
        path={CUSTOMER_ROUTER_PATH.PRODUCT_DETAIL}
        element={<SuspenseWrapper component={<ProductDetail />} />}
      ></Route>
    </Route>
    <Route>
      <Route
        path={CUSTOMER_ROUTER_PATH.ORDER_LIST}
        element={<SuspenseWrapper component={<Order />} />}
      ></Route>
      <Route
        path={CUSTOMER_ROUTER_PATH.ORDER_DETAIL}
        element={<SuspenseWrapper component={<Order />} />}
      ></Route>
      <Route
        path={CUSTOMER_ROUTER_PATH.MUA_HANG}
        element={<SuspenseWrapper component={<Purchase />} />}
      ></Route>

      <Route
        path={CUSTOMER_ROUTER_PATH.PROFILE}
        element={<SuspenseWrapper component={<Profile />} />}
      ></Route>
    </Route>
  </Routes>
);
