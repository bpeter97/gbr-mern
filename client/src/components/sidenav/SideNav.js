import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  CustomersIcon,
  ContainersIcon,
  ProductsIcon,
  QuotesIcon,
  CalendarIcon,
  OrdersIcon,
  DashboardIcon
} from "../../icons/";

import SearchBar from "../common/SearchBar";
import SideNavHeader from "./SideNavHeader";
import SideNavItem from "./SideNavItem";

class SideNav extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.onLogoutClick = this.onLogoutClick.bind(this);
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
    let navbarContent;
    const { location, collapsed } = this.props;
    const { isAuthenticated, user } = this.props.auth;
    const { errors } = this.state;
    if (isAuthenticated) {
      navbarContent = (
        <div
          className={
            collapsed
              ? "collapsed col-12 col-md-3 side-nav "
              : "col-12 col-md-3 side-nav"
          }
        >
          <nav className="links" id="route-links">
            <form onSubmit={this.onSubmit} className="nav-search d-flex">
              <SearchBar
                placeholder="Search..."
                className="form-control w-100"
                name="query"
                type="text"
                value={this.state.query}
                onChange={this.onChange}
                error={errors.login}
              />
            </form>
            {/* <SideNavHeader
              firstName={user.firstName}
              lastName={user.lastName}
              title={user.title}
              avatar={
                user.avatar
                // "https://avatars1.githubusercontent.com/u/17460785?s=400&u=d8b0d093c1d4ad51c2700d15cdf3898cdee42006&v=4"
              }
            /> */}
            <ul className="nav flex-column">
              <SideNavItem
                name="Dashboard"
                icon={DashboardIcon}
                pathname="/"
                isActive={location.pathname === "/"}
              />
              <SideNavItem
                name="Customers"
                icon={CustomersIcon}
                pathname="/customers"
                isActive={location.pathname === "/customers"}
              />
              <SideNavItem
                name="Quotes"
                icon={QuotesIcon}
                pathname="/quotes"
                isActive={location.pathname === "/quotes"}
              />
              <SideNavItem
                name="Orders"
                icon={OrdersIcon}
                pathname="/orders"
                isActive={location.pathname === "/orders"}
              />
              <SideNavItem
                name="Products"
                icon={ProductsIcon}
                pathname="/products"
                isActive={location.pathname === "/products"}
              />
              <SideNavItem
                name="Calendar"
                icon={CalendarIcon}
                pathname="/calendar"
                isActive={location.pathname === "/calendar"}
              />
            </ul>
          </nav>
        </div>
      );
    } else {
      navbarContent = "";
    }
    return navbarContent;
  }
}

SideNav.propTypes = {
  auth: PropTypes.object.isRequired,

  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  location: state.router.location
});

export default connect(mapStateToProps)(SideNav);
