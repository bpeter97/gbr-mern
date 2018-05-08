import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class NavHeader extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { firstName, lastName, title } = this.props;
    return (
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
    );
  }
}

export default NavHeader;
