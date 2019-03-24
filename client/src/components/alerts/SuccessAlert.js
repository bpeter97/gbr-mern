import React from "react";
import PropTypes from "prop-types";

const SuccessAlert = ({ msg }) => {
  if (msg) {
    return (
      <div className="alert alert-success" role="alert">
        <div className="pt-2 pb-2">
          <span className="ml-2">
            <strong>Success: </strong>
            {msg}
          </span>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

SuccessAlert.propTypes = {
  msg: PropTypes.string.isRequired
};

export default SuccessAlert;
