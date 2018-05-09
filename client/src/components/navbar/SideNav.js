import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/defaultsActions";
import { ic_keyboard_tab } from "react-icons-kit/md/ic_keyboard_tab";
import { ic_keyboard_backspace } from "react-icons-kit/md/ic_keyboard_backspace";
import { ic_exit_to_app } from "react-icons-kit/md/ic_exit_to_app";
import { users } from "react-icons-kit/icomoon/users";

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
    minimizedIcon = collapsed ? ic_keyboard_tab : ic_keyboard_backspace;

    if (isAuthenticated) {
      navbarContent = (
        <nav id="sideNav" className={collapsed ? "collapsed" : null}>
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
          </div>
          <div className="navExtras">
            <a onClick={this.onLogoutClick.bind(this)}>
              <NavItem name="Logout" icon={ic_exit_to_app} pathname="" />
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
