import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "react-router-redux";

import store from "./store";
import createHistory from "history/createBrowserHistory";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/defaultsActions";

import Login from "./components/defaults/Login";
import PrivateRoute from "./components/common/PrivateRoute";
import Dashboard from "./components/dashboard";
import SideNav from "./components/sidenav/SideNav";
import Calendar from "./components/calendar";
import Customers from "./components/customers";
import NavBar from "./components/navbar";

import "./App.css";

const history = createHistory();

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
  constructor() {
    super();
    this.state = {
      collapsed: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="wrapper">
            <SideNav collapsed={this.state.collapsed} />
            <div className="col-md">
              <NavBar handleClick={this.handleClick} />
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
