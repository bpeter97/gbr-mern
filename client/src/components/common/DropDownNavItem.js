import React from "react";
import PropTypes from "prop-types";

const DropDownNavItem = ({ label, labelId, links }) => {
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href=""
        id={labelId}
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {label}
      </a>
      <div className="dropdown-menu" aria-labelledby={labelId}>
        {links.map(link => {
          return link;
        })}
      </div>
    </li>
  );
};

DropDownNavItem.propTypes = {
  label: PropTypes.string.isRequired,
  labelId: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired
};

export default DropDownNavItem;
