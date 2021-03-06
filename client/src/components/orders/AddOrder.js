import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Sub-components
import Shortcuts from "../dashboard/Shortcuts";
import AddOrderForm from "../orders/AddOrderForm";

// Import Actions
import { getProducts } from "./../../redux/modules/product";

class AddOrder extends Component {
	constructor() {
		super();
		this.state = {
			formName: "Add Order"
		};
	}

	componentDidMount() {
		this.props.getProducts();
	}

	changeOrderName = name => {
		if (name !== this.state.formName) {
			this.setState({ formName: name });
		}
	};

	render() {
		return (
			<div className="container-fluid main-content">
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
										<AddOrderForm
											history={this.props.history}
											changeName={this.changeOrderName}
											products={this.props.products.products}
										/>
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

AddOrder.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	location: state.router,
	products: state.products
});

export default connect(
	mapStateToProps,
	{ getProducts }
)(AddOrder);
