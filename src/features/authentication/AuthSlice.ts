import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "./models/AuthResponse";

interface AuthState {
  isAuth: boolean;
}

const initialState: AuthState = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthResponse>) => {
      localStorage.setItem("tokens", JSON.stringify(action.payload));
      state.isAuth = true;
    },
    logout: (state) => {
      localStorage.removeItem("tokens")
      state.isAuth = false;
    },
  },
});

export default authSlice.reducer;