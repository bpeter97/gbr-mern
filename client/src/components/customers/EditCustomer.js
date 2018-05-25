import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldInput from "../common/TextFieldInput";
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

  render() {
    const { location } = this.props;
    const { customer, loading } = this.props.customers;
    let form = "";
    if (customer === null || loading) {
      form = <Spinner />;
    } else {
      form = <EditCustomerForm />;
    }

    return (
      <div className="col-10 col-md-10 col-sm-4">
        <h6>Edit Customer</h6>
        {form}
      </div>
    );
  }
}

EditCustomer.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  customers: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  location: state.router,
  customers: state.customers
});

export default connect(mapStateToProps, { getCustomer, clearCustomer })(
  EditCustomer
);
