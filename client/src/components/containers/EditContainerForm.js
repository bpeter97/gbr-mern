import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { editContainer } from "../../actions/containerActions";
import TextArea from "../common/TextArea";
import SelectInput from "../common/SelectInput";
import ErrorAlert from "./../error/ErrorAlert";
import checkEmpty from "./../../utils/checkEmpty";

class EditContainerForm extends Component {
  constructor() {
    super();
    this.state = {
      gbrNumber: "",
      releaseNumber: "",
      hasShelves: false,
      isPainted: false,
      hasOnBoxNumbers: false,
      hasSigns: false,
      isFlagged: false,
      serialNumber: "",
      rentalResale: false,
      flagReason: "",
      stats: {},
      currentlyRented: false,
      size: {},
      delivery: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.fillForm = this.fillForm.bind(this);
  }

  componentDidMount() {
    let { container } = this.props;
    this.fillForm(container);
    this.forceUpdate();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      state.errors = props.errors;
    }
    return null;
  }

  onSubmit = e => {
    e.preventDefault();

    const containerData = {
      _id: this.props.container._id,
      gbrNumber: this.state.gbrNumber,
      releaseNumber: this.state.releaseNumber,
      hasShelves: this.state.hasShelves,
      isPainted: this.state.isPainted,
      hasOnBoxNumbers: this.state.hasOnBoxNumbers,
      hasSigns: this.state.hasSigns,
      isFlagged: this.state.isFlagged,
      serialNumber: this.state.serialNumber,
      rentalResale: this.state.rentalResale,
      flagReason: this.state.flagReason,
      stats: this.state.stats,
      size: this.state.size,
      delivery: this.state.delivery
    };

    containerData.stats.currentlyRented = this.state.currentlyRented;

    this.props.editContainer(containerData);
    setTimeout(() => {
      if (checkEmpty(this.state.errors)) {
        this.props.history.push("/containers");
      }
    }, 1000);
  };

  onChange = e => {
    if (e.target.name === "size") {
      let size = {};
      size._id = e.target.value;
      this.props.sizes.forEach(element => {
        if (size._id === element._id) {
          size.size = element.size;
        }
      });
      this.setState({ size });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  fillForm(container) {
    this.setState({
      gbrNumber: container.gbrNumber || "",
      releaseNumber: container.releaseNumber || "",
      hasShelves: container.hasShelves || false,
      isPainted: container.isPainted || false,
      hasOnBoxNumbers: container.hasOnBoxNumbers || false,
      hasSigns: container.hasSigns || false,
      isFlagged: container.isFlagged || false,
      serialNumber: container.serialNumber || "",
      rentalResale: container.rentalResale || "",
      flagReason: container.flagReason || "",
      stats: container.stats || {
        currentlyRented: false
      },
      size: container.size || {},
      delivery: container.delivery || {}
    });
    this.forceUpdate();
  }

  render() {
    const { errors, sizes, container } = this.props;
    const {
      isFlagged,
      hasShelves,
      isPainted,
      hasOnBoxNumbers,
      hasSigns,
      rentalResale
    } = this.state;

    const currentlyRented = this.state.stats.currentlyRented;

    let flaggedSelect;
    if (isFlagged) {
      flaggedSelect = [
        { value: true, selected: true, label: "Yes" },
        { value: false, selected: false, label: "No" }
      ];
    } else {
      flaggedSelect = [
        { value: false, selected: true, label: "No" },
        { value: true, selected: false, label: "Yes" }
      ];
    }

    let rentalResaleSelect;
    if (rentalResale === "Rental") {
      rentalResaleSelect = [
        { value: "Rental", selected: true, label: "Rental" },
        { value: "Sales", selected: false, label: "Sales" }
      ];
    } else {
      rentalResaleSelect = [
        { value: "Sales", selected: true, label: "Sales" },
        { value: "Rental", selected: false, label: "Rental" }
      ];
    }

    let shelvesSelect;
    if (hasShelves) {
      shelvesSelect = [
        { value: true, selected: true, label: "Yes" },
        { value: false, selected: false, label: "No" }
      ];
    } else {
      shelvesSelect = [
        { value: false, selected: true, label: "No" },
        { value: true, selected: false, label: "Yes" }
      ];
    }

    let paintedSelect;
    if (isPainted) {
      paintedSelect = [
        { value: true, selected: true, label: "Yes" },
        { value: false, selected: false, label: "No" }
      ];
    } else {
      paintedSelect = [
        { value: false, selected: true, label: "No" },
        { value: true, selected: false, label: "Yes" }
      ];
    }

    let onBoxNumbersSelect;
    if (hasOnBoxNumbers) {
      onBoxNumbersSelect = [
        { value: true, selected: true, label: "Yes" },
        { value: false, selected: false, label: "No" }
      ];
    } else {
      onBoxNumbersSelect = [
        { value: false, selected: true, label: "No" },
        { value: true, selected: false, label: "Yes" }
      ];
    }

    let signsSelect;
    if (hasSigns) {
      signsSelect = [
        { value: true, selected: true, label: "Yes" },
        { value: false, selected: false, label: "No" }
      ];
    } else {
      signsSelect = [
        { value: false, selected: true, label: "No" },
        { value: true, selected: false, label: "Yes" }
      ];
    }

    let rentedSelect;
    if (currentlyRented) {
      rentedSelect = [
        { value: true, selected: true, label: "Yes" },
        { value: false, selected: false, label: "No" }
      ];
    } else {
      rentedSelect = [
        { value: false, selected: true, label: "No" },
        { value: true, selected: false, label: "Yes" }
      ];
    }

    let sizeSelect = [];
    let selectedSizeIndex = 0;
    sizes.forEach(element => {
      if (element) {
        let selection = {};
        selection.value = element._id;
        selection.label = element.size;

        if (container.size) {
          if (element.size === container.size.size) {
            selection.selected = true;
            sizeSelect[0] = selection;
          } else {
            selectedSizeIndex++;
            selection.selected = false;
            sizeSelect[selectedSizeIndex] = selection;
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
              options={shelvesSelect}
            />
            <SelectInput
              className="form-control"
              label="Painted?"
              selectId="isPainted"
              name="isPainted"
              divClass="col"
              onChange={this.onChange}
              options={paintedSelect}
            />
            <SelectInput
              className="form-control"
              label="On Box Numbers?"
              selectId="hasOnBoxNumbers"
              name="hasOnBoxNumbers"
              divClass="col"
              onChange={this.onChange}
              options={onBoxNumbersSelect}
            />
            <SelectInput
              className="form-control"
              label="Signs?"
              selectId="hasSigns"
              name="hasSigns"
              divClass="col"
              onChange={this.onChange}
              options={signsSelect}
            />
          </div>
          <div className="form-row pt-2">
            <SelectInput
              className="form-control"
              label="Currently Rented?"
              selectId="currentlyRented"
              name="currentlyRented"
              divClass="col"
              onChange={this.onChange}
              options={rentedSelect}
            />
          </div>
          <div className="form-row pt-2">
            <TextFieldGroup
              name="currentAddress"
              type="text"
              label="Current Address"
              divClass="col"
              className="form-control"
              value={this.state.stats.currentAddress}
              onChange={this.onChange}
              error={errors}
              disabled={currentlyRented ? "disabled" : ""}
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
            options={flaggedSelect}
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

EditContainerForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  container: state.containers.container,
  location: state.router,
  sizes: state.containers.sizes
});

export default connect(
  mapStateToProps,
  { editContainer }
)(EditContainerForm);
