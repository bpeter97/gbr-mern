import React, { Component } from "react";

import PropTypes from "prop-types";

class SideNavSection extends Component {
  render() {
    const { name } = this.props;
    return (
      <div className="side-nav-section">
        <h6>{name}</h6>
        {this.props.children}
      </div>
    );
  }
}

SideNavSection.propTypes = {
  name: PropTypes.string
};

export default SideNavSection;
