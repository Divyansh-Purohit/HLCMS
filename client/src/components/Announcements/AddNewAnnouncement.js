import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "../UI/Button";
import classes from "./AddNewAnnouncement.module.css";
import axios from "axios";
import LoadingProfile from "../UserHomePage/LoadingProfile";
import { ActionActions } from "../../store/actionIndex";

const AddNewAnnouncement = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(null);

  const [subject, setSubject] = useState("");
  const subjectIsValid = subject.trim() !== "";
  const subjectChangeHandler = (event) => {
    setSubject(event.target.value);
  };

  const [description, setDescription] = useState("");
  const descriptionIsValid = description.trim() !== "";
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const formIsValid = subjectIsValid && descriptionIsValid;

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!formIsValid) {
      return;
    } else {
      const newannouncement = { subject, description };
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const body = JSON.stringify(newannouncement);
        const announcementList = await axios.post(
          "/api/user/announcements/post-a-new-announcement",
          body,
          config
        );
        console.log(announcementList);
        dispatch(ActionActions.setAnnouncements(announcementList));
        setLoading(false);
        setSubject("");
        setDescription("");
      } catch (err) {
        setLoading(false);
        if (err.response.status === 500) {
          history.push("/api/user/internal-server-error");
        }
        console.log(err);
      }
      history.push("/api/user/announcements");
    }
  };

  return (
    <Fragment>
      {loading && <LoadingProfile />}
      {!loading && (
        <div className={classes.addNewAnnouncementContainer}>
          <form onSubmit={formSubmitHandler} noValidate={true}>
            <div className={classes.header}>
              <p>Post a new announcement</p>
            </div>
            <div className={classes.mainContent}>
              <div className={classes.fields}>
                <label htmlFor="subject">Subject</label>
                <input
                  className={classes.subject}
                  type={"text"}
                  required={true}
                  name={"subject"}
                  placeholder={"This field can't be left blank"}
                  value={subject}
                  onChange={subjectChangeHandler}
                ></input>
              </div>
              <div className={classes.fields}>
                <label htmlFor="desc">Description</label>
                <textarea
                  rows="5"
                  cols="70"
                  required={true}
                  placeholder={"This field can't be left blank"}
                  value={description}
                  onChange={descriptionChangeHandler}
                />
              </div>
            </div>
            <div className={classes.footer}>
              <p>Your username will be recorded</p>
              <Button
                disabled={!formIsValid}
                onClick={formSubmitHandler}
                type="submit"
                className={classes.btn}
              >
                Post Announcement
              </Button>
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
};
export default AddNewAnnouncement;
