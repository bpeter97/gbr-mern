import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldInput from "../common/TextFieldInput";
import { loginUser } from "../../actions/defaultsActions";
import ErrorDisplay from "../error/ErrorDisplay";

class EditCustomer extends Component {
  constructor(props) {
    super(props);
    let fillProps = "";
    if (props.location.state) {
      fillProps = props.location.state.data._original;
    }
    this.state = {
      first: fillProps.first || "",
      last: fillProps.last || "",
      address1: fillProps.address1 || "",
      address2: fillProps.address2 || "",
      city: fillProps.city || "",
      zipcode: fillProps.zipcode || "",
      state: fillProps.state || "",
      phone: fillProps.phone || "",
      ext: fillProps.ext || "",
      fax: fillProps.fax || "",
      email: fillProps.email || "",
      rdp: fillProps.rdp || "",
      notes: fillProps.notes || "",
      isFlagged: fillProps.isFlagged || "",
      flagReason: fillProps.flagReason || "",
      lastViewed: fillProps.lastViewed || ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    //   this.props.getCustomer(value);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const customerData = {
      first: this.state.first,
      last: this.state.last,
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
      flagReason: this.state.flagReason,
      lastViewed: Date.now().toString()
    };
    console.log(customerData);
    // this.props.editCustomer(customerData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { location } = this.props;
    const { errors } = this.state;

    return (
      <div className="col-10">
        <div className="m-auto w-lg-75 w-xl-50">
          <h2 className="text-center font-weight-light mb-5">Edit Customer</h2>
          <form onSubmit={this.onSubmit}>
            <ErrorDisplay error={errors} />
            <div className="form-row">
              <div className="col form-group">
                <label>First</label>
                <TextFieldInput
                  name="first"
                  type="text"
                  className="form-control"
                  value={this.state.first}
                  onChange={this.onChange}
                  error={errors}
                />
              </div>
              <div className="col">
                <label>Last</label>
                <TextFieldInput
                  name="lastname"
                  type="lastname"
                  className="form-control"
                  value={this.state.last}
                  onChange={this.onChange}
                  error={errors}
                />
              </div>
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
              <div className="col form-group">
                <label>Flagged?</label>
                <TextFieldInput
                  name="isFlagged"
                  type="isFlagged"
                  className="form-control"
                  value={this.state.isFlagged}
                  onChange={this.onChange}
                  error={errors}
                />
              </div>
              <div className="col form-group">
                <label>Flag Reason</label>
                <TextFieldInput
                  name="flagReason"
                  type="flagReason"
                  className="form-control"
                  value={this.state.flagReason}
                  onChange={this.onChange}
                  error={errors}
                />
              </div>
            </div>

            <input type="submit" className="btn btn-info mt-2" />
          </form>
        </div>
      </div>
    );
  }
}

EditCustomer.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  location: state.router.location
});

export default connect(mapStateToProps, {})(EditCustomer);
