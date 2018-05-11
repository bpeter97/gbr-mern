import React, { Component } from "react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import SvgIcon from "react-icons-kit";

const Icon24 = props => <SvgIcon size={24} icon={props.icon} />;

class SideNavItem extends Component {
  constructor() {
    super();
    this.state = {
      activeLink: "/"
    };
  }

  navClick = () => this.props.onClick(this.props.pathname);

  render() {
    const { name, pathname, icon } = this.props;
    let item;
    if (pathname === "") {
      item = (
        <li className="navItem">
          <li>
            <Icon24 size={24} icon={icon} />
          </li>

          <li className="navItemText">{name}</li>
        </li>
      );
    } else {
      item = (
        <Link to={pathname}>
          <li
            className={this.props.isActive ? "navItem active" : "navItem"}
            onClick={this.navClick.bind(this)}
            name={name}
          >
            <li>
              <Icon24 size={24} icon={icon} />
            </li>

            <li className="navItemText">{name}</li>
          </li>
        </Link>
      );
    }

    return item;
  }
}

SideNavItem.propTypes = {
  name: PropTypes.string.isRequired,
  pathname: PropTypes.string,
  icon: PropTypes.object.isRequired
};

export default SideNavItem;
