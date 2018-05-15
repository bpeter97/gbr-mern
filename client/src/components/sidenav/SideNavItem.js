import React, { Component } from "react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import SvgIcon from "react-icons-kit";

const Icon24 = props => <SvgIcon size={24} icon={props.icon} />;

class SideNavItem extends Component {
  render() {
    const { name, pathname, icon } = this.props;
    return (
      <Link to={pathname}>
        <div
          className={this.props.isActive ? "navItem active" : "navItem"}
          name={name}
        >
          <div id="navItemIcon">
            <Icon24 size={24} icon={icon} />
          </div>
          <div className="navItemText">{name}</div>
        </div>
      </Link>
    );
  }
}

SideNavItem.propTypes = {
  name: PropTypes.string.isRequired,
  pathname: PropTypes.string,
  icon: PropTypes.object.isRequired
};

export default SideNavItem;
