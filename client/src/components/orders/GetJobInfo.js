import React, { Component } from "react";

class GetJobInfo extends Component {
  render() {
    if (this.props.currentStep !== 3) {
      // Prop: The current step
      return (
        <div className="form-group add-order-step-component component-fade-out" />
      );
    }
    // The markup for the Step 1 UI
    return (
      <div className="form-group add-order-step-component component-fade-in">
        <label htmlFor="password">Password</label>
        <input
          className="form-control"
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={this.props.password} // Prop: The password input data
          onChange={this.props.handleChange} // Prop: Puts data into state
        />
      </div>
    );
  }
}

export { GetJobInfo };
