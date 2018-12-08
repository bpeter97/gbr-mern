import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getCustomer, clearCustomer } from "../../actions/customerActions";
import EditCustomerForm from "./EditCustomerForm";

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
  }

  render() {
    const { customer, loading } = this.props.customers;
    let form = "";
    if (customer === null || loading) {
      form = <Spinner />;
    } else {
      form = <EditCustomerForm redirectFunc={this.onFormSubmit.bind(this)} />;
    }

    return form;
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
