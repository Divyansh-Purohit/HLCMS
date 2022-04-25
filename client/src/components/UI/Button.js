import classes from "./Button.module.css";
const Button = (props) => {
  const appliedClasses = `${props.className} ${classes.btn}`;
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={appliedClasses}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
