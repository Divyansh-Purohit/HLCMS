import { NavLink } from "react-router-dom";
import classes from "./Field.module.css";
const Field = (props) => {
  return (
    <div className={classes.fieldContent}>
      <NavLink
        to={props.path}
        activeClassName={classes.active}
        onClick={props.onClick}
        className={classes.navlink}
      >
        {props.name}
      </NavLink>
    </div>
  );
};

export default Field;
