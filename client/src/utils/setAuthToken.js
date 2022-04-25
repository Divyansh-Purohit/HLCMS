import axios from "axios";

// if x-auth-token is present, all req headers get that token,
// else the token is deleted from all req headers
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
    console.log("token added with every request");
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};
export default setAuthToken;
// send token with every request
