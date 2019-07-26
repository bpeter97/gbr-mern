import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import checkEmpty from "./../../../utils/checkEmpty";
import validator from "validator";
import TextArea from "../../common/TextArea";
import SelectInput from "./../../common/SelectInput";
import AlertContainer from "./../../alerts/AlertContainer";

import { getCustomers, addCustomer } from "./../../../actions/customerActions";
import { setPurchaseCustomer } from "./../../../actions/purchaseActions";

export class SelectCustomer extends Component {
  constructor() {
    super();
    this.state = {
      selectedCustomer: {
        value: "Select One",
        selected: true,
        label: "Select One"
      },
      name: "",
      address1: "",
      address2: "",
      city: "",
      zipcode: "",
      state: "",
      phone: "",
      ext: "",
      fax: "",
      email: "",
      rdp: "",
      notes: "",
      isFlagged: "",
      flagReason: "",
      lastViewed: ""
    };
  }

  componentDidMount() {
    this.props.getCustomers();
  }

  onCustomerSubmit = e => {
    e.preventDefault();

    const customerData = {
      name: this.state.name,
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      zipcode: this.state.zipcode,
      state: this.state.state,
      phone: this.state.phone,
      ext: this.state.ext,
      fax: this.state.fax,
      email: this.state.email,
      rdp: this.state.rdp,
      notes: this.state.notes,
      isFlagged: this.state.isFlagged,
      flagReason: this.state.flagReason
    };
    this.props.addCustomer(customerData, true);
    setTimeout(() => {
      if (checkEmpty(this.state.errors)) {
        let selection = {};

        this.props.customers.customers.forEach(customer => {
          if (
            customer._id === this.props.purchase.order.customer ||
            customer._id === this.props.purchase.quote.customer
          ) {
            selection = {
              value: customer._id,
              selected: true,
              label: customer.name
            };
          }
        });

        this.setState({
          selectedCustomer: selection
        });
      }
    }, 1000);
  };

  setCustomerOptions = customers => {
    var compare = (a, b) => {
      const customerA = a.name.toUpperCase();
      const customerB = b.name.toUpperCase();

      let comparison = 0;

      if (customerA > customerB) {
        comparison = 1;
      } else if (customerA < customerB) {
        comparison = -1;
      }
      return comparison;
    };

    let custOptions = [this.state.selectedCustomer];

    customers.sort(compare);

    customers.forEach(customer => {
      custOptions.push({
        value: customer._id,
        selected: false,
        label: customer.name
      });
    });

    return custOptions;
  };

  setSelectedCustomer = e => {
    let customer = e.target.value;
    this.props.setPurchaseCustomer(customer);
    this.setState({
      selectedCustomer: {
        value: customer._id,
        selected: true,
        label: customer.name
      }
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.props;
    const { customers } = this.props.customers;

    if (this.props.currentStep !== 3) {
      // Prop: The current step
      return (
        <div className="form-group add-order-step-component component-fade-out" />
      );
    }

    let isValid = "form-control is-valid";
    let isInvalid = "form-control is-invalid";

    let valid = {
      name: this.state.name ? isValid : isInvalid,
      phone: validator.isMobilePhone(this.state.phone) ? isValid : isInvalid,
      ext: this.state.ext ? isValid : isInvalid,
      fax: validator.isMobilePhone(this.state.fax) ? isValid : isInvalid,
      email: validator.isEmail(this.state.email) ? isValid : isInvalid,
      address1: this.state.address1 ? isValid : isInvalid,
      address2: this.state.address2 ? isValid : isInvalid,
      city: this.state.city ? isValid : isInvalid,
      state: this.state.state ? isValid : isInvalid,
      zipcode: this.state.zipcode ? isValid : isInvalid
    };

    let custOptions = this.setCustomerOptions(customers);

    return (
      <div className="form-group add-order-step-component component-fade-in">
        {this.props.success.message ? (
          <AlertContainer
            messages={this.props.success}
            type="Success"
            className="alert alert-success"
          />
        ) : null}
        {errors ? (
          <AlertContainer
            messages={errors}
            type="Error"
            className="alert alert-danger"
          />
        ) : null}
        <div className="d-flex flex-row text-center justify-content-center">
          <div className="col-sm-12">
            <SelectInput
              className="form-control"
              label="Select a Customer"
              selectId="customer"
              name="customer"
              onChange={this.setSelectedCustomer}
              options={custOptions}
              help="Select a customer, if customer does not exist, click the 'New Customer' button below to add a new customer."
            />
          </div>
        </div>
        <div className="d-flex flex-row text-center justify-content-center mt-5">
          <div className="col-sm-12">
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#newCustModal"
            >
              New Customer
            </button>

            <div
              className="modal fade"
              id="newCustModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="newCustomerModal"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-scrollable modal-lg"
                role="document"
                show={this.state.isModalOpen}
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="newCustomerModal">
                      New Customer
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body text-left">
                    {errors ? (
                      <AlertContainer
                        messages={errors}
                        type="Error"
                        className="alert alert-danger"
                      />
                    ) : null}
                    <div className="col-md-12">
                      <label>Name</label>
                      <input
                        type="text"
                        className={valid.name}
                        placeholder="e.g. John Smith"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                      />
                      <small className="form-text text-muted">
                        {this.state.name
                          ? "Looks good!"
                          : "Enter customer's name."}
                      </small>
                      <div className="form-row pt-2">
                        <div className="col-sm-12 col-md">
                          <label>Phone</label>
                          <input
                            type="text"
                            className={valid.phone}
                            placeholder="e.g. 555-555-5555"
                            name="phone"
                            value={this.state.phone}
                            onChange={this.onChange}
                          />
                          <small className="form-text text-muted">
                            {validator.isMobilePhone(this.state.phone)
                              ? "Looks good!"
                              : "Enter customer's phone number."}
                          </small>
                        </div>
                        <div className="col-sm-12 col-md">
                          <label>Extension</label>
                          <input
                            type="text"
                            className={valid.ext}
                            placeholder="e.g. 1234"
                            name="ext"
                            value={this.state.ext}
                            onChange={this.onChange}
                          />
                          <small className="form-text text-muted">
                            {this.state.ext.length > 2
                              ? "Looks good!"
                              : "Enter customer's phone extension if necessary."}
                          </small>
                        </div>
                      </div>
                      <div className="form-row pt-2">
                        <div className="col-sm-12 col-md">
                          <label>Fax</label>
                          <input
                            type="text"
                            className={valid.fax}
                            placeholder="e.g. 555-555-5555"
                            name="fax"
                            value={this.state.fax}
                            onChange={this.onChange}
                          />
                          <small className="form-text text-muted">
                            {validator.isMobilePhone(this.state.fax)
                              ? "Looks good!"
                              : "Enter customer's fax number."}
                          </small>
                        </div>
                      </div>
                      <div className="form-row pt-2">
                        <div className="col-sm-12 col-md">
                          <label>Email</label>
                          <input
                            type="text"
                            className={valid.email}
                            placeholder="e.g. john.smith@example.com"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                          />
                          <small className="form-text text-muted">
                            {validator.isEmail(this.state.email)
                              ? "Looks good!"
                              : "Enter customer's email address."}
                          </small>
                        </div>
                      </div>

                      <div className="form-row pt-2">
                        <div className="col-sm-12 col-md">
                          <label>Address 1</label>
                          <input
                            type="text"
                            className={valid.address1}
                            placeholder="e.g. 6988 Ave 304"
                            name="address1"
                            value={this.state.address1}
                            onChange={this.onChange}
                          />
                          <small className="form-text text-muted">
                            {this.state.address1
                              ? "Looks good!"
                              : "Enter customer's address."}
                          </small>
                        </div>
                        <div className="col-sm-12 col-md">
                          <label>Address 2</label>
                          <input
                            type="text"
                            className={valid.address2}
                            placeholder="e.g. Ste 106"
                            name="address2"
                            value={this.state.address2}
                            onChange={this.onChange}
                          />
                          <small className="form-text text-muted">
                            {this.state.address2
                              ? "Looks good!"
                              : "Enter customer's suite # / apt #."}
                          </small>
                        </div>
                      </div>
                      <div className="form-row pt-2">
                        <div className="col-sm-12 col-md">
                          <label>City</label>
                          <input
                            type="text"
                            className={valid.city}
                            placeholder="e.g. Visalia"
                            name="city"
                            value={this.state.city}
                            onChange={this.onChange}
                          />
                          <small className="form-text text-muted">
                            {this.state.city
                              ? "Looks good!"
                              : "Enter customer's city."}
                          </small>
                        </div>
                        <div className="col-sm-12 col-md">
                          <label>State</label>
                          <input
                            type="text"
                            className={valid.state}
                            placeholder="e.g. C.A."
                            name="state"
                            value={this.state.state ? this.state.state : "C.A."}
                            onChange={this.onChange}
                          />
                          <small className="form-text text-muted">
                            {this.state.state
                              ? "Looks good!"
                              : "Enter customer's state."}
                          </small>
                        </div>
                      </div>
                      <div className="form-row pt-2">
                        <div className="col-sm-12 col-md">
                          <label>Zipcode</label>
                          <input
                            type="text"
                            className={valid.zipcode}
                            placeholder="e.g. 93291"
                            name="zipcode"
                            value={this.state.zipcode}
                            onChange={this.onChange}
                          />
                          <small className="form-text text-muted">
                            {this.state.zipcode
                              ? "Looks good!"
                              : "Enter customer's zipcode."}
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group pt-2">
                        <label>RDP</label>
                        <TextArea
                          name="rdp"
                          className="form-control"
                          value={this.state.rdp}
                          onChange={this.onChange}
                          error={errors}
                        />
                        <small className="form-text text-muted">
                          Enter the RDP #.
                        </small>
                      </div>

                      <div className="form-group">
                        <label>Notes</label>
                        <TextArea
                          name="notes"
                          className="form-control"
                          value={this.state.notes}
                          onChange={this.onChange}
                          error={errors}
                        />
                        <small className="form-text text-muted">
                          Enter any notes.
                        </small>
                      </div>

                      <SelectInput
                        className="form-control"
                        label="Is Flagged?"
                        selectId="isFlagged"
                        name="isFlagged"
                        onChange={this.onChange}
                        options={[
                          {
                            value: "Select One",
                            selected: true,
                            label: "Select One"
                          },
                          { value: true, selected: false, label: "Yes" },
                          { value: false, selected: false, label: "No" }
                        ]}
                        help="Select whether or not this customer will be flagged."
                      />

                      <div className="form-group pt-2">
                        <label>Flag Reason</label>
                        <TextArea
                          name="flagReason"
                          className="form-control"
                          value={this.state.flagReason}
                          onChange={this.onChange}
                          error={errors}
                        />
                        <small className="form-text text-muted">
                          Enter the flag reason if there is one.
                        </small>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-row">
                        <div className="col text-left">
                          <input
                            type="button"
                            className="btn btn-info mt-2"
                            value="Cancel"
                            data-dismiss="modal"
                            aria-label="Close"
                          />
                        </div>
                        <div className="col text-right">
                          <input
                            type="button"
                            className="btn btn-info mt-2"
                            value="Submit"
                            data-dismiss="modal"
                            onClick={this.onCustomerSubmit}
                          />
                        </div>
                      </div>
                    </div>
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

SelectCustomer.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success: state.success,
  location: state.router,
  customers: state.customers,
  purchase: state.purchase
});

export default connect(
  mapStateToProps,
  { getCustomers, setPurchaseCustomer, addCustomer }
)(SelectCustomer);
