import { Fragment, useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DisplayBox from "../UI/DisplayBox";
import ControlButton from "../UI/ControlButton";
import { ActionActions } from "../../store/actionIndex";
import LoadingProfile from "../UserHomePage/LoadingProfile";

const Complains = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const myComplainsList = useSelector((state) => state.action.complains);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get("/api/user/mycomplains");
        setLoading(false);
        if (response.data.msg) {
          dispatch(ActionActions.setComplains([]));
        } else {
          dispatch(ActionActions.setComplains(response.data.mycomplains));
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

  const deleteComplainHandler = async (id) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ id });
      const response = await axios.post(
        `/api/user/mycomplains/delete-a-complain/`,
        body,
        config
      );
      setLoading(false);
      if (response.data.msg) {
        dispatch(ActionActions.setComplains([]));
      } else {
        dispatch(ActionActions.setComplains(response.data.complains));
      }
    } catch (e) {
      console.log(e);
      if (e.response.status === 500) {
        history.push("/api/user/internal-server-error");
      } else if (e.response.status === 400) {
        history.push("/api/user/authorization-denied");
      }
    }
    history.push("/api/user/complains");
  };

  const addComplainHandler = () => {
    history.push("/api/user/complains/file-a-new-complain");
  };

  return (
    <Fragment>
      {loading && <LoadingProfile />}
      {!loading && (
        <Switch>
          <Route path="/api/user/complains" exact>
            <ControlButton
              onClick={addComplainHandler}
              heading={"File a new complain"}
              info={"This complain will not be visible to other users"}
            />
            <DisplayBox
              heading={"All complains filed by you will appear below"}
              noitemmsg={"No complains to show"}
              listitem={myComplainsList}
              x={"complain"}
              onDelete={deleteComplainHandler}
            />
          </Route>
        </Switch>
      )}
    </Fragment>
  );
};

export default Complains;
