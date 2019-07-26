import React from "react";
import PropTypes from "prop-types";

import Alert from "./Alert";
import checkEmpty from "./../../utils/checkEmpty";

const AlertContainer = ({ messages, className, type }) => {
  if (!checkEmpty(messages)) {
    for (var property in messages) {
      let msg;
      if (type == "Error") {
        if (messages.hasOwnProperty(property)) {
          msg = messages[property];
        }
      } else if (type == "Success") {
        msg = messages.message;
      }

      return <Alert message={msg} type={type} className={className} />;
    }
  } else {
    return null;
  }
};

AlertContainer.propTypes = {
  messages: PropTypes.object,
  type: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
};

export default AlertContainer;
