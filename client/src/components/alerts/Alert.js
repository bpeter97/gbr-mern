import React from "react";
import PropTypes from "prop-types";

const Alert = (message, type, className) => {
	if (message) {
		return (
			<div className={className} role="alert">
				<div className="pt-2 pb-2">
					<span className="ml-2">
						<strong>{type}: </strong>
						{message}
					</span>
				</div>
			</div>
		);
	} else {
		return null;
	}
};

Alert.propTypes = {
	message: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired
};

export default Alert;
