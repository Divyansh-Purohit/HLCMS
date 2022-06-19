import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ActionActions } from "../../store/actionIndex";
import classes from "./ViewHomePage.module.css";
const ViewHomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userComplains = useSelector((state) => state.action.complains);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(
          "/api/user/complainsmanager/complains"
        );
        setLoading(false);
        if (response.msg) {
          dispatch(ActionActions.setComplains([]));
        } else {
          console.log(response);
          dispatch(ActionActions.setComplains(response.data.complains));
        }
      } catch (e) {
        console.log(e);
        // if (e.response.status === 500) {
        //   history.push("/api/complainmanager/internal-server-error");
        // } else if (e.response.status === 401) {
        //   history.push("/api/complainmanager/authorization-denied");
        // }
      }
    }
    fetchData();
  }, []);

  return (
    <Fragment>
      <main className={classes.mainContent}>
        <div className={classes.subheading}>
          <p>All complains will be visible here</p>
        </div>
        <div className={classes.list}></div>
      </main>
    </Fragment>
  );
};
export default ViewHomePage;
