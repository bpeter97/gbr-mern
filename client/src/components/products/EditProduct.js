import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import {
	getProduct,
	clearProduct,
	getProductTypes
} from "./../../redux/modules/product";
import EditProductForm from "./EditProductForm";

// Components
import Shortcuts from "../dashboard/Shortcuts";

class EditProduct extends Component {
	componentDidMount() {
		let hasState = this.props.location.location.state;
		let id = "";
		if (!hasState) {
			this.props.history.push("/products");
		} else {
			id = hasState.id;
			this.props.getProduct(id);
			this.props.getProductTypes();
		}
	}

	render() {
		const { product, loading } = this.props.products;
		let form = "";
		if (product === null || loading) {
			form = <Spinner />;
		} else {
			form = (
				<EditProductForm
					product={this.props.product}
					history={this.props.history}
				/>
			);
		}

		return (
			<div className="container-fluid main-content">
				<Shortcuts history={this.props.history} />
				<div className="row justify-content-center">
					<div className="col-sm-12 pb-4">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title text-center py-2">Edit Product</h5>
								<div className="d-flex flex-row justify-content-center">
									<div className="col-12 py-md-3 pl-md-5">{form}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

EditProduct.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	products: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	location: state.router,
	products: state.products
});

export default connect(
	mapStateToProps,
	{ getProduct, clearProduct, getProductTypes }
)(EditProduct);
