import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { GetJobInfo } from "./GetJobInfo";
import AddProductsToCart from "./AddProductsToCart";

class AddOrderForm extends Component {
  constructor() {
    super();
    this.state = {
      currentStep: 1,
      rental: false,
      sales: false,
      email: "",
      username: "",
      password: "",
      rentalResale: ""
    };
  }

  static getDerivedStateFromProps(props, current_state) {
    switch (current_state.currentStep) {
      case 1:
        props.changeName("Add Order");
        break;
      case 2:
        props.changeName("Select Products");
        break;
      case 3:
        props.changeName("Select Customer");
        break;
      case 4:
        props.changeName("Job Information");
        break;
      default:
        props.changeName("Add Order");
        break;
    }
    return null;
  }

  handleChange = event => {
    const target = event.target;
    const { name, value, type } = target;

    if (type === "checkbox") {
      if (name === "rental") {
        this.setState({
          rental: target.checked,
          sales: !target.checked,
          rentalResale: target.checked ? "Rental" : "Sales"
        });
      } else if (name === "sales") {
        this.setState({
          rental: !target.checked,
          sales: target.checked,
          rentalResale: target.checked ? "Sales" : "Rental"
        });
      } else {
        return null;
      }
    } else {
      this.setState({
        [name]: value
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, username, password, rentalResale } = this.state;
    alert(`Your registration detail: \n
           RentalResale: ${rentalResale} \n 
           Email: ${email} \n 
           Username: ${username} \n
           Password: ${password}`);
  };

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep
    });
  };

  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button
          className="btn btn-secondary"
          type="button"
          onClick={this._prev}
        >
          Previous
        </button>
      );
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 3) {
      return (
        <button
          className="btn btn-primary float-right"
          type="button"
          onClick={this._next}
        >
          Next
        </button>
      );
    }
    return null;
  }

  submitButton() {
    let currentStep = this.state.currentStep;
    if (currentStep === 3) {
      return (
        <button
          className="btn btn-primary float-right"
          type="submit"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      );
    }
    return null;
  }

  render() {
    var step1 = "";

    if (this.state.currentStep !== 1) {
      step1 = (
        <div className="form-group add-order-step-component component-fade-out" />
      );
    } else {
      step1 = (
        <div className="form-group add-order-step-component component-fade-in">
          <div className="form-check d-flex flex-row text-center justify-content-center">
            <div className="col-sm-12 col-md-5">
              <label
                htmlFor="rental"
                className="btn btn-default order-form-buttons"
              >
                Rental{" "}
                <input
                  type="checkbox"
                  name="rental"
                  id="rental"
                  className="badgebox"
                  checked={this.state.rental}
                  onChange={this.handleChange}
                />
                <span className="badge">&#10004;</span>
              </label>
            </div>
            <div className="col-sm-12 col-md-5">
              <label
                htmlFor="sales"
                className="btn btn-default order-form-buttons"
              >
                Sales{" "}
                <input
                  type="checkbox"
                  name="sales"
                  id="sales"
                  className="badgebox"
                  checked={this.state.sales}
                  onChange={this.handleChange}
                />
                <span className="badge">&#10004;</span>
              </label>
            </div>
          </div>
        </div>
      );
    }

    let form = (
      <form onSubmit={this.handleSubmit}>
        {step1}
        <AddProductsToCart
          currentStep={this.state.currentStep}
          handleChange={this.handleChange}
          username={this.state.username}
          products={this.props.products}
          rental={this.state.rental}
        />
        <GetJobInfo
          currentStep={this.state.currentStep}
          handleChange={this.handleChange}
          password={this.state.password}
        />
        {this.previousButton()}
        {this.nextButton()}
        {this.submitButton()}
      </form>
    );

    return form;
  }
}

AddOrderForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  location: state.router
});

export default connect(
  mapStateToProps,
  {}
)(AddOrderForm);
