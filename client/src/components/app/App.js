import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";

import store from "./../../redux/store";

import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./../../actions/defaultsActions";

import Login from "../defaults/Login";
import PrivateRoute from "../common/PrivateRoute";
import Dashboard from "../dashboard";
import SideNav from "../sidenav/SideNav";
import Calendars from "../calendar";
import Customers from "../customers";
import Containers from "../containers";
import Products from "../products";
import Orders from "../orders";
import Quotes from "../quotes";
import Users from "../users";
import NavBar from "../navbar";

import Drawer, {
  DrawerContainer,
  MainContentContainer
} from "react-swipeable-drawer";

import "./App.css";
import EditCustomer from "../customers/EditCustomer";
import AddCustomer from "../customers/AddCustomer";
import EditContainer from "../containers/EditContainer";
import AddContainer from "../containers/AddContainer";
import EditProduct from "../products/EditProduct";
import AddProduct from "../products/AddProduct";

// Orders
import AddOrder from "../orders/AddOrder";
import ViewOrder from "../orders/ViewOrder";
import RentalOrder from "../orders/forms/RentalOrder";
import RentalAgreement from "../orders/RentalAgreement";

const createHistory = require("history").createBrowserHistory;

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
  }

  handleClick = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

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
                            path="/products/add"
                            component={AddProduct}
                          />
                        </Switch>
                        <Switch>
                          <PrivateRoute
                            exact
                            path="/orders/add/"
                            component={AddOrder}
                          />
                        </Switch>
                        <Switch>
                          <PrivateRoute
                            exact
                            path="/orders/view/"
                            component={ViewOrder}
                          />
                        </Switch>
                        <Switch>
                          <PrivateRoute
                            exact
                            path="/orders/view/ra"
                            component={RentalAgreement}
                          />
                        </Switch>
                        <Switch>
                          <PrivateRoute
                            exact
                            path="/orders/rental/"
                            component={RentalOrder}
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
