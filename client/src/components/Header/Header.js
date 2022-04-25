import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import classes from "./Header.module.css";
import Button from "../UI/Button.js";
import { LoginActions } from "../../store/loginIndex";
import { SignUpActions } from "../../store/signupIndex";
import { AuthActions } from "../../store/authenticationIndex";

const Header = () => {
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const loginHandler = () => {
    dispatch(LoginActions.showLoginDialogBox());
    dispatch(SignUpActions.hideSignUpDialogBox());
  };

  const signupHandler = () => {
    dispatch(LoginActions.hideLoginDialogBox());
    dispatch(SignUpActions.showSignUpDialogBox());
  };

  const logoutHandler = async () => {
    dispatch(AuthActions.logout());
    history.replace("/api/login");
  };

  return (
    <Fragment>
      <div className={classes.header}>
        <section className={classes.s1}>
          <h1 className={classes.title}>Halwara AFS Online Portal</h1>
        </section>
        <section className={classes.s2}>
          {!isLoggedIn && (
            <div>
              <Link to="/api/login">
                <Button
                  type="button"
                  className={classes.button}
                  onClick={loginHandler}
                >
                  Login
                </Button>
              </Link>
              <Link to="/api/signup">
                <Button
                  type="button"
                  className={classes.button}
                  onClick={signupHandler}
                >
                  Create Account
                </Button>
              </Link>
            </div>
          )}
          {isLoggedIn && (
            <div>
              <Button
                type="button"
                className={classes.button}
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </div>
          )}
        </section>
      </div>
    </Fragment>
  );
};

export default Header;
