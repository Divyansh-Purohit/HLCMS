import { Fragment } from "react";
import Field from "../Field";
import classes from "./Subheader.module.css";
const Subheader = () => {
  const fields = [
    {
      id: 1,
      name: "Home",
      path: "/api/user/home",
    },
    {
      id: 2,
      name: "Profile",
      path: "/api/user/view profile",
    },
    {
      id: 3,
      name: "Announcements",
      path: "/api/user/announcements",
    },
    {
      id: 4,
      name: "Events",
      path: "/api/user/events",
    },
    {
      id: 5,
      name: "Gallery",
      path: "/api/user/gallery",
    },
    {
      id: 6,
      name: "Campus Issues",
      path: "/api/user/campus issues",
    },
    {
      id: 7,
      name: "Complains",
      path: "/api/user/complains",
    },
  ];
  const fieldChangeHandler = (fieldName) => {};
  return (
    <Fragment>
      <div className={classes.topbar}>
        {fields.map((field) => {
          return (
            <Field
              name={field.name}
              key={field.id}
              path={field.path}
              onClick={fieldChangeHandler.bind({ field })}
            />
          );
        })}
      </div>
    </Fragment>
  );
};

export default Subheader;
