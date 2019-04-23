import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setJobInfo } from "./../../actions/purchaseActions";

class GetJobInfo extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }

  componentWillUpdate(nextProps) {
    const { pruchase } = this.props;
    if (nextProps.pruchase !== pruchase) {
      this.setState({
        purchase: nextProps.purchase
      });
    }
  }

  handleChange = e => {
    this.props.setJobInfo(e.target.name, e.target.value);
    this.forceUpdate();
  };

  render() {
    let { purchase } = this.props;

    let order = purchase.order ? purchase.order : purchase.quote;

    if (!order.job) {
      order.job = {};
    }

    let valid = <div className="valid-feedback">Looks good!</div>;
    let invalid = (
      <div className="invalid-feedback">This field is required!</div>
    );

    if (this.props.currentStep !== 3) {
      // Prop: The current step
      return (
        <div className="form-group add-order-step-component component-fade-out" />
      );
    }
    // The markup for the Step 1 UI
    return (
      <div className="form-group add-order-step-component component-fade-in">
        <div className="form-row">
          <div className="col-md-6 col-sm-12 mb-3">
            <label htmlFor="jobName">Name</label>
            <input
              type="text"
              name="jobName"
              className={`form-control ${
                order.job.name ? "is-valid" : "is-invalid"
              }`}
              placeholder="ex. Walmart Construction"
              value={order.job.name}
              onChange={this.handleChange}
              required
            />
            {order.job.name ? valid : invalid}
          </div>
          <div className="col-md-6 col-sm-12 mb-3">
            <label htmlFor="jobAddress">Address</label>
            <input
              type="text"
              name="jobAddress"
              className={`form-control ${
                order.job.address ? "is-valid" : "is-invalid"
              }`}
              placeholder="ex. 6988 Ave 304"
              value={order.job.address}
              onChange={this.handleChange}
              required
            />
            {order.job.address ? valid : invalid}
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-6 col-sm-12 mb-3">
            <label htmlFor="jobCity">City</label>
            <input
              type="text"
              name="jobCity"
              className={`form-control ${
                order.job.city && order.job.city.length > 3
                  ? "is-valid"
                  : "is-invalid"
              }`}
              placeholder="ex. Visalia"
              value={order.job.city}
              onChange={this.handleChange}
              required
            />
            {order.job.city && order.job.city.length > 3 ? valid : invalid}
          </div>
          <div className="col-md-6 col-sm-12 mb-3">
            <label htmlFor="jobZipcode">Zipcode</label>
            <input
              type="text"
              name="jobZipcode"
              className={`form-control ${
                order.job.zipcode && order.job.zipcode.length > 4
                  ? "is-valid"
                  : "is-invalid"
              }`}
              placeholder="ex. 93291"
              value={order.job.zipcode}
              onChange={this.handleChange}
              required
            />
            {order.job.zipcode && order.job.zipcode.length > 4
              ? valid
              : invalid}
          </div>
        </div>
      </div>
    );
  }
}

GetJobInfo.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  location: state.router,
  purchase: state.purchase
});

export default connect(
  mapStateToProps,
  { setJobInfo }
)(GetJobInfo);
