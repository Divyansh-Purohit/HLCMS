import { NavLink } from "react-router-dom";
import classes from "./ViewHomePage.module.css";
const ComplainManagerSubHeader = () => {
  return (
    <div className={classes.subheader}>
      <p>
        <NavLink
          className={classes.li}
          activeClassName={classes.active}
          to="/api/complainmanager/update profile"
        >
          Profile
        </NavLink>
      </p>

      <p>
        <NavLink
          className={classes.li}
          activeClassName={classes.active}
          to="/api/complainmanager/view complains"
        >
          Complains
        </NavLink>
      </p>
      <p>
        <NavLink
          className={classes.li}
          activeClassName={classes.active}
          to="/api/complainmanager/view campus issues"
        >
          Campus Issues
        </NavLink>
      </p>
    </div>
  );
};

export default ComplainManagerSubHeader;
