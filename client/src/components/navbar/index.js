import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/defaultsActions";

import SvgIcon from "react-icons-kit";
import { AccountIcon } from "../../icons";

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      errors: {}
    };
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    let navbar = "";

    if (isAuthenticated) {
      navbar = (
        <nav
          className="navbar navbar-expand-md navbar-dark top-nav"
          style={{ backgroundColor: "#ffffff" }}
        >
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"> </span>
          </button>
          {/* DISAPPEARS WHEN < MD OR < 768px */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <img
                  className="gbr_logo_image d-none d-xl-block ml-3 mr-2 mt-2"
                  height="25"
                  src="../../../img/logo.png"
                  alt="GBR Logo"
                />
                <img
                  className="small_gbr_logo_image d-block d-xl-none mt-2"
                  height="25"
                  src="../../../img/logosmall.png"
                  alt="GBR Logo"
                />
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/containers">
                  Containers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/customers">
                  Customers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/quotes">
                  Quotes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/calendar">
                  Calendar
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item pr-2 mt-1">
                Welcome {user.firstName} {user.lastName}{" "}
                {user.suffix ? user.suffix : ""}!
              </li>
              <li className="dropdown ">
                <a
                  href=""
                  className="dropdown-toggle"
                  id="account"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <SvgIcon
                    size={30}
                    icon={AccountIcon}
                    style={{ color: "#008000" }}
                  />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="account"
                >
                  <a className="dropdown-item" href="">
                    Settings
                  </a>

                  <a
                    className="dropdown-item"
                    onClick={this.onLogoutClick.bind(this)}
                  >
                    Log off
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      );
    }

    return navbar;
  }
}

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  logoutUser: PropTypes.func.isRequired,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NavBar);
