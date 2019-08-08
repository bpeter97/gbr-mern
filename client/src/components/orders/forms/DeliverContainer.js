import React, { Component } from "react";
import { connect } from "react-redux";

export class DeliverContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			containers: this.props.containers.containers
		};
	}

	render() {
		const cons = this.props.containers.containers;
		const { order } = this.props;

		let containers = cons.filter(c => {
			return c.rentalResale == order.purchaseType.type;
		});

		let form;

		if (containers) {
			form = (
				<form>
					<div className="form-group">
						<label htmlFor="containerSelect">Select a Container</label>
						<select className="form-control" id="containerSelect">
							{containers.map(container => {
								return (
									<option key={container._id} value={container._id}>
										{container.serialNumber}
									</option>
								);
							})}
						</select>
					</div>
				</form>
			);
		} else {
			// No containers loaded from getContainers()
			form = (
				<form>
					<p>There are no containers loaded.</p>
				</form>
			);
		}

		return form;
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	containers: state.containers,
	order: state.orders.order
});

export default connect(
	mapStateToProps,
	{}
)(DeliverContainer);
