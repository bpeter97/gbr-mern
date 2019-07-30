import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Shortcuts from "./../../dashboard/Shortcuts";

import { getOrder } from "./../../../actions/orderActions";

class RentalAgreement extends Component {
	constructor(props) {
		super(props);
		let hasState = this.props.location.location.state;
		let id = "";
		if (!hasState) {
			this.props.history.push("/orders");
		} else {
			id = hasState.id;
			this.props.getOrder(id);
		}
	}

	render() {
		return (
			<div className="container-fluid main-content" id="view-rental-agreement">
				<Shortcuts history={this.props.history} />
				<div className="row justify-content-center">
					<div className="col-sm-12 pb-4">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title text-center py-2">
									Rental Agreement
								</h5>
								<div className="d-flex flex-row justify-content-center">
									<div className="col-12 py-md-3">
										<div className="container">Content</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

RentalAgreement.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	location: state.router,
	order: state.product
});

export default connect(
	mapStateToProps,
	{ getOrder }
)(RentalAgreement);
