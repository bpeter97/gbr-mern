import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import GetJobInfo from "./steps/GetJobInfo";
import SelectCustomer from "./steps/SelectCustomer";
import AddProductsToCart from "./steps/AddProductsToCart";
import AlertContainer from "./../alerts/AlertContainer";
import { addOrder } from "./../../actions/orderActions";
import checkEmpty from "./../../utils/checkEmpty";

import {
  setPurchaseType,
  getPurchaseTypes
} from "./../../actions/purchaseActions";

import { clearSuccess } from "./../../redux/modules/success";
import { clearErrors, setErrors } from "./../../redux/modules/error";

class AddOrderForm extends Component {
  constructor() {
    super();
    this.state = {
      currentStep: 1,
      rental: false,
      sales: false,
      rentalResale: ""
    };
  }

  componentDidMount() {
    this.props.getPurchaseTypes();
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
        this.props.setPurchaseType("Rental", "order");
        this.setState({
          rental: target.checked,
          sales: !target.checked,
          rentalResale: target.checked ? "Rental" : "Sales"
        });
      } else if (name === "sales") {
        this.props.setPurchaseType("Sales", "order");
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

    const { purchase, cart } = this.props;

    let order = {};

    if (purchase.order.job === {}) {
      this.props.setErrors("You must enter job information before submitting.");
    } else {
      order = {
        quote: null,
        customer: purchase.order.customer,
        purchaseType: purchase.order.purchaseType,
        job: purchase.order.job,
        products: cart.cart,
        priceBeforeTax: parseFloat(cart.priceBeforeTax),
        salesTax: parseFloat(cart.salesTax),
        totalPrice: parseFloat(cart.totalPrice),
        monthlyPrice: parseFloat(cart.monthlyPrice),
        taxRate: parseFloat(cart.taxRate),
        deliveryTotal: parseFloat(cart.delivery),
        startDate: new Date()
      };

      purchase.purchaseTypes.forEach(type => {
        if (purchase.order.purchaseType === type.type) {
          order.purchaseType = type._id;
        }
      });
    }

    this.props.addOrder(order);
    setTimeout(() => {
      if (checkEmpty(this.props.errors)) {
        this.props.history.push("/orders");
      }
    }, 1000);
  };

  _next = () => {
    this.props.clearSuccess();
    this.props.clearErrors();
    let currentStep = this.state.currentStep;

    switch (currentStep) {
      case 1: {
        if (!this.state.rental && !this.state.sales) {
          this.props.setErrors(
            "You must add items to the order before continuing."
          );
        } else {
          currentStep += 1;
          this.setState({
            currentStep: currentStep
          });
        }
        break;
      }
      case 2: {
        if (this.props.cart.cart.length === 0) {
          this.props.setErrors(
            "You must add items to the order before continuing."
          );
        } else {
          currentStep += 1;
          this.setState({
            currentStep: currentStep
          });
        }
        break;
      }
      case 3: {
        if (
          this.props.purchase.order.customer === "" &&
          this.props.purchase.quote.customer === ""
        ) {
          this.props.setErrors("You must select a customer before continuing.");
        } else {
          currentStep += 1;
          this.setState({
            currentStep: currentStep
          });
        }
        break;
      }
      case 4: {
        break;
      }
      default: {
        break;
      }
    }
  };

  _prev = () => {
    this.props.clearSuccess();
    this.props.clearErrors();
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
    if (currentStep < 4) {
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
    if (currentStep === 4) {
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
          {this.props.errors ? (
            <AlertContainer
              messages={this.props.errors}
              type="Error"
              className="alert alert-danger"
            />
          ) : null}
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
        <SelectCustomer currentStep={this.state.currentStep} />
        <GetJobInfo
          currentStep={this.state.currentStep}
          handleChange={this.handleChange}
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
  location: state.router,
  cart: state.cart,
  success: state.success,
  purchase: state.purchase
});

export default connect(
  mapStateToProps,
  {
    setPurchaseType,
    clearSuccess,
    setErrors,
    clearErrors,
    getPurchaseTypes,
    addOrder
  }
)(AddOrderForm);
