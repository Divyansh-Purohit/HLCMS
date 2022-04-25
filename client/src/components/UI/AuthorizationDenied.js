import classes from "./ErrorPages.module.css";

const AuthorizationDenied = () => {
  return (
    <div className={classes.box}>
      <div className={classes.content}>
        <h1>Authorization Denied</h1>
        <p>You can't access the page</p>
      </div>
    </div>
  );
};

export default AuthorizationDenied;
