import classes from "./UserHomePage.module.css";

const LoadingProfile = () => {
  return (
    <div className={classes.box}>
      <div className={classes.content}>
        <h1>Loading</h1>
        <p>It may take a few seconds. Try refreshing the page</p>
      </div>
    </div>
  );
};

export default LoadingProfile;
