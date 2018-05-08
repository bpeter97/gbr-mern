import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { logoutUser } from "../../actions/defaultsActions";

import SvgIcon from "react-icons-kit";

import { ic_aspect_ratio } from "react-icons-kit/md/ic_aspect_ratio";
import { ic_business } from "react-icons-kit/md/ic_business";
import { ic_business_center } from "react-icons-kit/md/ic_business_center";
import { ic_format_list_bulleted } from "react-icons-kit/md/ic_format_list_bulleted";
import { ic_people } from "react-icons-kit/md/ic_people";
import { ic_shopping_cart } from "react-icons-kit/md/ic_shopping_cart";
import { ic_exit_to_app } from "react-icons-kit/md/ic_exit_to_app";
import SideNav from "./SideNav";

const Icon20 = props => <SvgIcon size={props.size || 20} icon={props.icon} />;

const BaseContainer = props => (
  <div
    style={{
      display: "flex",
      alignContent: "left",
      flexDirection: "column",
      flexWrap: "wrap",
      height: "100vh",
      paddingBottom: 16,
      fontFamily: "Roboto",
      width: 240,
      ...props.style
    }}
  >
    {props.children}
  </div>
);

class Navbar extends Component {
  onLogoutClick(e) {
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    let navbarContent;

    if (isAuthenticated) {
      navbarContent = (
        <div id="sideNavWrapper">
          <SideNav
            firstName={user.firstName}
            lastName={user.lastName}
            title={user.title}
          />
        </div>
      );
    } else {
      navbarContent = "";
    }

    return navbarContent;
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  logoutUser: PropTypes.func.isRequired
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
