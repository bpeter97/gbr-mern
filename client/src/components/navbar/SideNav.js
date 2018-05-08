import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/defaultsActions";
import Navbar from "../navbar";
import { ic_exit_to_app } from "react-icons-kit/md/ic_exit_to_app";
import classnames from "classnames";
import { Link } from "react-router-dom";

import SvgIcon from "react-icons-kit";

const Icon20 = props => <SvgIcon size={props.size || 20} icon={props.icon} />;

class SideNav extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { firstName, lastName, title } = this.props;
    return (
      <nav>
        <div className="navHeader">
          <div className="navHeaderImgDiv">
            <img
              id="navHeaderImg"
              src="https://avatars1.githubusercontent.com/u/17460785?s=400&u=d8b0d093c1d4ad51c2700d15cdf3898cdee42006&v=4"
              alt=""
            />
          </div>
          <div className="navHeaderText">
            {firstName} {lastName}
          </div>
          <div id="navHeaderTitle" className="navHeaderText">
            {title}
          </div>
        </div>
        <div className="navSection">
          <div
            className={classnames("navItem", {
              active: window.location.pathname === "/"
            })}
          >
            <div className="navItemIcon">
              <Icon20 size={20} icon={ic_exit_to_app} />
            </div>
            <Link to="/">
              <div>Dashboard</div>
            </Link>
          </div>
          <Link to="/containers">
            <div
              className={classnames("navItem", {
                active: window.location.pathname === "/containers"
              })}
            >
              <div className="navItemIcon">
                <Icon20 size={20} icon={ic_exit_to_app} />
              </div>
              <div>Containers</div>
            </div>
          </Link>
          <Link to="/customers">
            <div
              className={classnames("navItem", {
                active: window.location.pathname === "/customers"
              })}
            >
              <div className="navItemIcon">
                <Icon20 size={20} icon={ic_exit_to_app} />
              </div>
              <div>Customers</div>
            </div>
          </Link>
          <Link to="/quotes">
            <div
              className={classnames("navItem", {
                active: window.location.pathname === "/quotes"
              })}
            >
              <div className="navItemIcon">
                <Icon20 size={20} icon={ic_exit_to_app} />
              </div>
              <div>Quotes</div>
            </div>
          </Link>
          <Link to="/orders">
            <div
              className={classnames("navItem", {
                active: window.location.pathname === "/Orders"
              })}
            >
              <div className="navItemIcon">
                <Icon20 size={20} icon={ic_exit_to_app} />
              </div>
              <div>Orders</div>
            </div>
          </Link>
          <Link to="/products">
            <div
              className={classnames("navItem", {
                active: window.location.pathname === "/products"
              })}
            >
              <div className="navItemIcon">
                <Icon20 size={20} icon={ic_exit_to_app} />
              </div>
              <div>Products</div>
            </div>
          </Link>
          <Link to="/calendar">
            <div
              className={classnames("navItem", {
                active: window.location.pathname === "/calendar"
              })}
            >
              <div className="navItemIcon">
                <Icon20 size={20} icon={ic_exit_to_app} />
              </div>
              <div>Calendar</div>
            </div>
          </Link>

          <div className={classnames("navItem")}>
            <div className="navItemIcon">
              <Icon20 size={20} icon={ic_exit_to_app} />
            </div>
            <div>Logout</div>
          </div>
        </div>
      </nav>
    );
  }
}

export default SideNav;
