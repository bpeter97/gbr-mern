import React from "react";
import PropTypes from "prop-types";

import Alert from "./Alert";

const AlertContainer = (messages, type, className) => {
	for (var property in messages) {
		var msg;
		if (messages.hasOwnProperty(property)) {
			if (type == "Error") {
				msg = messages[property].error;
			} else if (type == "Success") {
				msg = messages[property].success;
			}
		}

		return <Alert message={msg} type={type} className={className} />;
	}
};

AlertContainer.propTypes = {
	message: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired
};

export default AlertContainer;
