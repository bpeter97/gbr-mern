import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldInput from "../common/TextFieldInput";
import Spinner from "../common/Spinner";
import { getCustomerForm } from "../../actions/customerActions";

class EditCustomerForm extends Component {
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
    this.fillForm = this.fillForm.bind(this);
  }

  componentDidMount() {
    let { customer } = this.props;
    this.fillForm(customer);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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
    console.log(customerData);
    // this.props.editCustomer(customerData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  fillForm(customer) {
    this.setState({
      name: customer.name || "",
      address1: customer.address1 || "",
      address2: customer.address2 || "",
      city: customer.city || "",
      zipcode: customer.zipcode || "",
      state: customer.state || "",
      phone: customer.phone || "",
      ext: customer.ext || "",
      fax: customer.fax || "",
      email: customer.email || "",
      rdp: customer.rdp || "",
      notes: customer.notes || "",
      isFlagged: customer.isFlagged || "",
      flagReason: customer.flagReason || "",
      lastViewed: customer.lastViewed || ""
    });
  }

  render() {
    const { errors } = this.props;
    let form = (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <TextFieldInput
            name="name"
            type="name"
            className="form-control"
            value={this.state.name}
            onChange={this.onChange}
            error={errors}
          />
        </div>
        <div className=" form-group">
          <label>Address 1</label>
          <TextFieldInput
            name="address1"
            type="address1"
            className="form-control"
            value={this.state.address1}
            onChange={this.onChange}
            error={errors}
          />
        </div>
        <div className="form-group">
          <label>Address 2</label>
          <TextFieldInput
            name="address2"
            type="address2"
            className="form-control"
            value={this.state.address2}
            onChange={this.onChange}
            error={errors}
          />
        </div>
        <div className="form-row">
          <div className="col form-group">
            <label>City</label>
            <TextFieldInput
              name="city"
              type="city"
              className="form-control"
              value={this.state.city}
              onChange={this.onChange}
              error={errors}
            />
          </div>
          <div className="col form-group">
            <label>State</label>
            <TextFieldInput
              name="state"
              type="state"
              className="form-control"
              value={this.state.state}
              onChange={this.onChange}
              error={errors}
            />
          </div>
          <div className="col form-group">
            <label>Zipcode</label>
            <TextFieldInput
              name="zipcode"
              type="zipcode"
              className="form-control"
              value={this.state.zipcode}
              onChange={this.onChange}
              error={errors}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="col form-group">
            <label>Phone (Work)</label>
            <TextFieldInput
              name="phone"
              type="phone"
              className="form-control"
              value={this.state.phone}
              onChange={this.onChange}
              error={errors}
            />
          </div>
          <div className="col form-group">
            <label>Ext</label>
            <TextFieldInput
              name="ext"
              type="ext"
              className="form-control"
              value={this.state.ext}
              onChange={this.onChange}
              error={errors}
            />
          </div>
          <div className="col form-group">
            <label>Fax</label>
            <TextFieldInput
              name="fax"
              type="fax"
              className="form-control"
              value={this.state.fax}
              onChange={this.onChange}
              error={errors}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Email</label>
          <TextFieldInput
            name="email"
            type="email"
            className="form-control"
            value={this.state.email}
            onChange={this.onChange}
            error={errors}
          />
        </div>

        <div className="form-group">
          <label>RDP</label>
          <TextFieldInput
            name="rdp"
            type="rdp"
            className="form-control"
            value={this.state.rdp}
            onChange={this.onChange}
            error={errors}
          />
        </div>
        <div className="form-group">
          <label>Notes</label>
          <TextFieldInput
            name="notes"
            type="notes"
            className="form-control"
            value={this.state.notes}
            onChange={this.onChange}
            error={errors}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Flagged?</label>
            <select name="isFlagged" value={this.state.isFlagged}>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="form-group">
            <label>
              Flag Reason
              <textarea name="flagReason" id="" value={this.state.flagReason} />
            </label>
          </div>
        </div>

        <input type="submit" className="btn btn-info mt-2" />
      </form>
    );

    return form;
  }
}

EditCustomerForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  customer: state.customers.customer
});

export default connect(mapStateToProps)(EditCustomerForm);
