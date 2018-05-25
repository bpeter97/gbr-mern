import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import Spinner from "../common/Spinner";
import { editCustomer } from "../../actions/customerActions";
import TextArea from "../common/TextArea";

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
      _id: this.props.customer._id,
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
    this.props.editCustomer(customerData);
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
      <form className="" onSubmit={this.onSubmit}>
        <TextFieldGroup
          name="name"
          type="text"
          label="Name"
          className="form-control"
          value={this.state.name}
          onChange={this.onChange}
          error={errors}
        />

        <TextFieldGroup
          name="address1"
          type="text"
          label="Address 1"
          className="form-control"
          value={this.state.address1}
          onChange={this.onChange}
          error={errors}
        />

        <TextFieldGroup
          name="address2"
          type="text"
          label="Address 2"
          className="form-control"
          value={this.state.address2}
          onChange={this.onChange}
          error={errors}
        />

        <div className="form-row">
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

        <div className="form-row">
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
        <TextFieldGroup
          name="fax"
          type="text"
          label="Fax"
          className="form-control"
          value={this.state.fax}
          onChange={this.onChange}
          error={errors}
        />
        <TextFieldGroup
          name="email"
          type="email"
          label="Email"
          className="form-control"
          value={this.state.email}
          onChange={this.onChange}
          error={errors}
        />

        <div className="form-group">
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

        <TextFieldGroup
          name="isFlagged"
          type="isFlagged"
          label="Flagged?"
          className="form-control"
          value={this.state.isFlagged}
          onChange={this.onChange}
          error={errors}
        />

        <div className="form-group">
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
      </form>
    );

    return form;
  }
}

EditCustomerForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  customer: state.customers.customer,
  location: state.router
});

export default connect(mapStateToProps, { editCustomer })(EditCustomerForm);
