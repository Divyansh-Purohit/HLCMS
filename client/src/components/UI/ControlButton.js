import classes from "./ControlButton.module.css";
const ControlButton = (props) => {
  return (
    <div className={classes.addNew} onClick={props.onClick}>
      <p className={classes.control}>{props.heading}</p>
      <p className={classes.info}>{props.info}</p>
    </div>
  );
};
export default ControlButton;
