import { Fragment, useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import DisplayBox from "../UI/DisplayBox";
import ControlButton from "../UI/ControlButton";
import { ActionActions } from "../../store/actionIndex";
import LoadingProfile from "../UserHomePage/LoadingProfile";

const Announcements = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const announcements = useSelector((state) => state.action.announcements);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get("/api/user/announcements");
        setLoading(false);
        if (response.data.msg) {
          dispatch(ActionActions.setAnnouncements([]));
        } else {
          dispatch(ActionActions.setAnnouncements(response.data.announcements));
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

  const deleteAnnouncementsHandler = async (id) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ id });
      const response = await axios.post(
        `/api/user/myannouncements/delete-an-announcement`,
        body,
        config
      );
      setLoading(false);
      if (response.data.msg) {
        dispatch(ActionActions.setAnnouncements([]));
      } else {
        dispatch(
          ActionActions.setAnnouncements(response.data.updatedannouncements)
        );
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
    history.push("/api/user/announcements");
  };

  const addAnnouncementHandler = () => {
    history.push("/api/user/announcements/post-a-new-announcement");
  };

  return (
    <Fragment>
      {loading && <LoadingProfile />}
      {!loading && (
        <Switch>
          <Route path="/api/user/announcements" exact>
            <ControlButton
              onClick={addAnnouncementHandler}
              heading={"Post a new announcment"}
              info={"This announcement will be visible to other users"}
            />
            <DisplayBox
              heading={"All announcements will appear below"}
              noitemmsg={"No announcements to show"}
              listitem={announcements}
              x={"announcement"}
              onDelete={deleteAnnouncementsHandler}
            />
          </Route>
        </Switch>
      )}
    </Fragment>
  );
};

export default Announcements;
