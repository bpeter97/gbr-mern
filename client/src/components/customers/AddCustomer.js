import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AddCustomerForm from "../customers/AddCustomerForm";
import Shortcuts from "./../dashboard/Shortcuts";

class AddCustomer extends Component {
  onFormSubmit() {
    this.props.history.push("/customers");
  }

  render() {
    return (
      <div className="container-fluid main-content">
        <Shortcuts history={this.props.history} />
        <div className="row justify-content-center">
          <div className="col-sm-12 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">Add Customer</h5>
                <div className="d-flex flex-row justify-content-center">
                  <div className="col-12 py-md-3 pl-md-5">
                    <AddCustomerForm
                      redirectFunc={this.onFormSubmit.bind(this)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
