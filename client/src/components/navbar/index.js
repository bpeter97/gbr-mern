import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logoutUser } from "../../actions/defaultsActions";

import SvgIcon from "react-icons-kit";
import { MenuIcon } from "../../icons";
import SearchBar from "../common/SearchBar";
import IconSection from "./IconSection";

const Icon24 = props => <SvgIcon size={24} icon={props.icon} />;

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
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

  // onSubmit(e) {
  //   e.preventDefault();

  //   const query = {
  //     query: this.state.query
  //   };
  //   this.props.search(query);
  // }

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
          className="navbar navbar-expand py-1 flex-md-nowrap rounded-0"
          style={{ backgroundColor: "#006400" }}
        >
          <ul id="toggleSide" className="navbar-nav px-3 mr-auto ">
            <li className="nav-item">
              <a onClick={this.props.handleClick}>
                <Icon24 size={24} icon={MenuIcon} />
              </a>
            </li>
          </ul>
          {/* <form className="form-inline mx-auto w-75" onSubmit={this.onSubmit}> */}
          <SearchBar
            placeholder="Search..."
            className="form-control w-75 "
            name="query"
            type="text"
            value={this.state.query}
            onChange={this.onChange}
            error={errors.login}
          />
          {/* <button type="submit">
              <Icon24 size={24} icon={SearchIcon} />
            </button> */}
          {/* </form> */}

          <IconSection />
          <ul className="navbar-nav px-3 ml-auto">
            <li className="nav-item dropdown">
              <a
                href=""
                className="nav-item nav-link dropdown-toggle"
                id="account"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Account
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
