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

import NavHeader from "./NavHeader";
import NavItem from "./NavItem";

class SideNav extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false
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

  render() {
    let navbarContent;
    let minimizedIcon;
    const { isAuthenticated, user } = this.props.auth;
    const collapsed = this.state.collapsed;
    minimizedIcon = collapsed ? CollapsedIcon : notCollapsedIcon;

    if (isAuthenticated) {
      navbarContent = (
        <nav id="sideNav" className={collapsed ? "collapsed" : null}>
          <NavHeader
            firstName={user.firstName}
            lastName={user.lastName}
            title={user.title}
          />
          <div className="navSection">
            <NavItem name="Dashboard" icon={DashboardIcon} pathname="/" />
            <NavItem
              name="Customers"
              icon={CustomersIcon}
              pathname="/customers"
            />
            <NavItem name="Quotes" icon={QuotesIcon} pathname="/quotes" />
            <NavItem name="Orders" icon={OrdersIcon} pathname="/orders" />
            <NavItem name="Products" icon={ProductsIcon} pathname="/products" />
            <NavItem name="Calendar" icon={CalendarIcon} pathname="/calendar" />
          </div>
          <div className="navExtras">
            <a onClick={this.onLogoutClick.bind(this)}>
              <NavItem name="Logout" icon={LogoutIcon} pathname="" />
            </a>

            {/* Add minimize button */}
            <a onClick={this.onMinimizeClick.bind(this)}>
              <NavItem name="Minimize" icon={minimizedIcon} pathname="" />
            </a>
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
