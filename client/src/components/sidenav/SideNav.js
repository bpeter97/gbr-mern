import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextFieldInput from "../common/TextFieldInput";
import SideNavSection from "./SideNavSection";
import SideNavCalendar from "./SideNavCalendar";
import Todos from "../todos/Todos";

import SvgIcon from "react-icons-kit";
import { ArrowLeft, ArrowRight } from "../../icons";

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
    let events = [
      {
        start: "2017-01-06",
        end: "2017-01-08",
        rendering: "background",
        color: "#00FF00"
      }
    ];
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
            {/* SIDE NAV TOGGLE > MD, USED TO CHANGE COLLAPSE  */}
            <a
              className="d-none d-md-block navbar-toggler sidebar-toggler"
              id="collapse-icon"
              onClick={this.props.handleClick}
            >
              <SvgIcon size={20} icon={collapsed ? ArrowRight : ArrowLeft} />
            </a>
            {/* BOOTSTRAP NAVBAR TOGGLE */}
            <form onSubmit={this.onSubmit} className="nav-search d-flex">
              <TextFieldInput
                placeholder="Search..."
                className="form-control w-75 ml-auto mr-auto"
                name="query"
                type="text"
                value={this.state.query}
                onChange={this.onChange}
                error={errors.login}
              />
            </form>
            <SideNavSection>
              <SideNavCalendar events={events} />
            </SideNavSection>

            {/* <SideNavSection name="Upcoming Events">
              <ul className="nav flex-column">
                <li>Event 1</li>
                <li>Event 2</li>
              </ul>
            </SideNavSection> */}
            {/* <SideNavSection name="Flagged Customers">
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
            </SideNavSection> */}

            <SideNavSection name="Todos">
              <ul className="nav flex-column" />
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
