import React from "react";
import PropTypes from "prop-types";

const ErrorDisplay = ({ error }) => {
  return (
    <div className="errorDisplay">
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

ErrorDisplay.propTypes = {
  error: PropTypes.string
};

export default ErrorDisplay;
