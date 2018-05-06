import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";


const ErrorDisplay = ({
    error
}) => {
    return( 
        <div className="errorDisplay">
        {error && <p style={{color: 'red'}}>{error}</p>}
      </div>
    );
}

ErrorDisplay.propTypes = {
    error: PropTypes.string
};

export default ErrorDisplay;
