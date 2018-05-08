import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import classnames from "classnames";
import { ic_exit_to_app } from "react-icons-kit/md/ic_exit_to_app";

import SvgIcon from "react-icons-kit";

const Icon20 = props => <SvgIcon size={props.size || 20} icon={props.icon} />;

class NavItem extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { name, pathname, icon, clickFunc } = this.props;

    return (
      <div
        className={classnames("navItem", {
          active: window.location.pathname === { pathname }
        })}
      >
        <div className="navItemIcon">
          <Icon20 size={20} icon={icon} />
        </div>

        <div>{name}</div>
      </div>
    );
  }
}

NavItem.propTypes = {
  name: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired
};

export default NavItem;
