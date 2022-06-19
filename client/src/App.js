// "mongodburi": "mongodb+srv://Divyansh:Siddharth%401993@cluster0.vwqkn.mongodb.net/hlwracms2.0?retryWrites=true&w=majority",
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header/Header.js";
import Subheader from "./components/SubHeader/Subheader";
import LoginForm from "./components/Login/LoginForm";
import SignupForm from "./components/Signup/SignupForm";
import UserHomePage from "./components/UserHomePage/UserHomePage";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import Announcements from "./components/Announcements/Announcements";
import Events from "./components/Events/Events";
import Complains from "./components/Complains/Complains";
import CampusIssues from "./components/CampusIssues/CampusIssues";
import MyAnnouncements from "./components/My/MyAnnouncements";
import MyEvents from "./components/My/MyEvents";
import MyIssues from "./components/My/MyIssues";
import setAuthToken from "./utils/setAuthToken";
import InternalServerError from "./components/UI/InternalServerError";
import PageNotFound from "./components/UI/PageNotFound";
import AuthorizationDenied from "./components/UI/AuthorizationDenied";
import AddNewEvent from "./components/Events/AddNewEvent";
import AddNewAnnouncement from "./components/Announcements/AddNewAnnouncement";
import AddNewCampusIssue from "./components/CampusIssues/AddNewCampusIssue";
import AddNewComplain from "./components/Complains/AddNewComplain";
import ViewHomePage from "./components/ComplainsManager/ViewHomePage";
import ViewCampusIssues from "./components/ComplainsManager/ViewCampusIssues";
import ComplainManagerSubHeader from "./components/ComplainsManager/ComplainManagerSubHeader";

function App() {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const isComplainManager = false;
  // useSelector(
  //   (state) => state.auth.isComplainsManager
  // );

  return (
    <div className="App">
      <Header />
      {isLoggedIn && !isComplainManager && <Subheader />}
      {isLoggedIn && isComplainManager && <ComplainManagerSubHeader />}
      <Switch>
        {!isLoggedIn && (
          <Route path="/" exact>
            <Redirect to="/api/login" />
          </Route>
        )}
        {!isLoggedIn && (
          <Route path="/api/login" exact>
            <LoginForm isCM={isComplainManager} />
          </Route>
        )}
        {!isLoggedIn && (
          <Route path="/api/signup" exact>
            <SignupForm />
          </Route>
        )}
        {isLoggedIn && isComplainManager && (
          <Route path="/api/user">
            <AuthorizationDenied />
          </Route>
        )}
        {isLoggedIn && !isComplainManager && (
          <Route path="/api/user/home" exact>
            <UserHomePage />
          </Route>
        )}
        {isLoggedIn && !isComplainManager && (
          <Route path="/api/user/view profile" exact>
            <UpdateProfile />
          </Route>
        )}
        {isLoggedIn && !isComplainManager && (
          <Route path="/api/user/announcements" exact>
            <Announcements />
          </Route>
        )}
        {isLoggedIn && !isComplainManager && (
          <Route path="/api/user/announcements/post-a-new-announcement" exact>
            <AddNewAnnouncement />
          </Route>
        )}
        {isLoggedIn && !isComplainManager && (
          <Route path="/api/user/events" exact>
            <Events />
          </Route>
        )}
        {isLoggedIn && !isComplainManager && (
          <Route path="/api/user/events/add-a-new-event" exact>
            <AddNewEvent />
          </Route>
        )}

        {isLoggedIn && !isComplainManager && (
          <Route path="/api/user/complains" exact>
            <Complains />
          </Route>
        )}
        {isLoggedIn && !isComplainManager && (
          <Route path="/api/user/complains/file-a-new-complain" exact>
            <AddNewComplain />
          </Route>
        )}
        {isLoggedIn && !isComplainManager && (
          <Route path="/api/user/campus issues" exact>
            <CampusIssues />
          </Route>
        )}
        {isLoggedIn && !isComplainManager && (
          <Route path="/api/user/campus issues/raise-a-new-issue" exact>
            <AddNewCampusIssue />
          </Route>
        )}
        {isLoggedIn && !isComplainManager && (
          <Route path="/api/user/myAnnouncements" exact>
            <MyAnnouncements />
          </Route>
        )}
        {isLoggedIn && !isComplainManager && (
          <Route path="/api/user/myEvents" exact>
            <MyEvents />
          </Route>
        )}
        {isLoggedIn && !isComplainManager && (
          <Route path="/api/user/myIssues" exact>
            <MyIssues />
          </Route>
        )}

        {/* Complain Manager Routes */}

        {isLoggedIn && isComplainManager && (
          <Route path="/api/complainmanager/view complains" exact>
            <ViewHomePage />
          </Route>
        )}
        {isLoggedIn && isComplainManager && (
          <Route path="/api/complainmanager/view campus issues" exact>
            <ViewCampusIssues />
          </Route>
        )}

        <Route path="/api/complainmanager/internal-server-error" exact>
          <InternalServerError />
        </Route>
        <Route path="/api/complainmanager/authorization-denied" exact>
          <AuthorizationDenied />
        </Route>

        {/* Complain Manager Routes} */}
        <Route path="/api/user/internal-server-error" exact>
          <InternalServerError />
        </Route>
        <Route path="/api/user/authorization-denied" exact>
          <AuthorizationDenied />
        </Route>
        <Route path="/api/user/page-not-found">
          <PageNotFound />
        </Route>

        {isLoggedIn && !isComplainManager && (
          <Route path="*">
            <Redirect to="/api/user/home" />
          </Route>
        )}
        {!isLoggedIn && (
          <Route to="*">
            <Redirect to="/api/login" />
          </Route>
        )}
      </Switch>
    </div>
  );
}

export default App;
