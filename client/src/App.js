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
import Calendars from "./components/calendar";
import Customers from "./components/customers";
import Containers from "./components/containers";
import Products from "./components/products";
import Orders from "./components/orders";
import Quotes from "./components/quotes";
import Users from "./components/users";
import NavBar from "./components/navbar";

import Drawer, {
  DrawerContainer,
  MainContentContainer
} from "react-swipeable-drawer";

import "./App.css";
import EditCustomer from "./components/customers/EditCustomer";
import AddCustomer from "./components/customers/AddCustomer";
import EditContainer from "./components/containers/EditContainer";
import AddContainer from "./components/containers/AddContainer";
import EditProduct from "./components/products/EditProduct";
import AddOrder from "./components/orders/AddOrder";

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
            <Drawer position="left" size={80}>
              {({
                position,
                size,
                swiping,
                translation,
                mainContentScroll,
                toggleDrawer,
                handleTouchStart,
                handleTouchMove,
                handleTouchEnd
              }) => (
                <div>
                  <DrawerContainer
                    position={position}
                    size={size}
                    swiping={swiping}
                    translation={translation}
                    toggleDrawer={toggleDrawer}
                    handleTouchStart={handleTouchStart}
                    handleTouchMove={handleTouchMove}
                    handleTouchEnd={handleTouchEnd}
                    drawerContent={
                      <SideNav
                        collapsed={this.state.collapsed}
                        id={"side-nav-drawer"}
                      />
                    }
                  />
                  <MainContentContainer
                    translation={translation}
                    mainContentScroll={mainContentScroll}
                  >
                    <NavBar handleClick={this.handleClick} />
                    <div className="container-fluid">
                      <div className="row flex-xl-nowrap">
                        <SideNav
                          handleClick={this.handleClick}
                          collapsed={this.state.collapsed}
                          id={"side-nav-reg"}
                        />
                        <Route exact path="/login" component={Login} />
                        <Switch>
                          <PrivateRoute exact path="/" component={Dashboard} />
                        </Switch>
                        <Switch>
                          <PrivateRoute
                            exact
                            path="/calendar"
                            component={Calendars}
                          />
                        </Switch>
                        <Switch>
                          <PrivateRoute
                            exact
                            path="/quotes"
                            component={Quotes}
                          />
                        </Switch>
                        <Switch>
                          <PrivateRoute
                            exact
                            path="/orders"
                            component={Orders}
                          />
                        </Switch>
                        <Switch>
                          <PrivateRoute
                            exact
                            path="/products"
                            component={Products}
                          />
                        </Switch>
                        <Switch>
                          <PrivateRoute
                            exact
                            path="/customers"
                            component={Customers}
                          />
                        </Switch>
                        <Switch>
                          <PrivateRoute
                            exact
                            path="/containers"
                            component={Containers}
                          />
                        </Switch>
                        <Switch>
                          <PrivateRoute exact path="/users" component={Users} />
                        </Switch>
                        <Switch>
                          <PrivateRoute
                            exact
                            path="/customers/edit/"
                            component={EditCustomer}
                          />
                        </Switch>
                        <Switch>
                          <PrivateRoute
                            exact
                            path="/customers/add/"
                            component={AddCustomer}
                          />
                        </Switch>
                        <Switch>
                          <PrivateRoute
                            exact
                            path="/containers/edit/"
                            component={EditContainer}
                          />
                        </Switch>
                        <Switch>
                          <PrivateRoute
                            exact
                            path="/containers/add/"
                            component={AddContainer}
                          />
                        </Switch>
                        <Switch>
                          <PrivateRoute
                            exact
                            path="/products/edit/"
                            component={EditProduct}
                          />
                        </Switch>
                        <Switch>
                          <PrivateRoute
                            exact
                            path="/orders/add/"
                            component={AddOrder}
                          />
                        </Switch>
                      </div>
                    </div>
                  </MainContentContainer>
                </div>
              )}
            </Drawer>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
