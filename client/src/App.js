import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store.js";

// import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import LoginOrganizer from './components/auth/LoginOrganizer'
import RegisterOrganizer from './components/auth/RegisterOrganizer'
import Register from './components/auth/Register';
import Profile from './components/profile/Profile';
import OrganizerProfile from './components/profile/OrganizerProfile'
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import CreatePost from "./components/createPost/CreatePost"
import Timeline from "./components/timeline/Timeline"
import TimelineOrganizer from "./components/timeline/TimelineOrganizer"

//Check for token to keep user logged in
if (localStorage.jwtToken) {
  //Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  //Decode token and get user info and exp
  const decoded = jwt_decode(token);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now() / 1000; //To get in milliseconds
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());

    //Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
        <div className="App" style={{backgroundColor:"#ffffff",
                                    backgroundSize: "100% 100%", height:"100%"}}>
          {/* <Navbar /> */}
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/registerOrganizer" component={RegisterOrganizer} />
          <Route exact path="/loginOrganizer" component={LoginOrganizer} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component= {Dashboard} />
            <Switch>
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/organizerprofile" component={OrganizerProfile} />
              <PrivateRoute exact path="/createPost" component={CreatePost} />
              <PrivateRoute exact path="/timeline" component={Timeline} />
              <PrivateRoute exact path="/timelineorganizer" component={TimelineOrganizer} />
            </Switch>
          </Switch>
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;