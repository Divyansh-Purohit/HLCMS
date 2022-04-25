import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import classes from "./style.module.css";
import DisplayBox from "../UI/DisplayBox";
import { ActionActions } from "../../store/actionIndex";
import LoadingProfile from "../UserHomePage/LoadingProfile";

const MyEvents = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(null);
  const myEventsList = useSelector((state) => state.action.events);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get("/api/user/myevents");
        setLoading(false);
        if (response.data.msg) {
          dispatch(ActionActions.setEvents([]));
        } else {
          dispatch(ActionActions.setEvents(response.data.myevents));
        }
      } catch (e) {
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

  const deleteEventsHandler = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `/api/user/myevents/delete-an-event/${id}`
      );
      setLoading(false);
      if (response.data.msg) {
        dispatch(ActionActions.setEvents([]));
      } else {
        dispatch(ActionActions.setEvents(response.data.updatedevents));
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
    history.push("/api/user/myevents");
  };

  const newEventCreator = () => {
    history.push("/api/user/events/add-a-new-event");
  };

  return (
    <Fragment>
      {loading && <LoadingProfile />}
      {!loading && (
        <Fragment>
          <div className={classes.title}>
            <p>My Events Page</p>
          </div>
          <div className={classes.newAnnbtn}>
            <p onClick={newEventCreator}>Add an Event</p>
          </div>
          <DisplayBox
            heading={"All events added by you will appear here"}
            listitem={myEventsList}
            noitemmsg={"You haven't added any event yet"}
            x={"event"}
            onDelete={deleteEventsHandler}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyEvents;
