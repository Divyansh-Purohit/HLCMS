import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import classes from "./AddNewCampusIssue.module.css";
import Button from "../UI/Button";
import { ActionActions } from "../../store/actionIndex";

const AddNewCampusIssue = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [postAnonymously, setPostAnonymously] = useState(false);
  const postAnonymouslyIsValid = postAnonymously !== "";
  const typeChangeHandler = (event) => {
    setPostAnonymously(event.target.value);
  };

  const [subject, setSubject] = useState("");
  const subjectIsValid = subject.trim() !== "";
  const subjectChangeHandler = (event) => {
    setSubject(event.target.value);
  };

  const [description, setDescription] = useState("");
  const descriptionIsValid = description.trim() !== "0";
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const formIsValid =
    subjectIsValid && descriptionIsValid && postAnonymouslyIsValid;

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    } else {
      const newissue = { subject, description, postAnonymously };
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const body = JSON.stringify(newissue);
        setSubject("");
        setDescription("");
        const response = await axios.post(
          "/api/user/issues/raise-a-new-issue",
          body,
          config
        );
        dispatch(ActionActions.setIssues(response.data.updatedissues));
      } catch (e) {
        if (e.response.status === 500) {
          history.push("/api/user/internal-server-error");
        } else if (e.response.status === 404) {
          history.push("/api/user/authorization-denied");
        }
      }
      history.push("/api/user/campus issues");
    }
  };
  return (
    <Fragment>
      <div className={classes.addNewIssueContainer}>
        <form onSubmit={formSubmitHandler} noValidate={true}>
          <div className={classes.header}>
            <p>Raise a new issue</p>
          </div>

          <div className={classes.mainContent}>
            <div className={classes.fields}>
              <label htmlFor="type">Raise Anonymously</label>
              <select
                name="postAnonymously"
                className={classes.selectinput}
                value={postAnonymously}
                placeholder={"Select"}
                onChange={typeChangeHandler}
              >
                {/* <option value={"0"}>
                  Select how you want to raise this issue
                </option> */}
                <option value={true}>As anonymous user</option>
                <option value={false}>With your username</option>
              </select>
            </div>
            <div className={classes.fields}>
              <label htmlFor="type">Subject</label>
              <input
                className={classes.subject}
                type={"text"}
                required={true}
                name={"subject"}
                placeholder={"This field can't be left blank"}
                value={subject}
                onChange={subjectChangeHandler}
              />
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
            <p>Raising issue anonymously keeps your username hidden</p>
            <p>This issue will be visible to other users</p>
            <Button
              disabled={!formIsValid}
              onClick={formSubmitHandler}
              type="submit"
              className={classes.btn}
            >
              Raise Issue
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AddNewCampusIssue;
