import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DisplayBox from "../UI/DisplayBox";
import LoadingProfile from "../UserHomePage/LoadingProfile";
import { ActionActions } from "../../store/actionIndex";
import classes from "./style.module.css";

const MyAnnouncements = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(null);
  const myAnnouncementsList = useSelector(
    (state) => state.action.announcements
  );

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get("/api/user/myannouncements");
        setLoading(false);
        if (response.data.msg) {
          dispatch(ActionActions.setAnnouncements([]));
        } else {
          dispatch(
            ActionActions.setAnnouncements(response.data.myannouncements)
          );
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

  const deleteAnnouncementsHandler = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `/api/user/myannouncements/delete-an-announcements/${id}`
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
      } else if (e.response.status === 400) {
        history.push("/api/user/authorization-denied");
      }
    }
    history.push("/api/user/myannouncements");
  };

  const newAnnouncementCreator = () => {
    history.push("/api/user/announcement/post-a-new-announcement");
  };

  return (
    <Fragment>
      {loading && <LoadingProfile />}
      {!loading && (
        <Fragment>
          <div className={classes.title}>
            <p>My Announcements Page</p>
          </div>
          <div className={classes.newAnnbtn}>
            <p onClick={newAnnouncementCreator}>Post an Announcement</p>
          </div>
          <DisplayBox
            heading={"All announcements posted by you will appear here"}
            listitem={myAnnouncementsList}
            noitemmsg={"You haven't posted any announcement yet"}
            x={"announcement"}
            onDelete={deleteAnnouncementsHandler}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyAnnouncements;
