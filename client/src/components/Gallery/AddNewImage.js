// import { Fragment, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import Button from "../UI/Button";
// import classes from "./AddNewImage.module.css";
// import axios from "axios";
// import LoadingProfile from "../UserHomePage/LoadingProfile";
// import { ActionActions } from "../../store/actionIndex";

// const AddNewImage = () => {
//   const history = useHistory();
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(null);

//   const [image, setImage] = useState(null);
//   const imageIsValid = image != null;
//   const imageChangeHandler = (event) => {
//     setImage(event.target.files[0]);
//   };

//   const formIsValid = imageIsValid;

//   const formSubmitHandler = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     if (!formIsValid) {
//       return;
//     } else {
//       const newImage = {};
//       try {
//         const config = {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         };
//         const body = JSON.stringify(newImage);
//         const galleryList = await axios.post(
//           "/api/user/uploads/add-a-new-image",
//           body,
//           config
//         );
//         dispatch(ActionActions.setGallery(galleryList));
//         setLoading(false);
//         setImage(null);
//       } catch (err) {
//         setLoading(false);
//         if (err.response.status === 500) {
//           history.push("/api/user/internal-server-error");
//         }
//         console.log(err);
//       }
//       history.push("/api/user/uploads");
//     }
//   };

//   return (
//     <Fragment>
//       {loading && <LoadingProfile />}
//       {!loading && (
//         <div className={classes.addNewAnnouncementContainer}>
//           <form onSubmit={formSubmitHandler} noValidate={true}>
//             <div className={classes.header}>
//               <p>Add a new Image</p>
//             </div>
//             <div className={classes.mainContent}>
//               <div className={classes.fields}>
//                 <label htmlFor="image">Select Image</label>
//               </div>
//             </div>
//             <div className={classes.footer}>
//               <p>Your username will be recorded</p>
//               <Button
//                 disabled={!formIsValid}
//                 onClick={formSubmitHandler}
//                 type="submit"
//                 className={classes.btn}
//               >
//                 Add Image
//               </Button>
//             </div>
//           </form>
//         </div>
//       )}
//     </Fragment>
//   );
// };
// export default AddNewImage;
