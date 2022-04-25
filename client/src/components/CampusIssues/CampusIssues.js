import { Fragment, useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DisplayBox from "../UI/DisplayBox";
import ControlButton from "../UI/ControlButton";
import { ActionActions } from "../../store/actionIndex";
import LoadingProfile from "../UserHomePage/LoadingProfile";

const CampusIssues = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const issues = useSelector((state) => state.action.issues);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await axios.get("/api/user/issues");
        setLoading(false);
        if (data.data.msg) {
          dispatch(ActionActions.setIssues([]));
        } else {
          const issueList = data.data.issues;
          dispatch(ActionActions.setIssues(issueList));
        }
      } catch (e) {
        setLoading(false);
        console.log(e);
        if (e.response.status === 500) {
          history.push("/api/user/internal-server-error");
        } else if (e.response.status === 401) {
          history.push("/api/user/authorization-denied");
        }
      }
    }
    fetchData();
  }, []);

  const deleteIssueHandler = async (id) => {
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
      } else if (e.response.status === 401) {
        history.push("/api/user/authorization-denied");
      }
    }
    history.push("/api/user/campus issues");
  };
  const addIssueHandler = () => {
    history.push("/api/user/campus issues/raise-a-new-issue");
  };

  return (
    <Fragment>
      {loading && <LoadingProfile />}
      {!loading && (
        <Switch>
          <Route path="/api/user/campus issues" exact>
            <ControlButton
              onClick={addIssueHandler}
              heading={"Raise a new campus issue"}
              info={"This issue will be visible to other users"}
            />
            <DisplayBox
              heading={"All issues will appear below"}
              noitemmsg={"No issues to show"}
              listitem={issues}
              x={"issue"}
              onDelete={deleteIssueHandler}
            />
          </Route>
        </Switch>
      )}
    </Fragment>
  );
};

export default CampusIssues;
