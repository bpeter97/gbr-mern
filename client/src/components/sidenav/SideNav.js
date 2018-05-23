import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextFieldInput from "../common/TextFieldInput";
import SideNavSection from "./SideNavSection";
import Todos from "../todos/Todos";

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
    const { collapsed, id } = this.props;
    const { isAuthenticated } = this.props.auth;
    const { errors } = this.state;
    if (isAuthenticated) {
      navbarContent = (
        <div
          className={
            collapsed
              ? "collapsed col-12 col-md-3 side-nav "
              : "col-12 col-md-3 side-nav"
          } //if in drawer, display = true, else regular = none.
          id={id}
        >
          <nav className="links" id="route-links">
            <form onSubmit={this.onSubmit} className="nav-search d-flex">
              <TextFieldInput
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

            <SideNavSection>
              {/* get todos
              put them into list
              render */}
              <Todos />
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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(SideNav);
