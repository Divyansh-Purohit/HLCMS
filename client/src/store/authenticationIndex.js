import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, payload) {
      const token = payload.payload.token;
      state.token = token;
      state.user = payload.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem("token", token);
      localStorage.setItem("userid", payload.payload.user._id);
      localStorage.setItem("house_num", payload.payload.user.house_num);
    },
    logout(state) {
      state.token = "";
      state.user = null;
      state.isAuthenticated = false;
      localStorage.clear();
    },
    updateProfile(state, payload) {
      localStorage.setItem("house_num", payload.payload);
    },
  },
});

export const AuthActions = authSlice.actions;
export default authSlice.reducer;
