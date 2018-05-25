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
      <div className="col-12 col-md-10 col-sm-4" style={{}}>
        <div className="m-3">
          <h2 class="text-center font-weight-light ">Edit Customer</h2>
        </div>

        <div className="m-auto w-lg-75 w-xl-50">{form}</div>
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
