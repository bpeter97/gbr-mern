import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/defaultsActions";

import { Provider } from "react-redux";
import store from "./store";

import Login from "./components/defaults/Login";
import PrivateRoute from "./components/common/PrivateRoute";
import Dashboard from "./components/dashboard";
import SideNav from "./components/sidenav/SideNav";
import Calendar from "./components/calendar";
import Customers from "./components/customers";

import "./App.css";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container-fluid">
            <div className="row">
              <SideNav />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/calendar" component={Calendar} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/customers" component={Customers} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
