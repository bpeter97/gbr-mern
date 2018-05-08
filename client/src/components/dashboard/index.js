import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/defaultsActions";
import Navbar from "../navbar";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>DASHBOARD PAGE!</h1>
      </div>
    );
  }
}

export default Dashboard;
