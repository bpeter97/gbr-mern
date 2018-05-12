import React, { Component } from "react";
import NavBar from "../navbar";
import { addCustomerIcon } from "../../icons";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="col-md">
        <NavBar />
        <h1 className="text-center align-middle">DASHBOARD PAGE!</h1>
      </div>
    );
  }
}

export default Dashboard;
