import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import classes from "./ViewHomePage.module.css";
import DisplayBox from "../UI/DisplayBox";
import { ActionActions } from "../../store/actionIndex";
import LoadingProfile from "../UserHomePage/LoadingProfile";
const ViewCampusIssues = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const campusIssues = useSelector((state) => state.actions.issues);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        console.log(345);
        const response = await axios.get("/api/user/issues");
        console.log(response);
        if (response.data.issues.msg) {
          dispatch(ActionActions.setIssues([]));
        } else {
          dispatch(ActionActions.setIssues(response.data.issues));
        }
        setLoading(false);
      } catch (e) {
        setLoading(true);
        if (e.response.status === 500) {
          history.replace("/api/complainmanager/internal-server-error");
        } else if (e.response.status == 401) {
          history.replace("/api/complain/manager/authorization-denied");
        }
      }
    }
    fetchData();
  }, []);

  return (
    <Fragment>
      <main className={classes.mainContent}>
        <div className={classes.subheading}>
          <p>All campus issues will be visible here</p>
        </div>
        <div className={classes.list}>
          {loading && <LoadingProfile />}
          {!loading && (
            <DisplayBox
              heading={"All issues will appear below"}
              noitemmsg={"No issues to show"}
              listitem={campusIssues}
              x={"issue"}
            />
          )}
        </div>
      </main>
    </Fragment>
  );
};
export default ViewCampusIssues;
