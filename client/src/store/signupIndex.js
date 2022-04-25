import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSignUp: false,
  hasSignedup: false,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    showSignUpDialogBox(state) {
      state.showSignUp = !state.showSignUp;
    },
    hideSignUpDialogBox(state) {
      state.showSignUp = false;
    },
    // signup(state) {
    //   state.hasSignedup = true;
    // },
  },
});

export const SignUpActions = signupSlice.actions;
export default signupSlice.reducer;
