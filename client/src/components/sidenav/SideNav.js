import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/defaultsActions";
import {
  CustomersIcon,
  ContainersIcon,
  ProductsIcon,
  QuotesIcon,
  CalendarIcon,
  OrdersIcon,
  DashboardIcon,
  LogoutIcon,
  CollapsedIcon,
  notCollapsedIcon
} from "../../icons/";

import SideNavHeader from "./SideNavHeader";
import SideNavItem from "./SideNavItem";

class SideNav extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      activePath: "/"
    };
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  onMinimizeClick(e) {
    const currentState = this.state.collapsed;
    this.setState({ collapsed: !currentState });
  }
  navClick = path => {
    let activePath = this.state.activePath;
    this.setState({
      activePath: path
    });
  };

  render() {
    let navbarContent;
    let minimizedIcon;
    let minimizedText;
    const { isAuthenticated, user } = this.props.auth;
    const collapsed = this.state.collapsed;
    minimizedIcon = collapsed ? CollapsedIcon : notCollapsedIcon;
    minimizedText = collapsed ? "Expand" : "Minimize";

    if (isAuthenticated) {
      navbarContent = (
        <nav
          id="sideNav"
          className={
            collapsed
              ? "collapsed d-flex col-md-2 pl-0 pr-0 sidebar rounded-0"
              : "col-md-2 d-flex pl-0 pr-0 d-md-block sidebar rounded-0"
          }
        >
          <div className="sidebar-sticky justify-content-between">
            <SideNavHeader
              firstName={user.firstName}
              lastName={user.lastName}
              title={user.title}
              avatar={
                user.avatar
                // "https://avatars1.githubusercontent.com/u/17460785?s=400&u=d8b0d093c1d4ad51c2700d15cdf3898cdee42006&v=4"
              }
            />
            <ul className="nav flex-column">
              <SideNavItem
                name="Dashboard"
                icon={DashboardIcon}
                pathname="/"
                isActive={this.state.activePath === "/"}
                onClick={this.navClick}
              />
              <SideNavItem
                name="Customers"
                icon={CustomersIcon}
                pathname="/customers"
                isActive={this.state.activePath === "/customers"}
                onClick={this.navClick}
              />
              <SideNavItem
                name="Quotes"
                icon={QuotesIcon}
                pathname="/quotes"
                isActive={this.state.activePath === "/quotes"}
                onClick={this.navClick}
              />
              <SideNavItem
                name="Orders"
                icon={OrdersIcon}
                pathname="/orders"
                isActive={this.state.activePath === "/orders"}
                onClick={this.navClick}
              />
              <SideNavItem
                name="Products"
                icon={ProductsIcon}
                pathname="/products"
                isActive={this.state.activePath === "/products"}
                onClick={this.navClick}
              />
              <SideNavItem
                name="Calendar"
                icon={CalendarIcon}
                pathname="/calendar"
                isActive={this.state.activePath === "/calendar"}
                onClick={this.navClick}
              />

              <a onClick={this.onLogoutClick.bind(this)}>
                <SideNavItem name="Logout" icon={LogoutIcon} pathname="" />
              </a>

              {/* Add minimize button */}
              <a onClick={this.onMinimizeClick.bind(this)}>
                <SideNavItem
                  name={minimizedText}
                  icon={minimizedIcon}
                  pathname=""
                />
              </a>
            </ul>
          </div>
        </nav>
      );
    } else {
      navbarContent = "";
    }
    return navbarContent;
  }
}

SideNav.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  logoutUser: PropTypes.func.isRequired
});

export default connect(mapStateToProps, { logoutUser })(SideNav);
