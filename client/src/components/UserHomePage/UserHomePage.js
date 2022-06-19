import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import CountBox from "./CountBox";
import LoadingProfile from "./LoadingProfile.js";
import classes from "./UserHomePage.module.css";

const UserHomePage = () => {
  const [username, setUsername] = useState("");
  const [countAnnouncements, setCountAnnouncements] = useState(0);
  const [countEvents, setCountEvents] = useState(0);
  const [countIssues, setCountIssues] = useState(0);
  const [countComplains, setCountComplains] = useState(0);
  const [loading, setLoading] = useState(null);
  useEffect(() => {
    async function fetchdata() {
      setLoading(true);
      try {
        const response = await axios.get("/api/user/home");
        setLoading(false);
        const { countannouncements, countevents, countissues, countComplains } =
          response.data;
        setUsername(response.data.user.username);
        setCountAnnouncements(countannouncements);
        setCountEvents(countevents);
        setCountComplains(countComplains);
        setCountIssues(countissues);
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) {
          history.push("/api/user/authorization-denied");
        } else if (err.response.status === 500) {
          history.push("/api/user/internal-server-error");
        }
        setLoading(false);
        console.log(err.response.data);
      }
    }
    fetchdata();
  }, []);
  const history = useHistory();
  const myAnnouncementsHandler = () => {
    history.push("/api/user/myAnnouncements");
  };
  const myEventsHandler = () => {
    history.push("/api/user/myEvents");
  };
  const myComplainsHandler = () => {
    history.push("/api/user/complains");
  };
  const myIssuesHandler = () => {
    history.push("/api/user/myIssues");
  };

  return (
    <Fragment>
      {loading && <LoadingProfile />}
      {!loading && (
        <Fragment>
          <div className={classes.title_x}>
            <p>Welcome, {username}</p>
          </div>
          <div className={classes.gridBox}>
            <div className={classes.my_}>
              <p className={classes.title}>My Announcements</p>
              <CountBox data={countAnnouncements} />
              <div
                className={classes.mainContent}
                onClick={myAnnouncementsHandler}
              >
                <p>Click to see all announcements made by you.</p>
              </div>
            </div>
            <div className={classes.my_}>
              <p className={classes.title}>My Events</p>
              <CountBox data={countEvents} />
              <div className={classes.mainContent} onClick={myEventsHandler}>
                <p>Click to see events all events hosted by you.</p>
              </div>
            </div>
            <div className={classes.my_}>
              <p className={classes.title}>My Issues</p>
              <CountBox data={countIssues} />
              <div className={classes.mainContent} onClick={myIssuesHandler}>
                <p>Click to see all issues raised by you.</p>
              </div>
            </div>
            <div className={classes.my_}>
              <p className={classes.title}>My Complains</p>
              <CountBox data={countComplains} />
              <div className={classes.mainContent} onClick={myComplainsHandler}>
                <p>Click to see all complains filed by you.</p>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserHomePage;
