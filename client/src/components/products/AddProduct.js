import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AddProductForm from "./AddProductForm";
import { getProductTypes } from "./../../redux/modules/product";

// Components
import Shortcuts from "../dashboard/Shortcuts";

class AddProduct extends Component {
	componentDidMount() {
		this.props.getProductTypes();
	}

	onFormSubmit() {
		this.props.history.push("/products");
	}

	render() {
		return (
			<div className="container-fluid main-content">
				<Shortcuts history={this.props.history} />
				<div className="row justify-content-center">
					<div className="col-sm-12 pb-4">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title text-center py-2">Add Product</h5>
								<div className="d-flex flex-row justify-content-center">
									<div className="col-12 py-md-3 pl-md-5">
										<AddProductForm history={this.props.history} />
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

AddProduct.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	location: state.router
});

export default connect(
	mapStateToProps,
	{ getProductTypes }
)(AddProduct);
