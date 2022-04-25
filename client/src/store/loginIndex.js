import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // isLoggedIn: false,
  // isLoggedOut: true,
  showLogin: false,
};

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    // login(state) {
    //   state.isLoggedIn = true;
    //   state.isLoggedOut = false;
    // },
    // logout(state) {
    //   state.isLoggedOut = true;
    //   state.isLoggedIn = false;
    // },
    showLoginDialogBox(state) {
      state.showLogin = !state.showLogin;
    },
    hideLoginDialogBox(state) {
      state.showLogin = false;
    },
  },
});

export const LoginActions = LoginSlice.actions;
export default LoginSlice.reducer;
