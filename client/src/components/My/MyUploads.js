// import { Fragment, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
// import classes from "./style.module.css";
// import DisplayBox from "../UI/DisplayBox";
// import { ActionActions } from "../../store/actionIndex";
// import LoadingProfile from "../UserHomePage/LoadingProfile";

// const MyUploads = () => {
//   const history = useHistory();
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(null);
//   const myImagesList = useSelector((state) => state.action.images);

//   useEffect(() => {
//     async function fetchData() {
//       setLoading(true);
//       try {
//         const response = await axios.get("/api/user/myuploads");
//         setLoading(false);
//         if (response.data.msg) {
//           dispatch(ActionActions.setIssues([]));
//         } else {
//           dispatch(ActionActions.setIssues(response.data.myuploads));
//         }
//       } catch (e) {
//         setLoading(false);
//         console.log(e);
//         if (e.response.status === 500) {
//           history.push("/api/user/internal-server-error");
//         } else if (e.response.status === 400) {
//           history.push("/api/user/authorization-denied");
//         }
//       }
//     }
//     fetchData();
//   }, []);

//   const deleteImageHandler = async (id) => {
//     setLoading(true);
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const body = JSON.stringify({ id });
//       const response = await axios.post(
//         `/api/user/uploads/delete-an-image`,
//         body,
//         config
//       );
//       setLoading(false);
//       if (response.data.msg) {
//         dispatch(ActionActions.setUploads([]));
//       } else {
//         dispatch(ActionActions.setUploads(response.data.updatedimages));
//       }
//     } catch (e) {
//       setLoading(false);
//       console.log(e);
//       if (e.response.status === 500) {
//         history.push("/api/user/internal-server-error");
//       } else if (e.response.status === 400) {
//         history.push("/api/user/authorization-denied");
//       }
//     }
//     history.push("/api/user/myuploads");
//   };

//   const newImageCreator = () => {
//     history.push("/api/user/campus issues/add-a-new-image");
//   };
//   return (
//     <Fragment>
//       {loading && <LoadingProfile />}
//       {!loading && (
//         <Fragment>
//           <div className={classes.title}>
//             <p>My Uploads Page</p>
//           </div>
//           <div className={classes.newAnnbtn}>
//             <p onClick={newImageCreator}>Add an Image</p>
//           </div>
//           <DisplayBox
//             heading={"All images added by you will appear here"}
//             listitem={myImagesList}
//             noitemmsg={"You haven't added any images yet"}
//             x={"issue"}
//             onDelete={deleteImageHandler}
//           />
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default MyUploads;
