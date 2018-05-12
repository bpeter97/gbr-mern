import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { logoutUser } from "../../actions/defaultsActions";
import ErrorDisplay from "../error/ErrorDisplay";
import SvgIcon from "react-icons-kit";
import {
  CollapsedIcon,
  notCollapsedIcon,
  SearchIcon,
  LogoutIcon
} from "../../icons";
import SearchBar from "../common/SearchBar";

const Icon24 = props => <SvgIcon size={24} icon={props.icon} />;

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    // this.props.search(query);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;
    const { icon } = this.props;
    let navbar = "";

    if (icon) {
      navbar = (
        <nav
          className="navbar navbar-expand py-0 px-2  flex-column flex-md-row bd-navbar rounded-0"
          style={{ backgroundColor: "#006400" }}
        >
          <form
            className="form-inline"
            style={{ flex: " 3 0 auto" }}
            onSubmit={this.onSubmit}
          >
            <SearchBar
              placeholder="Search..."
              className="form-control w-75"
              name="query"
              type="text"
              value={this.state.query}
              onChange={this.onChange}
              error={errors.login}
            />
            <button type="submit" className="btn btn-primary my-2 my-sm-0">
              <Icon24 size={24} icon={SearchIcon} />
            </button>
          </form>
          <ul className="navbar-nav px-3" style={{ flex: "1 0 auto" }}>
            <li className="nav-item">
              <a href="">
                <Icon24 size={24} icon={icon} />
              </a>
            </li>
          </ul>

          <ul className="navbar-nav px-3">
            <li className="nav-item dropdown">
              <a
                href="#"
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
                <a className="dropdown-item" href="#">
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
    } else {
      navbar = (
        <nav
          className="navbar navbar-expand py-0 px-2 flex-column flex-md-row bd-navbar rounded-0"
          style={{ backgroundColor: "#006400" }}
        >
          <form className="form-inline m-auto " style={{ flex: " 3 0 auto" }}>
            <SearchBar
              placeholder="Search..."
              className="form-control w-75"
              name="query"
              type="text"
              value={this.state.query}
              onChange={this.onChange}
              error={errors.login}
            />
            <button type="submit" className="btn btn-primary my-2 my-sm-0">
              <Icon24 size={24} icon={SearchIcon} />
            </button>
          </form>

          <ul className="navbar-nav px-3">
            <li className="nav-item dropdown">
              <a
                href="#"
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
                <a className="dropdown-item" href="#">
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
