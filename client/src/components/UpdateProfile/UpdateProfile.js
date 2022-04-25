import { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Button from "../UI/Button";
import classes from "./UpdateProfile.module.css";
import LoadingProfile from "../UserHomePage/LoadingProfile";
import { AuthActions } from "../../store/authenticationIndex";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(null);
  const [username, setUsername] = useState("");
  const [usernameWasTouched, setUsernameWasTouched] = useState(false);
  const usernameIsValid =
    username.trim() !== "" && username.length > 2 && username.length < 11;
  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };
  const usernameBlurHandler = () => {
    setUsernameWasTouched(true);
  };
  const usernameInputIsInvalid = !usernameIsValid && usernameWasTouched;

  const [phone_num, setPhone_num] = useState("");
  const [phone_numWasTouched, setPhone_numWasTouched] = useState(false);
  const phone_numIsValid = phone_num.trim() !== "" && phone_num.length === 10;
  const phone_numChangeHandler = (event) => {
    setPhone_num(event.target.value);
  };
  const phone_numBlurHandler = () => {
    setPhone_numWasTouched(true);
  };
  const phone_numInputIsInvalid = !phone_numIsValid && phone_numWasTouched;

  const [house_num, setHouse_num] = useState("");
  const [house_numWasTouched, setHouse_numWasTouched] = useState(false);
  const house_numIsValid = house_num.trim() !== "" && house_num.length < 8;
  const house_numChangeHandler = (event) => {
    setHouse_num(event.target.value);
  };
  const house_numBlurHandler = () => {
    setHouse_numWasTouched(true);
  };
  const house_numInputIsInvalid = !house_numIsValid && house_numWasTouched;

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [passwordWasTouched, setPasswordWasTouched] = useState(false);
  const passwordIsValid =
    password.trim() !== "" && password.length > 5 && password.length < 21;
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const passwordBlurHandler = () => {
    setPasswordWasTouched(true);
  };
  const passwordInputIsInvalid = !passwordIsValid && passwordWasTouched;

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordWasTouched, setConfirmPasswordWasTouched] =
    useState(false);
  const confirmPasswordIsValid = confirmPassword === password;
  const confirmPasswordChangeHandler = (event) => {
    setConfirmPassword(event.target.value);
  };
  const confirmPasswordBlurHandler = () => {
    setConfirmPasswordWasTouched(true);
  };
  const confirmPasswordInputIsInvalid =
    !confirmPasswordIsValid && confirmPasswordWasTouched;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get("/api/user/userdata");
        setLoading(false);
        const { username, house_num, phone_num, email } = response.data.user;
        setUsername(username);
        setHouse_num(house_num);
        setPhone_num(phone_num);
        setEmail(email);
      } catch (err) {
        if (err.response.status === 401) {
          history.push("/api/user/authorization-denied");
        } else if (err.response.status === 500) {
          history.push("/api/user/internal-server-error");
        }
        setLoading(false);
        console.log(err.response.data);
      }
    }
    fetchData();
  }, []);

  const formIsValid =
    usernameIsValid &&
    phone_numIsValid &&
    house_numIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid;
  const deleteProfileHandler = async () => {
    setLoading(true);
    try {
      const userid = localStorage.getItem("userid");
      const response = await axios.delete(`/api/user/deleteprofile/${userid}`);
      setLoading(false);
      console.log(response);
      dispatch(AuthActions.logout());
      history.replace("/api/signup");
    } catch (e) {
      setLoading(false);
      console.log(123);
      console.log(e.message);
    }
  };

  const updateProfileHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setUsernameWasTouched(true);
    setHouse_numWasTouched(true);
    setPhone_numWasTouched(true);
    setPasswordWasTouched(true);
    setConfirmPasswordWasTouched(true);
    if (!formIsValid) {
      return;
    } else {
      const userData = {
        username,
        house_num,
        phone_num,
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
        await axios.post("/api/user/updateprofile", body, config);
        setLoading(false);
        history.replace("/api/user/home");
      } catch (e) {
        setLoading(false);
        if (e.response.status === 401) {
          history.push("/api/user/authorization-denied");
        } else if (e.response.status === 500) {
          history.push("api/user/internal-server-error");
        }
      }
      dispatch(AuthActions.updateProfile(house_num));
    }

    setUsername("");
    setUsernameWasTouched(false);
    setHouse_num("");
    setHouse_numWasTouched(false);
    setPhone_num("");
    setPhone_numWasTouched(false);
    setPassword("");
    setPasswordWasTouched(false);
    setConfirmPassword("");
    setConfirmPasswordWasTouched(false);
  };

  const appliedClasses = `${classes.fields} ${classes.f2r}`;
  return (
    <Fragment>
      {loading && <LoadingProfile />}
      {!loading && (
        <div className={classes.signupForm}>
          <div className={classes.header}>
            <p>Update your profile</p>
          </div>
          <form onSubmit={updateProfileHandler} noValidate={true}>
            <div className={classes.mainContent}>
              <div className={classes.f2}>
                <div className={classes.fieldContainer}>
                  <div className={classes.fields}>
                    <div className={classes.signupFormLabels}>
                      <label htmlFor="username">Name</label>
                    </div>
                    <input
                      type="text"
                      required={true}
                      placeholder="your new username"
                      name="username"
                      value={username}
                      onChange={usernameChangeHandler}
                      onBlur={usernameBlurHandler}
                      autoComplete="none"
                    />
                  </div>
                  {usernameInputIsInvalid && (
                    <div className={classes.invalid}>
                      <p>enter 3 to 10 characters</p>
                    </div>
                  )}
                </div>
                <div className={classes.fieldContainer}>
                  <div className={classes.right}>
                    <div className={appliedClasses}>
                      <div className={classes.signupFormLabels}>
                        <label htmlFor="house_num">House Number</label>
                      </div>
                      <input
                        type="text"
                        required={true}
                        placeholder="your new house number"
                        name="house_num"
                        value={house_num}
                        onChange={house_numChangeHandler}
                        onBlur={house_numBlurHandler}
                        autoComplete="none"
                      />
                    </div>
                    {house_numInputIsInvalid && (
                      <div className={classes.invalid}>
                        <p>only alphabets '-' '/'</p>
                        <p> enter 3 to 7 characters</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={classes.f2}>
                <div className={classes.fieldContainer}>
                  <div className={classes.fields}>
                    <div className={classes.signupFormLabels}>
                      <label htmlFor="phone_num">Phone Number</label>
                    </div>
                    <input
                      type="number"
                      required={true}
                      placeholder="10 digit Mobile Number"
                      name="phone_num"
                      value={phone_num}
                      onChange={phone_numChangeHandler}
                      onBlur={phone_numBlurHandler}
                      autoComplete="none"
                    />
                  </div>
                  {phone_numInputIsInvalid && (
                    <div className={classes.invalid}>
                      <p>should be a valid number</p>
                    </div>
                  )}
                </div>
                <div className={classes.fieldContainer}>
                  <div className={classes.right}>
                    <div className={appliedClasses}>
                      <div className={classes.signupFormLabels}>
                        <label htmlFor="email">E-Mail</label>
                      </div>
                      <input required={true} disabled={true} value={email} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.f2}>
                <div className={classes.fieldContainer}>
                  <div className={classes.fields}>
                    <div className={classes.signupFormLabels}>
                      <label htmlFor="password">Password</label>
                    </div>
                    <input
                      type="password"
                      required={true}
                      placeholder="your old/new password"
                      name="password"
                      value={password}
                      onChange={passwordChangeHandler}
                      onBlur={passwordBlurHandler}
                      autoComplete="off"
                    />
                  </div>
                  {passwordInputIsInvalid && (
                    <div className={classes.invalid}>
                      <p>min-length: 6 max-length: 20</p>
                    </div>
                  )}
                </div>
                <div className={classes.fieldContainer}>
                  <div className={classes.right}>
                    <div className={appliedClasses}>
                      <div className={classes.signupFormLabels}>
                        <label htmlFor="confirm_password">
                          {" "}
                          Confirm Password
                        </label>
                      </div>
                      <input
                        type="password"
                        required={true}
                        placeholder="re-type your old/new password"
                        name="confirmpassword"
                        value={confirmPassword}
                        onChange={confirmPasswordChangeHandler}
                        onBlur={confirmPasswordBlurHandler}
                        autoComplete="off"
                      />
                    </div>
                    {confirmPasswordInputIsInvalid && (
                      <div className={classes.invalid}>
                        <p>passwords do not match</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {!loading && (
                <Button
                  type="submit"
                  disabled={!formIsValid}
                  onClick={updateProfileHandler}
                  className={classes.signupButton}
                >
                  Update Profile
                </Button>
              )}
              <div className={classes.footer}>
                <p>
                  Delete Profile{" "}
                  <span
                    className={classes.sLogin}
                    onClick={deleteProfileHandler}
                  >
                    This action can't be reversed
                  </span>
                </p>
              </div>
              <p className={classes.passwordinfo}>
                You must type your old or new password to update your profile
              </p>
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default UpdateProfile;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2MWUzZTlkMjk0ODk2MjUyZWYxNzk0In0sImlhdCI6MTY1MDU4MjUwNSwiZXhwIjoxNjUwOTQyNTA1fQ.qjNIiiWIyOGWAvIvXKh_qWojjtCt2O6nln3oQVNjHlI
