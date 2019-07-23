import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import checkEmpty from "./../../utils/checkEmpty";

// Sub-components
import Shortcuts from "../dashboard/Shortcuts";

class ViewOrder extends Component {
  constructor() {
    super();
    this.state = {
      formName: "View Order"
    };
  }

  changeOrderName(name) {
    if (name !== this.state.formName) {
      this.setState({ formName: name });
    }
  }

  render() {
    const { order } = this.props;

    if (checkEmpty(this.props.order)) {
      this.props.history.push("/orders/");
    }

    let btnClass = "btn btn-success ml-2 mr-2";

    if (order.purchaseType) {
      if (order.purchaseType.type === "Sales") {
        btnClass = "btn btn-success ml-2 mr-2 disabled";
      }
    }

    return (
      <div className="container-fluid main-content">
        <Shortcuts history={this.props.history} />
        <div className="row justify-content-center">
          <div className="col-sm-12 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">
                  {this.state.formName}
                </h5>
                <div className="d-flex flex-row justify-content-center">
                  <div className="col-12 py-md-3">
                    <div className="container">
                      <div className="row">
                        <div className="d-none col-md-12 text-center">
                          <button
                            className="btn btn-success ml-2 mr-2"
                            // onClick={this.onSelection.bind(this, value)}
                          >
                            Edit Order
                          </button>
                          <button
                            className="btn btn-success ml-2 mr-2"
                            // onClick={this.onSelection.bind(this, value)}
                          >
                            Print Order
                          </button>
                          <button
                            className={btnClass}
                            // onClick={this.onSelection.bind(this, value)}
                          >
                            Print Lease
                          </button>
                        </div>
                        <div className="d-block d-md-none col-12 text-center my-1">
                          <button
                            className="btn btn-success ml-2 mr-2"
                            // onClick={this.onSelection.bind(this, value)}
                          >
                            Edit Order
                          </button>
                        </div>
                        <div className="d-block d-md-none col-12 text-center my-1">
                          <button
                            className="btn btn-success ml-2 mr-2"
                            // onClick={this.onSelection.bind(this, value)}
                          >
                            Print Order
                          </button>
                        </div>
                        <div className="d-block d-md-none col-12 text-center my-1">
                          <button
                            className={btnClass}
                            // onClick={this.onSelection.bind(this, value)}
                          >
                            Print Lease
                          </button>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 text-center">
                          <hr />
                        </div>
                      </div>
                      <div className="row d-none d-md-block">
                        <div className="d-none d-md-block col-md-3 view-text-label">
                          <strong>Customer:</strong>
                        </div>
                        <div className="d-none d-md-block col-md-3 view-text">
                          {order.customer ? order.customer.name : ""}
                        </div>
                        <div className="d-none d-md-block col-md-3 view-text-label">
                          <strong>Stage:</strong>
                        </div>
                        <div className="d-none d-md-block col-md-3 view-text">
                          {order ? order.stage : ""}
                        </div>
                      </div>
                      <div className="row d-block d-md-block">
                        <div className="col-sm-12">
                          <span class="view-text-label">
                            <strong>Customer:</strong>
                          </span>
                          <span class="view-text">
                            {order.customer ? order.customer.name : ""}
                          </span>
                        </div>
                        <div className="col-sm-12 justify-content-between">
                          <span class="">
                            <strong>Stage:</strong>
                          </span>
                          <span class="">{order ? order.stage : ""}</span>
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

ViewOrder.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  location: state.router,
  order: state.orders.order
});

export default connect(
  mapStateToProps,
  {}
)(ViewOrder);
