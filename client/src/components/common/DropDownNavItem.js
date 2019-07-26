import React from "react";
import PropTypes from "prop-types";

const DropDownNavItem = ({ label, labelId, links }) => {
  return (
    <li className="nav-item dropdown">
      <button
        className="nav-link dropdown-toggle"
        href=""
        id={labelId}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        style={{ backgroundColor: "#ffffff00", fontSize: "16px" }}
      >
        {label}
      </button>
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
