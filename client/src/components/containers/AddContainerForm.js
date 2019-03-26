import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { addContainer } from "../../actions/containerActions";
import TextArea from "../common/TextArea";
import SelectInput from "../common/SelectInput";
import ErrorAlert from "../alerts/ErrorAlert";

class AddCustomerForm extends Component {
  constructor() {
    super();
    this.state = {
      gbrNumber: "",
      releaseNumber: "",
      size: "",
      serialNumber: "",
      hasShelves: false,
      isPainted: false,
      hasOnBoxNumbers: false,
      hasSigns: false,
      rentalResale: "",
      isFlagged: false,
      flagReason: ""
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

    const containerData = {
      gbrNumber: this.state.gbrNumber,
      releaseNumber: this.state.releaseNumber,
      size: this.state.size,
      serialNumber: this.state.serialNumber,
      hasShelves: this.state.hasShelves,
      isPainted: this.state.isPainted,
      hasOnBoxNumbers: this.state.hasOnBoxNumbers,
      hasSigns: this.state.hasSigns,
      rentalResale: this.state.rentalResale,
      isFlagged: this.state.isFlagged,
      flagReason: this.state.flagReason
    };
    this.props.addContainer(containerData);
    this.props.redirectFunc();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, sizes } = this.props;

    let rentalResaleSelect = [
      { value: null, selected: true, label: "Select One" },
      { value: "Rental", selected: false, label: "Rental" },
      { value: "Sales", selected: false, label: "Sales" }
    ];

    let sizeSelect = [{ value: null, selected: true, label: "Select One" }];

    sizes.forEach(size => {
      sizeSelect.push({
        value: size._id,
        selected: false,
        label: size.size
      });
    });

    let yesNoSelect = [
      { value: null, selected: true, label: "Select One" },
      { value: true, selected: false, label: "Yes" },
      { value: false, selected: false, label: "No" }
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
            name="gbrNumber"
            type="text"
            label="GBR Number"
            className="form-control"
            value={this.state.gbrNumber}
            onChange={this.onChange}
            error={errors}
          />
          <div className="form-row pt-2">
            <TextFieldGroup
              name="serialNumber"
              type="text"
              label="Serial Number"
              divClass="col"
              className="form-control"
              value={this.state.serialNumber}
              onChange={this.onChange}
              error={errors}
            />
            <TextFieldGroup
              name="releaseNumber"
              type="text"
              label="Release Number"
              divClass="col"
              className="form-control"
              value={this.state.releaseNumber}
              onChange={this.onChange}
              error={errors}
            />
          </div>
          <div className="form-row pt-2">
            <SelectInput
              className="form-control"
              label="Type"
              divClass="col"
              selectId="rentalResale"
              name="rentalResale"
              onChange={this.onChange}
              options={rentalResaleSelect}
            />
            <SelectInput
              className="form-control"
              label="Size"
              selectId="size"
              name="size"
              divClass="col"
              onChange={this.onChange}
              options={sizeSelect}
            />
          </div>
          <div className="form-row pt-2">
            <SelectInput
              className="form-control"
              label="Shelves?"
              selectId="hasShelves"
              name="hasShelves"
              divClass="col"
              onChange={this.onChange}
              options={yesNoSelect}
            />
            <SelectInput
              className="form-control"
              label="Painted?"
              selectId="isPainted"
              name="isPainted"
              divClass="col"
              onChange={this.onChange}
              options={yesNoSelect}
            />
            <SelectInput
              className="form-control"
              label="On Box Numbers?"
              selectId="hasOnBoxNumbers"
              name="hasOnBoxNumbers"
              divClass="col"
              onChange={this.onChange}
              options={yesNoSelect}
            />
            <SelectInput
              className="form-control"
              label="Signs?"
              selectId="hasSigns"
              name="hasSigns"
              divClass="col"
              onChange={this.onChange}
              options={yesNoSelect}
            />
          </div>
        </div>
        <div className="col-md-12 pt-2">
          <SelectInput
            className="form-control"
            label="Is Flagged?"
            selectId="isFlagged"
            name="isFlagged"
            onChange={this.onChange}
            options={yesNoSelect}
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
  location: state.router,
  sizes: state.containers.sizes
});

export default connect(
  mapStateToProps,
  { addContainer }
)(AddCustomerForm);