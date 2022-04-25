import classes from "./ErrorPages.module.css";

const InternalServerError = () => {
  return (
    <div className={classes.box}>
      <div className={classes.content}>
        <h1>Page Not Found</h1>
        <p>The page you're looking for could not be found</p>
      </div>
    </div>
  );
};

export default InternalServerError;
