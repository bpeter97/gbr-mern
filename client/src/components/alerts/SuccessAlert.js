import React from "react";
import PropTypes from "prop-types";

const SuccessAlert = ({ success }) => {
  if (success) {
    return (
      <div className="alert alert-success" role="alert">
        <div className="pt-2 pb-2">
          <span className="ml-2">
            <strong>Success: </strong>
            {success}
          </span>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

SuccessAlert.propTypes = {
  success: PropTypes.string.isRequired
};

export default SuccessAlert;
