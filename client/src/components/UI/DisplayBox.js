import { Fragment } from "react";
import ListItem from "./ListItem";
import Card from "./Card/Card";
import classes from "./DisplayBox.module.css";

const DisplayBox = (props) => {
  const deleteItemHandler = (id) => {
    props.onDelete(id);
  };
  return (
    <Fragment>
      <div className={classes.displayBox}>
        <div className={classes.header}>
          <p>{props.heading}</p>
        </div>
        <div className={classes.mainContent}>
          {props.listitem.length === 0 && <Card content={props.noitemmsg} />}
          {props.listitem.length !== 0 && (
            <Fragment>
              {props.listitem.map((lit) => {
                return (
                  <ListItem
                    key={lit._id}
                    id={lit._id}
                    avatar={lit.avatar}
                    house_num={lit.house_num ? lit.house_num : null}
                    username={lit.username}
                    date={lit.date}
                    userId={lit.user}
                    type={lit.type ? lit.type : null}
                    subject={lit.subject ? lit.subject : null}
                    scheduledOn={lit.scheduledfor ? lit.scheduledfor : null}
                    description={lit.description}
                    x={props.x}
                    onDelete={deleteItemHandler}
                  />
                );
              })}
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default DisplayBox;
