import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import classes from "./style.module.css";
import DisplayBox from "../UI/DisplayBox";
import { ActionActions } from "../../store/actionIndex";
import LoadingProfile from "../UserHomePage/LoadingProfile";

const MyIssues = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(null);
  const myIssuesList = useSelector((state) => state.action.issues);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get("/api/user/myissues");
        setLoading(false);
        if (response.data.msg) {
          dispatch(ActionActions.setIssues([]));
        } else {
          dispatch(ActionActions.setIssues(response.data.myissues));
        }
      } catch (e) {
        setLoading(false);
        console.log(e);
        if (e.response.status === 500) {
          history.push("/api/user/internal-server-error");
        } else if (e.response.status === 400) {
          history.push("/api/user/authorization-denied");
        }
      }
    }
    fetchData();
  }, []);

  const deleteIssuesHandler = async (id) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ id });
      const response = await axios.post(
        `/api/user/issues/delete-an-issue`,
        body,
        config
      );
      setLoading(false);
      if (response.data.msg) {
        dispatch(ActionActions.setIssues([]));
      } else {
        dispatch(ActionActions.setIssues(response.data.updatedissues));
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
      if (e.response.status === 500) {
        history.push("/api/user/internal-server-error");
      } else if (e.response.status === 400) {
        history.push("/api/user/authorization-denied");
      }
    }
    history.push("/api/user/myissues");
  };

  const newIssueCreator = () => {
    history.push("/api/user/campus issues/raise-a-new-issue");
  };
  return (
    <Fragment>
      {loading && <LoadingProfile />}
      {!loading && (
        <Fragment>
          <div className={classes.title}>
            <p>My Issues Page</p>
          </div>
          <div className={classes.newAnnbtn}>
            <p onClick={newIssueCreator}>Raise an Issue</p>
          </div>
          <DisplayBox
            heading={"All issues raised by you will appear here"}
            listitem={myIssuesList}
            noitemmsg={"You haven't raised any issue yet"}
            x={"issue"}
            onDelete={deleteIssuesHandler}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyIssues;
