import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextFieldInput from "../common/TextFieldInput";
import SideNavSection from "./SideNavSection";
import Calendar from "./../calendar/Calendar";
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
  }

  onSubmit = e => {
    e.preventDefault();

    const query = {
      query: this.state.query
    };
    console.log(query);
    // this.props.search(query);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
            {/* SIDE NAV TOGGLE > MD, USED TO CHANGE COLLAPSE  */}
            <button
              className="d-none d-md-block navbar-toggler sidebar-toggler"
              id="collapse-icon"
              onClick={this.props.handleClick}
            >
              <SvgIcon size={20} icon={collapsed ? ArrowRight : ArrowLeft} />
            </button>
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
              <Calendar
                height="450"
                containerHeight="458"
                defaultView="agenda"
                calendarId="sidebar-calendar"
                theme="standard"
                header={{
                  left: "",
                  center: "title",
                  right: ""
                }}
              />
            </SideNavSection>

            <SideNavSection name="Todos">
              <ul className="nav flex-column" />
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
