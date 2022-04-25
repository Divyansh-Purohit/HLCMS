import { Fragment } from "react";
import classes from "./DisplayBox.module.css";
import Moment from "react-moment";
import Button from "./Button";
import { Avatar } from "@mui/material";

const ListItem = (props) => {
  const userid = localStorage.getItem("userid");
  const deleteItemHandler = () => {
    props.onDelete(props.id);
  };

  const appliedClasses =
    props.x === "complain"
      ? `${classes.deleteBoxx}`
      : props.x === "event"
      ? `${classes.deleteBox}`
      : `${classes.deleteBoxxx}`;

  return (
    <Fragment>
      <div className={classes.itemBox}>
        <div className={classes.headerBox}>
          <div className={classes.userDataBox}>
            <div className={classes.avatarBox}>
              <Avatar src={props.avatar} alt={""} />
            </div>
            <div className={classes.usernameBox}>
              {props.x === "event" && <p>Added by {props.username}</p>}
              {props.x === "announcement" && <p>Posted by {props.username}</p>}
              {props.x === "issue" && <p>Raised by {props.username}</p>}
            </div>
          </div>
          <div className={classes.postedOn}>
            <p>Posted On</p>
            <div className={classes.postedOnContent}>
              <p>
                <Moment format={`DD MMM, YYYY`}>{props.date}</Moment>
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className={classes.mainContentBox}>
          <div className={classes.infoContainer}>
            {props.subject !== null && (
              <div className={classes.subject}>
                <p>Subject: {props.subject}</p>
              </div>
            )}
            {props.type !== null && (
              <div className={classes.subject}>
                <p>Type: {props.type}</p>
              </div>
            )}
            {props.house_num !== null && (
              <div className={classes.subject}>
                <p>House number: {props.house_num}</p>
              </div>
            )}
            {props.scheduledOn !== null && (
              <div className={classes.scheduledOnBox}>
                <p>
                  Scheduled on:{" "}
                  {/* <Moment format={`DD MM YYYY`}>{props.scheduledOn}</Moment> */}
                  {props.scheduledOn}
                </p>
              </div>
            )}
          </div>
          {props.userId === userid && (
            <div
              className={
                // props.x === "complain" ? classes.deleteBoxx : classes.deleteBox
                appliedClasses
              }
            >
              <Button
                type="button"
                onClick={deleteItemHandler}
                className={classes.btn}
              >
                Delete
              </Button>
            </div>
          )}
          <div className={classes.descriptionContainer}>
            <p className={classes.description}>Description</p>
            <div className={classes.descriptionBox}>{props.description}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ListItem;
