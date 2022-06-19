import { useHistory } from "react-router-dom";
import { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Button from "../UI/Button";
import classes from "./LoginForm.module.css";
import { AuthActions } from "../../store/authenticationIndex";
import LoadingProfile from "../UserHomePage/LoadingProfile";

const LoginForm = () => {
  const [loading, setLoading] = useState(null);
  const [loginErrorMsg, setLoginErrorMsg] = useState(null);
  const [email, setEmail] = useState("");
  const [emailWasTouched, setEmailWasTouched] = useState(false);
  const emailIsValid = email.trim() !== "" && email.includes("@");
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const emailBlurHandler = () => {
    setEmailWasTouched(true);
  };
  const emailInputIsInvalid = !emailIsValid && emailWasTouched;

  const [password, setPassword] = useState("");
  const [passwordWasTouched, setPasswordWasTouched] = useState(false);
  const passwordIsValid = password.trim() !== "";
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const passwordBlurHandler = () => {
    setPasswordWasTouched(true);
  };
  const passwordInputIsInvalid = !passwordIsValid && passwordWasTouched;

  const formIsValid = emailIsValid && passwordIsValid;

  const dispatch = useDispatch();
  const history = useHistory();

  const loginFormSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!formIsValid) {
      return;
    } else {
      const userData = {
        email,
        password,
      };
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const body = JSON.stringify(userData);
        const response = await axios.post("/api/auth/postlogin", body, config);
        setLoading(false);
        const payload = response.data;
        dispatch(AuthActions.login(payload));
        if (email !== "admin@google.com") {
          history.replace("/api/user/home");
        } else {
          history.replace("/api/complainmanager/view complains");
        }
      } catch (e) {
        setLoading(false);
        console.log(e);
        const errors = e.response.data.errors;
        if (errors) {
          setLoginErrorMsg(errors[0].msg);
          setTimeout(() => {
            setLoginErrorMsg(null);
          }, 3000);
        }
      }
    }
  };
  const appliedClasses = `${classes.l}`;
  const appliedClasses1 = `${classes.l}`;
  return (
    <Fragment>
      {loading && <LoadingProfile />}
      {!loading && (
        <div className={classes.loginForm}>
          <div className={classes.header}>
            <p>Login into your account</p>
          </div>
          <form onSubmit={loginFormSubmitHandler} noValidate={true}>
            <div className={classes.mainContent}>
              <div className={appliedClasses}>
                <div className={appliedClasses1}>
                  <div className={classes.loginFormLabels}>
                    <label htmlFor="email">E-Mail</label>
                  </div>
                  <input
                    type="email"
                    required={true}
                    placeholder="your email id"
                    name="email"
                    autoComplete="off"
                    value={email}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                  />
                </div>
                <div className={classes.emailerr}>
                  {emailInputIsInvalid && (
                    <div className={classes.invalid}>
                      <p>please provide a valid email</p>
                    </div>
                  )}
                </div>
              </div>
              <div className={classes.fieldContainer}>
                <div className={classes.fields}>
                  <div className={classes.loginFormLabels}>
                    <label htmlFor="password">Password</label>
                  </div>
                  <input
                    type="password"
                    required={true}
                    placeholder="your password"
                    name="password"
                    autoComplete="off"
                    value={password}
                    onChange={passwordChangeHandler}
                    onBlur={passwordBlurHandler}
                  />
                </div>
                {passwordInputIsInvalid && (
                  <div className={classes.invalid}>
                    <p>please provide a valid password</p>
                  </div>
                )}
              </div>
            </div>
            {!loading && (
              <Button
                type="submit"
                disabled={!formIsValid}
                onClick={loginFormSubmitHandler}
                className={classes.loginButton}
              >
                Login
              </Button>
            )}
            <div className={classes.footer}>
              {/* <p className={classes.lForgotPassword}>Forgot Password</p> */}
              <p onClick={() => history.push("/api/signup")}>
                New User?{" "}
                <span className={classes.lSignup}>Create Account</span>
              </p>
            </div>
          </form>
        </div>
      )}
      {loginErrorMsg && <p className={classes.errmsg}>{loginErrorMsg}</p>}
    </Fragment>
  );
};

export default LoginForm;
