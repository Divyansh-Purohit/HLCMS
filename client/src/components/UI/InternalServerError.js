import classes from "./ErrorPages.module.css";

const InternalServerError = () => {
  return (
    <div className={classes.box}>
      <div className={classes.content}>
        <h1>Internal Server Error</h1>
        <p>Something went wrong, try navigating to a different page</p>
      </div>
    </div>
  );
};

export default InternalServerError;
