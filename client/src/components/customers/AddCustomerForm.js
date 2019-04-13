import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { addCustomer } from "../../actions/customerActions";
import TextArea from "../common/TextArea";
import SelectInput from "./../common/SelectInput";
import ErrorAlert from "../alerts/ErrorAlert";
import checkEmpty from "./../../utils/checkEmpty";

class AddCustomerForm extends Component {
  constructor() {
    super();
    this.state = {
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
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      state.errors = props.errors;
    }
    return null;
  }

  onSubmit(e) {
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
    this.props.addCustomer(customerData);
    setTimeout(() => {
      if (checkEmpty(this.state.errors)) {
        this.props.history.push("/customers");
      }
    }, 1000);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.props;

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
              name="phone"
              type="text"
              label="Phone (Work)"
              divClass="col"
              className="form-control"
              value={this.state.phone}
              onChange={this.onChange}
              error={errors}
            />
            <TextFieldGroup
              name="ext"
              type="text"
              label="Ext"
              divClass="col"
              className="form-control"
              value={this.state.ext}
              onChange={this.onChange}
              error={errors}
            />
          </div>
          <div className="form-row pt-2">
            <TextFieldGroup
              name="fax"
              type="text"
              label="Fax"
              divClass="col"
              className="form-control"
              value={this.state.fax}
              onChange={this.onChange}
              error={errors}
            />
          </div>
          <div className="form-row pt-2">
            <TextFieldGroup
              name="email"
              type="email"
              label="Email"
              divClass="col"
              className="form-control"
              value={this.state.email}
              onChange={this.onChange}
              error={errors}
            />
          </div>
          <div className="form-row pt-2">
            <TextFieldGroup
              name="address1"
              type="text"
              label="Address 1"
              divClass="col"
              className="form-control"
              value={this.state.address1}
              onChange={this.onChange}
              error={errors}
            />
            <TextFieldGroup
              name="address2"
              type="text"
              label="Address 2"
              divClass="col"
              className="form-control"
              value={this.state.address2}
              onChange={this.onChange}
              error={errors}
            />
          </div>

          <div className="form-row pt-2">
            <TextFieldGroup
              name="city"
              type="text"
              label="City"
              divClass="col"
              className="form-control"
              value={this.state.city}
              onChange={this.onChange}
              error={errors}
            />

            <TextFieldGroup
              name="state"
              type="text"
              label="State"
              divClass="col"
              className="form-control"
              value={this.state.state}
              onChange={this.onChange}
              error={errors}
            />
          </div>
          <div className="form-row pt-2">
            <TextFieldGroup
              name="zipcode"
              type="text"
              label="Zipcode"
              divClass="col"
              className="form-control"
              value={this.state.zipcode}
              onChange={this.onChange}
              error={errors}
            />
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
          </div>

          <SelectInput
            className="form-control"
            label="Is Flagged?"
            selectId="isFlagged"
            name="isFlagged"
            onChange={this.onChange}
            options={[
              { value: true, selected: true, label: "Select One" },
              { value: true, selected: false, label: "Yes" },
              { value: false, selected: false, label: "No" }
            ]}
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
          </div>
          <input type="submit" className="btn btn-info mt-2" />
        </div>
      </form>
    );

    return form;
  }
}

AddCustomerForm.propTypes = {
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
  { addCustomer }
)(AddCustomerForm);
