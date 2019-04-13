import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { addProduct } from "../../actions/productActions";
import SelectInput from "../common/SelectInput";
import ErrorAlert from "../alerts/ErrorAlert";

class AddProductForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      shortName: "",
      price: 0,
      monthlyPrice: 0,
      rental: false,
      type: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const productData = {
      name: this.state.name,
      shortName: this.state.shortName,
      price: this.state.price,
      monthlyPrice: this.state.monthlyPrice,
      rental: this.state.rental,
      type: this.state.type
    };
    this.props.addProduct(productData);
    this.props.redirectFunc();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, types } = this.props;

    console.log(types);

    let rentalSelect = [
      { value: null, selected: true, label: "Select One" },
      { value: true, selected: false, label: "Rental" },
      { value: false, selected: false, label: "Sales" }
    ];

    let typeSelect = [
      { value: null, selected: true, label: "Select One" },
      { value: true, selected: false, label: "Rental" },
      { value: false, selected: false, label: "Sales" }
    ];

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
            label="Product Name"
            className="form-control"
            value={this.state.name}
            onChange={this.onChange}
            error={errors}
          />
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
          <div className="form-row pt-2">
            <TextFieldGroup
              name="price"
              type="number"
              label="Price"
              divClass="col"
              className="form-control"
              value={this.state.price}
              onChange={this.onChange}
              error={errors}
            />
            <TextFieldGroup
              name="monthlyPrice"
              type="number"
              label="Monthly Price (if rental product)"
              divClass="col"
              className="form-control"
              value={this.state.monthlyPrice}
              onChange={this.onChange}
              error={errors}
            />
          </div>
          <div className="form-row pt-2">
            <SelectInput
              className="form-control"
              label="Rental Type"
              divClass="col"
              selectId="rental"
              name="rental"
              onChange={this.onChange}
              options={rentalSelect}
            />
            <SelectInput
              className="form-control"
              label="Type"
              selectId="type"
              name="type"
              divClass="col"
              onChange={this.onChange}
              options={typeSelect}
            />
          </div>
          <input type="submit" className="btn btn-info mt-2" />
        </div>
      </form>
    );

    return form;
  }
}

AddProductForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  location: state.router,
  types: state.products.types
});

export default connect(
  mapStateToProps,
  { addProduct }
)(AddProductForm);
