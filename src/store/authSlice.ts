import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

interface AuthState {
  id: string;
  email: string;
  fullName: string;
}

const initialState: AuthState = {
  id: "",
  email: "",
  fullName: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<AuthState>) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
    },
    clearAuthUser(state) {
      state.id = "";
      state.email = "";
      state.fullName = "";
    },
  },
});

export const { setAuthUser, clearAuthUser } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
