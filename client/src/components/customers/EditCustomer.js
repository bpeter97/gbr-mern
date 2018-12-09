import React, { Component } from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getCustomer, clearCustomer } from "../../actions/customerActions";
import EditCustomerForm from "./EditCustomerForm";

// Components
import Shortcuts from "./../dashboard/Shortcuts";

class EditCustomer extends Component {
  componentDidMount() {
    let hasState = this.props.location.location.state;
    let id = "";
    if (!hasState) {
      this.props.history.push("/customers");
    } else {
      id = hasState.id;
      this.props.getCustomer(id);
    }
  }

  onFormSubmit() {
    this.props.history.push("/customers");
    // push("/customers");
  }

  render() {
    const { customer, loading } = this.props.customers;
    let form = "";
    if (customer === null || loading) {
      form = <Spinner />;
    } else {
      form = <EditCustomerForm redirectFunc={this.onFormSubmit.bind(this)} />;
    }

    return (
      <div className="container-fluid main-content">
        <Shortcuts history={this.props.history} />
        <div className="row justify-content-center">
          <div className="col-sm-12 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">Edit Customer</h5>
                <div className="d-flex flex-row justify-content-center">
                  <div className="col-12 py-md-3 pl-md-5">{form}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditCustomer.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  customers: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  location: state.router,
  customers: state.customers
});

export default connect(
  mapStateToProps,
  { getCustomer, clearCustomer }
)(EditCustomer);
