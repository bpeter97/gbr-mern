import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectInput from "./../common/SelectInput";
import { editProduct } from "../../actions/productActions";
import ErrorAlert from "../alerts/ErrorAlert";
import checkEmpty from "./../../utils/checkEmpty";

class EditProductFom extends Component {
  constructor() {
    super();
    this.state = {
      product: {},
      name: "",
      shortName: "",
      price: 0,
      monthlyPrice: 0,
      rental: false,
      type: ""
    };
  }

  componentDidMount() {
    let { product } = this.props;
    this.fillForm(product);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      state.errors = props.errors;
      return state;
    }
    return null;
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
        this.props.history.push("/products");
      }
    }, 1000);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fillForm = product => {
    this.setState({
      name: product.name || "",
      shortName: product.shortName || "",
      price: product.price || 0,
      monthlyPrice: product.monthlyPrice || 0,
      rental: product.rental || false,
      typeObj: product.type || "",
      type: product.type ? product.type._id : "" || ""
    });
  };

  render() {
    const { errors, types, product } = this.props;

    let rentalSelect;
    if (product.rental) {
      rentalSelect = [
        { value: true, selected: true, label: "Rental" },
        { value: false, selected: false, label: "Sales" }
      ];
    } else {
      rentalSelect = [
        { value: false, selected: true, label: "Sales" },
        { value: true, selected: false, label: "Rental" }
      ];
    }

    let typeSelect = [];
    let selectedTypeIndex = 0;
    types.forEach(element => {
      if (element) {
        let selection = {};
        selection.value = element._id;
        selection.label =
          element.type.charAt(0).toUpperCase() + element.type.slice(1);

        if (product.type) {
          if (element.type === product.type.type) {
            selection.selected = true;
            typeSelect[0] = selection;
          } else {
            selectedTypeIndex++;
            selection.selected = false;
            typeSelect[selectedTypeIndex] = selection;
          }
        }
      }
    });

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
          <div className="form-row pt-2">
            <TextFieldGroup
              name="name"
              type="text"
              label="Name"
              divClass="col"
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
          </div>
          <div className="form-row pt-2">
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
            <TextFieldGroup
              name="monthlyPrice"
              type="text"
              label="Monthly Price"
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
              label="Rental or Sales Mod?"
              selectId="rental"
              name="rental"
              divClass="col"
              onChange={this.onChange}
              options={rentalSelect}
            />
          </div>
          <div className="form-row pt-2">
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
          <input type="submit" className="btn btn-info mt-4" />
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
  location: state.router,
  types: state.products.types
});

export default connect(
  mapStateToProps,
  { editProduct }
)(EditProductFom);
