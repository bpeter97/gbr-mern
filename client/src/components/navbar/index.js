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
          className="navbar navbar-expand top-nav flex-column flex-md-row"
          style={{ backgroundColor: "#006400" }}
        >
          <a
            className="mr-5 d-none d-md-block order-1 "
            id="collapse-icon"
            onClick={this.props.handleClick}
          >
            <SvgIcon size={20} icon={MenuIcon} />
          </a>
          <a
            className="mr-auto d-md-none order-1"
            id="collapse-icon"
            data-toggle="collapse"
            data-target="#route-links"
            aria-controls="route-links"
            aria-expanded="true"
          >
            <SvgIcon size={20} icon={MenuIcon} />
          </a>
          <ul className="navbar-nav flex-row navbar-mobile order-0 order-md-1">
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

          {/* <form onSubmit={this.onSubmit} className="d-flex w-75">
            <SearchBar
              placeholder="Search..."
              className="form-control w-100"
              name="query"
              type="text"
              value={this.state.query}
              onChange={this.onChange}
              error={errors.login}
            />
          </form> */}
          <ul className="navbar-nav flex-row ml-md-auto ml-auto order-3">
            <li className="nav-item dropdown">
              <a
                href=""
                className="nav-item nav-link dropdown-toggle"
                id="account"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <SvgIcon size={20} icon={AccountIcon} />
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
