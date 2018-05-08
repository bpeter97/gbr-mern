import React, { Component } from "react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import SvgIcon from "react-icons-kit";

const Icon20 = props => <SvgIcon size={props.size || 20} icon={props.icon} />;

class NavItem extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { name, pathname, icon } = this.props;
    let item;
    if (pathname === "") {
      item = (
        <div className="navItem">
          <div id="navItemIcon">
            <Icon20 size={20} icon={icon} />
          </div>

          <div className="navItemText">{name}</div>
        </div>
      );
    } else {
      item = (
        <Link to={pathname}>
          <div className="navItem">
            <div id="navItemIcon">
              <Icon20 size={20} icon={icon} />
            </div>

            <div className="navItemText">{name}</div>
          </div>
        </Link>
      );
    }

    return item;
  }
}

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  pathname: PropTypes.string,
  icon: PropTypes.object.isRequired
};

export default NavItem;
