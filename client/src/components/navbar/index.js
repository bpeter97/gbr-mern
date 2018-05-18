import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/defaultsActions";

import SvgIcon from "react-icons-kit";
import { MenuIcon, AccountIcon } from "../../icons";
import SearchBar from "../common/SearchBar";
import IconSection from "./IconSection";

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      errors: {}
    };
    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  onSubmit(e) {
    e.preventDefault();

    const query = {
      query: this.state.query
    };
    console.log(query);
    // this.props.search(query);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;
    const { isAuthenticated } = this.props.auth;
    let navbar = "";

    if (isAuthenticated) {
      navbar = (
        <nav
          className="navbar navbar-expand-md navbar-dark"
          style={{ backgroundColor: "#006400" }}
        >
          {/* SIDE NAV TOGGLE > MD, USED TO CHANGE COLLAPSE  */}
          <a
            className="d-none d-md-block navbar-toggler"
            id="collapse-icon"
            onClick={this.props.handleClick}
          >
            <SvgIcon size={20} icon={MenuIcon} />
          </a>
          {/* BOOTSTRAP NAVBAR TOGGLE */}
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
                <Link className="nav-link" to="/">
                  Dashboard
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
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="dropdown">
                <a
                  href=""
                  className="dropdown-toggle"
                  id="account"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <SvgIcon size={20} icon={AccountIcon} />
                </a>
                <div className="dropdown-menu" aria-labelledby="account">
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
  // search: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  logoutUser: PropTypes.func.isRequired
});

export default connect(mapStateToProps, { logoutUser })(NavBar);
