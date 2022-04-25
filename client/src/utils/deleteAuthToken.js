import axios from "axios";

const deleteAuthToken = (token) => {
  if (token) {
    console.log("token removed");
    delete axios.defaults.headers.common["x-auth-token"];
  }
};
export default deleteAuthToken;
