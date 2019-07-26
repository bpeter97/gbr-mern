import React from "react";
import PropTypes from "prop-types";

import Alert from "./Alert";

const AlertContainer = (messages, type, className) => {
	for (var property in messages) {
		var msg;
		if (messages.hasOwnProperty(property)) {
			msg = messages[property];
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
