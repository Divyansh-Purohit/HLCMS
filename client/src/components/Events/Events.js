import { Fragment, useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DisplayBox from "../UI/DisplayBox";
import ControlButton from "../UI/ControlButton";
import LoadingProfile from "../UserHomePage/LoadingProfile";
import { ActionActions } from "../../store/actionIndex";
const Events = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.action.events);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get("/api/user/events");
        setLoading(false);
        if (response.data.msg) {
          dispatch(ActionActions.setEvents([]));
        } else {
          dispatch(ActionActions.setEvents(response.data.events));
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

  const deleteEventHandler = async (id) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ id });
      const response = await axios.post(
        `/api/user/myevents/delete-an-event`,
        body,
        config
      );
      setLoading(false);
      if (response.data.msg) {
        dispatch(ActionActions.setEvents([]));
      } else {
        dispatch(ActionActions.setEvents(response.data.updatedevents));
      }
    } catch (e) {
      console.log(e);
      if (e.response.status === 500) {
        history.push("/api/user/internal-server-error");
      } else if (e.response.status === 401) {
        history.push("/api/user/authorization-denied");
      }
    }
  };

  const addNewEventHandler = () => {
    history.push("/api/user/events/add-a-new-event");
  };

  return (
    <Fragment>
      {loading && <LoadingProfile />}
      {!loading && (
        <Switch>
          <Route path="/api/user/events" exact>
            <ControlButton
              onClick={addNewEventHandler}
              heading={"Add a new event"}
              info={"This event will be visible to other users"}
            />
            <DisplayBox
              heading={"All events will appear below"}
              noitemmsg={"No events to show"}
              listitem={events}
              x={"event"}
              onDelete={deleteEventHandler}
            />
          </Route>
        </Switch>
      )}
    </Fragment>
  );
};

export default Events;
