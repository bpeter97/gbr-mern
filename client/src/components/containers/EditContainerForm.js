import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { editContainer } from "../../redux/modules/container";
import TextArea from "../common/TextArea";
import SelectInput from "../common/SelectInput";
import AlertContainer from "../alerts/AlertContainer";
import checkEmpty from "./../../utils/checkEmpty";
import getSelectOptions from "./../../utils/getSelectOptions";

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
      stats: {
        currentAddress: ""
      },
      currentlyRented: false,
      size: {}
    };
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
      deliveries: this.state.deliveries
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
    switch (e.target.name) {
      case "size":
        let size = {};
        size._id = e.target.value;
        this.props.sizes.forEach(element => {
          if (size._id === element._id) {
            size.size = element.size;
          }
        });
        this.setState({ size });
        break;
      case "currentAddress":
        let stats = this.state.stats;
        stats.currentAddress = e.target.value;
        this.setState({ stats });
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
        break;
    }
  };

  fillForm = container => {
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
      deliveries: container.deliveries || {}
    });
    this.forceUpdate();
  };

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

    let flaggedSelect = getSelectOptions(isFlagged, true);
    let rentalResaleSelect = getSelectOptions(rentalResale, "Rental");
    let shelvesSelect = getSelectOptions(hasShelves, true);
    let paintedSelect = getSelectOptions(isPainted, true);
    let onBoxNumbersSelect = getSelectOptions(hasOnBoxNumbers, true);
    let signsSelect = getSelectOptions(hasSigns, true);
    let rentedSelect = getSelectOptions(currentlyRented, true);

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

    let form = (
      <form onSubmit={this.onSubmit}>
        {errors ? (
          <AlertContainer
            messages={errors}
            type="Error"
            className="alert alert-danger"
          />
        ) : null}
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
