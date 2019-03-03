import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { editProduct } from "../../actions/productActions";
import ErrorAlert from "./../error/ErrorAlert";
import checkEmpty from "./../../utils/checkEmpty";

class EditProductFom extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      shortName: "",
      price: 0,
      monthlyPrice: 0,
      rental: "",
      type: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.fillForm = this.fillForm.bind(this);
  }

  componentDidMount() {
    let { product } = this.props;
    this.fillForm(product);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      state.errors = props.errors;
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const productData = {
      _id: this.props.product._id,
      name: this.state.name,
      shortName: this.state.shortName,
      price: this.state.price,
      monthlyPrice: this.state.monthlyPrice,
      rental: this.state.rental,
      type: this.state.type
    };
    this.props.editProduct(productData);
    setTimeout(() => {
      if (checkEmpty(this.state.errors)) {
        this.props.history.push("/customers");
      }
    }, 1000);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fillForm(product) {
    this.setState({
      name: product.name || "",
      shortName: product.shortName || "",
      price: product.price || 0,
      monthlyPrice: product.monthlyPrice || 0,
      rental: product.rental || false,
      type: product.type || ""
    });
  }

  render() {
    const { errors } = this.props;

    let rental = this.props.rental ? "Rental" : "Sales";

    var errorAlert = errors => {
      for (var property in errors) {
        var error;
        if (errors.hasOwnProperty(property)) {
          error = errors[property];
        }

        return <ErrorAlert error={error} />;
      }
    };

    let form = (
      <form onSubmit={this.onSubmit}>
        {errorAlert(this.state.errors)}
        <div className="col-md-12">
          <TextFieldGroup
            name="name"
            type="text"
            label="Name"
            className="form-control"
            value={this.state.name}
            onChange={this.onChange}
            error={errors}
          />
          <div className="form-row pt-2">
            <TextFieldGroup
              name="shortName"
              type="text"
              label="Short Name"
              divClass="col"
              className="form-control"
              value={this.state.shortName}
              onChange={this.onChange}
              error={errors}
            />
            <TextFieldGroup
              name="price"
              type="text"
              label="Sale Price"
              divClass="col"
              className="form-control"
              value={this.state.price}
              onChange={this.onChange}
              error={errors}
            />
          </div>
          <div className="form-row pt-2">
            <TextFieldGroup
              name="rental"
              type="text"
              label="Rental or Sale Mod"
              divClass="col"
              className="form-control"
              value={rental}
              onChange={this.onChange}
              error={errors}
            />
          </div>
          <div className="form-row pt-2">
            <TextFieldGroup
              name="type"
              type="text"
              label="Type"
              divClass="col"
              className="form-control"
              value={this.state.type.type}
              onChange={this.onChange}
              error={errors}
            />
          </div>
          <input type="submit" className="btn btn-info mt-2" />
        </div>
      </form>
    );

    return form;
  }
}

EditProductFom.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  product: state.products.product,
  location: state.router
});

export default connect(
  mapStateToProps,
  { editProduct }
)(EditProductFom);
