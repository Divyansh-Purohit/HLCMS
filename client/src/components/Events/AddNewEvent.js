import { Fragment, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "../UI/Button";
import classes from "./AddNewEvent.module.css";
import { ActionActions } from "../../store/actionIndex";
import LoadingProfile from "../UserHomePage/LoadingProfile";

const AddNewEvent = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(null);

  const [type, setType] = useState("");
  const typeIsValid = type.trim() !== "";
  const typeChangeHandler = (event) => {
    setType(event.target.value);
  };
  const [description, setDescription] = useState("");
  const descriptionIsValid = description.trim() !== "";
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const [date, setDate] = useState("");
  const dateIsValid = date.trim() !== "";
  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };

  const formIsValid = typeIsValid && descriptionIsValid && dateIsValid;

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    const newEvent = {
      scheduledfor: date,
      type,
      description,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(newEvent);
      const response = await axios.post(
        "/api/user/events/add-a-new-event",
        body,
        config
      );
      dispatch(ActionActions.setEvents(response.data.updatedevents));
      setLoading(false);
      setType("");
      setDate("");
      setDescription("");
    } catch (e) {
      setLoading(false);
      if (e.response.status === 500) {
        history.push("/api/user/internal-server-error");
      }
      console.log(e);
    }
    history.push("/api/user/events");
  };
  return (
    <Fragment>
      {loading && <LoadingProfile />}
      {!loading && (
        <div className={classes.addNewEventContainer}>
          <div className={classes.header}>
            <p>Add a new event</p>
          </div>
          <form onSubmit={formSubmitHandler} noValidate={false}>
            <div className={classes.mainContent}>
              <div className={classes.flexdisplay}>
                <div className={classes.fields}>
                  <label htmlFor="type">Event Type</label>
                  <input
                    type={"text"}
                    required={true}
                    placeholder={"Type of event"}
                    name="type"
                    value={type}
                    onChange={typeChangeHandler}
                  ></input>
                </div>
                <div className={classes.fields}>
                  <label htmlFor="date">Scheduled On</label>
                  <input
                    type={"text"}
                    required={true}
                    name="date"
                    value={date}
                    placeholder={"DD/MM/YYYY"}
                    onChange={dateChangeHandler}
                  ></input>
                </div>
              </div>
              <div className={classes.fields_bottom}>
                <label htmlFor="desc">Description</label>
                <textarea
                  rows="5"
                  // cols="87"
                  cols="95"
                  required={true}
                  placeholder={"This field can't be left blank"}
                  name="description"
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
                Add Event
              </Button>
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default AddNewEvent;
