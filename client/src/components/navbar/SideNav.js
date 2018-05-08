import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/defaultsActions";
import { ic_exit_to_app } from "react-icons-kit/md/ic_exit_to_app";
import classnames from "classnames";
import { Link } from "react-router-dom";

import NavHeader from "./NavHeader";
import NavItem from "./NavItem";

class SideNav extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    let navbarContent;
    const { isAuthenticated, user } = this.props.auth;

    if (isAuthenticated) {
      navbarContent = (
        <nav id="sideNavWrapper">
          <NavHeader
            firstName={user.firstName}
            lastName={user.lastName}
            title={user.title}
          />
          <div className="navSection">
            <NavItem name="Dashboard" icon={ic_exit_to_app} pathname="/" />
            <NavItem
              name="Customers"
              icon={ic_exit_to_app}
              pathname="/customers"
            />
            <NavItem name="Quotes" icon={ic_exit_to_app} pathname="/quotes" />
            <NavItem name="Orders" icon={ic_exit_to_app} pathname="/orders" />
            <NavItem
              name="Products"
              icon={ic_exit_to_app}
              pathname="/products"
            />
            <NavItem
              name="Calendar"
              icon={ic_exit_to_app}
              pathname="/calendar"
            />
            <a onClick={this.onLogoutClick.bind(this)}>
              <NavItem name="Logout" icon={ic_exit_to_app} pathname="" />
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
