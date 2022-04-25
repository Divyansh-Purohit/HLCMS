import classes from "./Card.module.css";
const Card = (props) => {
  return (
    <div className={classes.empty}>
      <p>{props.content}</p>
    </div>
  );
};

export default Card;
