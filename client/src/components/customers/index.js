import React, { Component } from "react";
import NavBar from "../navbar";
import { addCustomerIcon } from "../../icons";

class Customers extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="col-md">
        <NavBar icon={addCustomerIcon} />
        <h1>Customers PAGE</h1>
      </div>
    );
  }
}

export default Customers;
