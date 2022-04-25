import { Fragment } from "react";
import classes from "./DisplayBox.module.css";
const ErrorBox = (props) => {
  const appliedClasses = `${props.className} ${classes.errorBox}`;
  return (
    <Fragment>
      <div className={classes.appliedClasses}>
        <p>{props.errorMsg}</p>
      </div>
    </Fragment>
  );
};

export default ErrorBox;
