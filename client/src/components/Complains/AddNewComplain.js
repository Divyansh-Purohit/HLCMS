import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Button from "../UI/Button";
import classes from "./AddNewComplain.module.css";
import { ActionActions } from "../../store/actionIndex";
import LoadingProfile from "../UserHomePage/LoadingProfile";

const AddNewComplain = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(null);

  const [type, setType] = useState("");
  const typeIsValid = type !== "";
  const typeChangeHandler = (event) => {
    setType(event.target.value);
  };
  const [description, setDescription] = useState("");
  const descriptionIsValid = description.trim() !== "";
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };
  const updateProfileHandler = () => {
    history.replace("/api/user/view profile");
  };
  const formIsValid = typeIsValid && descriptionIsValid;

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    const newComplain = {
      type,
      description,
      house_num: localStorage.getItem("house_num"),
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(newComplain);
      const response = await axios.post(
        "/api/user/mycomplains/file-a-new-complain",
        body,
        config
      );
      dispatch(ActionActions.setComplains(response.data.updatedcomplains));
      setLoading(false);
      setType("");
      setDescription("");
    } catch (e) {
      setLoading(false);
      console.log(e);
      if (e.response.status === 500) {
        history.push("/api/user/internal-server-error");
      } else if (e.response.status === 404) {
        history.push("/api/user/authorization-denied");
      }
    }
    history.push("/api/user/complains");
  };

  return (
    <Fragment>
      {loading && <LoadingProfile />}
      {!loading && (
        <Fragment>
          <div className={classes.addNewComplainContainer}>
            <form onSubmit={formSubmitHandler}>
              <div className={classes.header}>
                <p>Add a new complain</p>
              </div>
              <div className={classes.mainContent}>
                <div className={classes.fields}>
                  <label htmlFor="type">Select Type</label>
                  <select
                    name={"type"}
                    className={classes.selectinput}
                    value={type}
                    placeholder={"Select Type"}
                    onChange={typeChangeHandler}
                  >
                    <option value="">Select type of complain</option>
                    <option value={"Plumber"}>Plumbing Related</option>
                    <option value={"Carpenter"}>Wooden Repair</option>
                    <option value={"Electrician"}>Electrical Repair</option>
                    <option value={"Mason"}>Cement Work</option>
                    <option value={"Misc"}>Miscelleaneous</option>
                  </select>
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
                <p>Date and time of filing this complain will be recorded</p>
                <p>This complain will not be visible to other users</p>
                <Button
                  type="submit"
                  disabled={!formIsValid}
                  className={classes.btn}
                >
                  Add Complain
                </Button>
              </div>
            </form>
          </div>
          <div onClick={updateProfileHandler} className={classes.check}>
            <p>
              Your house number:{"   "}
              <span>{localStorage.getItem("house_num")}</span>
              {"  "}click to update
            </p>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AddNewComplain;
