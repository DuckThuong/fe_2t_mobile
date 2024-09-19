import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { CUSTOMER_ROUTER_PATH } from "../Routers/Routers";

export interface AuthState {
  loading: boolean;
  error?: string | null;
}

const initialState: AuthState = {
  loading: false,
  error: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      sessionStorage.clear();

      if (window.location.pathname !== CUSTOMER_ROUTER_PATH.LOG_IN) {
        window.location.href = CUSTOMER_ROUTER_PATH.LOG_IN;
      }
    },
  },
});

export const { logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
