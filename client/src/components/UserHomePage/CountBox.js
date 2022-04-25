import { Fragment } from "react";
import classes from "./UserHomePage.module.css";
const CountBox = (props) => {
  return (
    <Fragment>
      <div className={classes.countBox}>
        <p>{props.data}</p>
      </div>
    </Fragment>
  );
};
export default CountBox;
