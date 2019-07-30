import React, { Component } from "react";
import PropTypes from "prop-types";

import Shortcuts from "./../../dashboard/Shortcuts"

class RentalAgreement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formName: "Rental Agreement"
		};
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
									{this.state.formName}
								</h5>
								<div className="d-flex flex-row justify-content-center">
									<div className="col-12 py-md-3">
										<div className="container" />
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

export default RentalAgreement;
