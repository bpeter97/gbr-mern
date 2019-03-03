import React from "react";
import PropTypes from "prop-types";

const ErrorAlert = ({ error }) => {
  return (
    <div className="alert alert-danger" role="alert">
      <div className="pt-2 pb-2">
        <span className="ml-2">
          <strong>Error: </strong>
          {error}
        </span>
      </div>
    </div>
  );
};

ErrorAlert.propTypes = {
  error: PropTypes.string.isRequired
};

export default ErrorAlert;
