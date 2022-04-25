import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./loginIndex";
import SignupReducer from "./signupIndex";
import ActionReducer from "./actionIndex";
import AuthReducer from "./authenticationIndex";

const store = configureStore({
  reducer: {
    login: LoginReducer,
    signup: SignupReducer,
    auth: AuthReducer,
    action: ActionReducer,
  },
});

export default store;
