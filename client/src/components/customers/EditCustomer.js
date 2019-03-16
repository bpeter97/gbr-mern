import React, { Component } from "react";
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

  render() {
    const { customer, loading } = this.props.customers;
    let numOfOrders;
    if (customer.orders) {
      numOfOrders = customer.orders.length;
    } else {
      numOfOrders = 0;
    }
    let form = "";
    if (customer === null || loading) {
      form = <Spinner />;
    } else {
      form = (
        <EditCustomerForm props={this.props} history={this.props.history} />
      );
    }

    return (
      <div className="container-fluid main-content">
        <Shortcuts history={this.props.history} />
        <div className="row justify-content-center">
          <div className="col-sm-12 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">{customer.name}</h5>
                <div className="d-flex flex-row justify-content-center">
                  <div className="col-12 py-md-3 pl-md-5">
                    <div className="container-fluid">
                      <ul className="nav nav-pills" id="myTab" role="tablist">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            id="edit-container-tab"
                            data-toggle="tab"
                            href="#edit-container"
                            role="tab"
                            aria-controls="edit-container"
                            aria-selected="true"
                          >
                            Edit Customer
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={
                              numOfOrders > 0 ? "nav-link" : "nav-link disabled"
                            }
                            id="rental-history-tab"
                            data-toggle="tab"
                            href="#rental-history"
                            role="tab"
                            aria-controls="rental-history"
                            aria-selected="false"
                          >
                            Rental History
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="tab-content mt-3" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="edit-container"
                        role="tabpanel"
                        aria-labelledby="edit-container-tab"
                      >
                        {form}
                      </div>
                      <div
                        className="tab-pane fade"
                        id="rental-history"
                        role="tabpanel"
                        aria-labelledby="rental-history-tab"
                      >
                        <div className="container-fluid">
                          <span>Not implemented yet.....</span>
                        </div>
                      </div>
                    </div>
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
