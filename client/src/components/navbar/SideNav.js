import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/defaultsActions";
import Navbar from "../navbar";
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
    const { firstName, lastName, title } = this.props;
    return (
      <nav>
        <NavHeader firstName={firstName} lastName={lastName} title={title} />
        <div className="navSection">
          <NavItem name="Dashboard" icon={ic_exit_to_app} pathname="/" />
          <NavItem name="Customers" icon={ic_exit_to_app} pathname="/" />
          <NavItem name="Quotes" icon={ic_exit_to_app} pathname="/" />
          <NavItem name="Orders" icon={ic_exit_to_app} pathname="/" />
          <NavItem name="Products" icon={ic_exit_to_app} pathname="/" />
          <NavItem name="Calendar" icon={ic_exit_to_app} pathname="/" />
          <a onClick={this.onLogoutClick.bind(this)}>
            <NavItem name="Logout" icon={ic_exit_to_app} pathname="/" />
          </a>
        </div>
      </nav>
    );
  }
}

SideNav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(SideNav);
