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
import SideNavSection from "./SideNavSection";

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
            <SideNavSection name="Upcoming Events">
              <ul className="nav flex-column">
                <li>Event 1</li>
                <li>Event 2</li>
              </ul>
            </SideNavSection>
            <SideNavSection name="Flagged Customers">
              <ul className="nav flex-column">
                <li>Customer 1</li>
                <li>Customer 2</li>
              </ul>
            </SideNavSection>

            <SideNavSection name="Recently Viewed">
              <ul className="nav flex-column">
                <li>Customer 5</li>
                <li>Customer 6</li>
              </ul>
            </SideNavSection>
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
