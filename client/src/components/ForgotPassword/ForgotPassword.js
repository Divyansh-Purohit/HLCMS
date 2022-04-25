import { Fragment } from "react";
import classes from "./ForgotPassword.module.css";
const ForgotPassword = () => {
  const formSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <Fragment>
      <form onSubmit={formSubmitHandler}></form>
    </Fragment>
  );
};

export default ForgotPassword;
