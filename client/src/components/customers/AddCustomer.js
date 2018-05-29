import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addCustomer } from "../../actions/customerActions";
import AddCustomerForm from "../customers/AddCustomerForm";

class AddCustomer extends Component {
  render() {
    return (
      <div className="col-12" style={{}}>
        <div className="m-3">
          <h2 className="text-center font-weight-light ">Add Customer</h2>
        </div>

        <div className="m-auto w-lg-75">
          <AddCustomerForm />
        </div>
      </div>
    );
  }
}

AddCustomer.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  location: state.router
});

export default connect(mapStateToProps)(AddCustomer);
