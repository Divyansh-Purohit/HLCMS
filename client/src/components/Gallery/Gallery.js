// import { Fragment, useState, useEffect } from "react";
// import { Route, Switch, useHistory } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
// import DisplayBox from "../UI/DisplayBox";
// import ControlButton from "../UI/ControlButton";
// import { ActionActions } from "../../store/actionIndex";
// import LoadingProfile from "../UserHomePage/LoadingProfile";

// const Gallery = () => {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const gallery = useSelector((state) => state.action.gallery);
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     async function fetchData() {
//       setLoading(true);
//       try {
//         const response = await axios.get("/api/user/uploads");
//         setLoading(false);
//         if (response.data.msg) {
//           dispatch(ActionActions.setGallery([]));
//         } else {
//           dispatch(ActionActions.setGallery(response.data.gallery));
//         }
//       } catch (e) {
//         setLoading(false);
//         console.log(e);
//         if (e.response.status === 500) {
//           history.push("/api/user/internal-server-error");
//         } else if (e.response.status === 401) {
//           history.push("/api/user/authorization-denied");
//         }
//       }
//     }
//     fetchData();
//   }, []);

//   const deleteGalleryHandler = async (id) => {
//     setLoading(true);
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const body = JSON.stringify({ id });
//       const response = await axios.post(
//         `/api/user/myannouncements/delete-an-image`,
//         body,
//         config
//       );
//       setLoading(false);
//       if (response.data.msg) {
//         dispatch(ActionActions.setGallery([]));
//       } else {
//         dispatch(ActionActions.setGallery(response.data.updatedgallery));
//       }
//     } catch (e) {
//       setLoading(false);
//       console.log(e);
//       if (e.response.status === 500) {
//         history.push("/api/user/internal-server-error");
//       } else if (e.response.status === 401) {
//         history.push("/api/user/authorization-denied");
//       }
//     }
//     history.push("/api/user/uploads");
//   };

//   const addGalleryHandler = () => {
//     history.push("/api/user/gallery/post-a-new-image");
//   };

//   return (
//     <Fragment>
//       {loading && <LoadingProfile />}
//       {!loading && (
//         <Switch>
//           <Route path="/api/user/uploads" exact>
//             <ControlButton
//               onClick={addGalleryHandler}
//               heading={"Post a new Image"}
//               info={"This image will be visible to other users"}
//             />
//             <DisplayBox
//               heading={"All Images will appear below"}
//               noitemmsg={"No Images to show"}
//               listitem={gallery}
//               x={"images"}
//               onDelete={deleteGalleryHandler}
//             />
//           </Route>
//         </Switch>
//       )}
//     </Fragment>
//   );
// };

// export default Gallery;
