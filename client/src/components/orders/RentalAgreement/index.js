import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Shortcuts from "./../../dashboard/Shortcuts";
import AgreementTerms from "./AgreementTerms";
import AgreementSignature from "./AgreementSignature";

import { getOrder } from "./../../../redux/modules/order";
import Spinner from "./../../common/Spinner";

import "./RentalAgreement.css";

class RentalAgreement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshSignature: false
    };
    let hasState = this.props.location.location.state;
    let id = "";
    if (!hasState) {
      this.props.history.push("/orders");
    } else {
      id = hasState.id;
      this.props.getOrder(id);
    }
  }

  componentDidMount() {
    if (this.props.orders.order) {
      this.setState({
        refreshSignature: true
      });
    }
  }

  render() {
    const { order, loading } = this.props.orders;

    let agreement = "";

    if (loading) {
      agreement = <Spinner />;
    } else {
      agreement = (
        <div
          className="container-fluid main-content"
          id="view-rental-agreement"
        >
          <Shortcuts history={this.props.history} />
          <div className="row justify-content-center">
            <div className="col-sm-12 pb-4">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-12 text-center pt-3 ">
                      <button
                        type="button"
                        className="btn btn-success mb-2 mb-sm-0"
                        data-toggle="modal"
                        data-target="#signatureModal"
                      >
                        Sign Agreement
                      </button>
                    </div>
                  </div>
                  <div className="d-flex flex-row justify-content-center">
                    <div className="col-12 py-md-3">
                      <div className="container">
                        <div className="row">
                          <div className="col-6 col-lg-9 text-center">
                            <img
                              className="mt-4 mb-auto img-fuild align-self-center d-none d-sm-block"
                              style={{ width: "100%", height: "auto" }}
                              src="../../../img/logo.png"
                              alt="GBR Logo"
                            />
                            <img
                              className="mt-4 mb-auto d-block d-sm-none img-fuild align-self-center "
                              src="../../../img/logosmall.png"
                              alt="GBR Logo"
                            />
                          </div>
                          <div className="col-6 col-lg-3 text-right">
                            Lessor: Green Box Rentals Inc. <br /> 6988 Avenue
                            304 <br /> Visalia, CA 93291 <br /> PH: 559-733-5345{" "}
                            <br /> FX: 559-651-4288 <br />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 text-center mt-4">
                            <span className="h4">RENTAL AGREEMENT</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 mt-4">
                            <div className="card w-100">
                              <div className="card-header">
                                <h6 className="card-subtitle pt-2">Lessee:</h6>
                              </div>

                              {order.customer ? (
                                <div className="row">
                                  <div className="col-12 col-sm-6">
                                    <div className="card sub-card w-100">
                                      <div className="card-body">
                                        <h5 className="card-title">
                                          {order.customer.name}
                                        </h5>
                                        <h6 className="card-subtitle mb-2">
                                          {order.customer.address1}
                                        </h6>
                                        {order.customer.address2 ? (
                                          <h6 className="card-subtitle mb-2">
                                            {order.customer.address2}
                                          </h6>
                                        ) : null}
                                        <h6 className="card-subtitle mb-2">
                                          {order.customer.city},{" "}
                                          {order.customer.state},{" "}
                                          {order.customer.zipcode}
                                        </h6>
                                        <h6 className="card-subtitle mb-2">
                                          {order.customer.phone
                                            ? order.customer.phone + " (Phone)"
                                            : "No Phone"}
                                        </h6>
                                        {order.customer.ext ? (
                                          <h6 className="card-subtitle mb-2">
                                            {order.customer.ext}
                                          </h6>
                                        ) : null}
                                        {order.customer.fax ? (
                                          <h6 className="card-subtitle mb-2">
                                            {order.customer.fax}
                                          </h6>
                                        ) : null}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-sm-6">
                                    <div className="card sub-card w-100">
                                      <div className="card-body">
                                        <h6 className="card-subtitle mb-2 font-italic">
                                          Job:
                                        </h6>
                                        <h5 className="card-title">
                                          {order.job.name
                                            ? order.job.name
                                            : "No Job Name"}
                                        </h5>
                                        <h6 className="card-subtitle mb-2">
                                          {order.job.address
                                            ? order.job.address
                                            : "No Job Address"}
                                        </h6>
                                        <h6 className="card-subtitle mb-2">
                                          {order.job.city}, CA,{" "}
                                          {order.job.zipcode}
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <Spinner />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 mt-4">
                            <div className="card w-100">
                              <div className="card-header">
                                <h6 className="card-subtitle pt-2">
                                  Rental Details:
                                </h6>
                              </div>
                              {order.products ? (
                                <div className="row">
                                  <div className="col-12 col-sm-6">
                                    <div className="card sub-card w-100">
                                      <div className="card-body">
                                        <h6 className="card-subtitle mb-2">
                                          {/* TODO: Need to implement delivery date here when deliveries are created. */}
                                          Delivery Date: July 31, 2019
                                        </h6>
                                        {order.products.map((product, i) => {
                                          let p = product.product.product;
                                          let name = "";
                                          if (p.type.type === "container") {
                                            name = (
                                              <h6
                                                className="card-subtitle mb-2"
                                                key={"product" + i}
                                              >
                                                Unit: {p.name}
                                              </h6>
                                            );
                                          }
                                          return name;
                                        })}

                                        <h6 className="card-subtitle mb-2">
                                          {/* TODO: Need to implement selecting the unit numbers after delivery is implemented */}
                                          Unit Number: 99-0001
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-sm-6">
                                    <div className="card sub-card w-100">
                                      <div className="card-body">
                                        {order.products.map(product => {
                                          let p = product.product.product;
                                          let name = "";
                                          if (
                                            p.type.type === "container" &&
                                            p.rental
                                          ) {
                                            name = (
                                              <h6 className="card-subtitle mb-2">
                                                Rental Rate: $
                                                {p.price.toFixed(2)}
                                              </h6>
                                            );
                                          }
                                          return name;
                                        })}
                                        {order.products.map((product, i) => {
                                          let p = product.product.product;
                                          let name = "";
                                          if (p.type.type === "delivery") {
                                            name = (
                                              <h6
                                                className="card-subtitle mb-2"
                                                key={"delivery" + i}
                                              >
                                                Delivery Charge: $
                                                {p.price.toFixed(2)}
                                              </h6>
                                            );
                                          }
                                          return name;
                                        })}
                                        {order.products.map((product, i) => {
                                          let p = product.product.product;
                                          let name = "";
                                          if (p.type.type === "pickup") {
                                            name = (
                                              <h6
                                                className="card-subtitle mb-2"
                                                key={"pickup" + i}
                                              >
                                                Pickup Charge: $
                                                {p.price.toFixed(2)}
                                              </h6>
                                            );
                                          }
                                          return name;
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <Spinner />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          {/* TODO: Need to update to delivery date when deliveries are created */}
                          <AgreementTerms date="Wednesday, July 31, 2019" />
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <div className="card w-100">
                              <div className="d-block d-sm-flex flex-row justify-content-center text-center">
                                <div className="col">
                                  <div className="card sub-card w-100">
                                    <div className="card-body">
                                      <h5 className="card-title">
                                        Lessee:{" "}
                                        {order.customer
                                          ? order.customer.name
                                          : ""}
                                      </h5>
                                      {/* <!-- 
                                      Check to see if a signature exists, if no signature, then this
                                      else, show signature and display printed name and title.
                                    --> */}
                                      {order ? (
                                        <AgreementSignature
                                          history={this.props.history}
                                          signature={order.signature}
                                          refresh={this.state.refreshSignature}
                                        />
                                      ) : (
                                        ""
                                      )}
                                      {order.signature ? (
                                        ""
                                      ) : (
                                        <h6 className="card-subtitle mb-4">
                                          Sign:
                                          <span className="d-none d-lg-inline">
                                            _______________________________
                                          </span>
                                          <span className="d-inline d-lg-none">
                                            _____________________
                                          </span>
                                        </h6>
                                      )}

                                      {order.signature ? (
                                        <h6 className="card-subtitle mb-4">
                                          Print:
                                          <span>
                                            {" "}
                                            {order.signature.printedName}
                                          </span>
                                        </h6>
                                      ) : (
                                        <h6 className="card-subtitle mb-4">
                                          Print:
                                          <span className="d-none d-lg-inline">
                                            _______________________________
                                          </span>
                                          <span className="d-inline d-lg-none">
                                            _____________________
                                          </span>
                                        </h6>
                                      )}

                                      {order.signature ? (
                                        <h6 className="card-subtitle mb-4">
                                          Title:
                                          <span> {order.signature.title}</span>
                                        </h6>
                                      ) : (
                                        <h6 className="card-subtitle mb-4">
                                          Title:
                                          <span className="d-none d-lg-inline">
                                            _______________________________
                                          </span>
                                          <span className="d-inline d-lg-none">
                                            _____________________
                                          </span>
                                        </h6>
                                      )}
                                      <h6 className="card-subtitle ml-lg-3">
                                        I have authority to bind lease.
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="card sub-card w-100">
                                    <div className="card-body">
                                      <h5 className="card-title mb-4">
                                        Lessor: Green Box Rentals, Inc.
                                      </h5>
                                      <h6 className="card-subtitle mb-4">
                                        By:
                                        <span className="d-none d-lg-inline">
                                          _______________________________
                                        </span>
                                        <span className="d-inline d-lg-none">
                                          _____________________
                                        </span>
                                      </h6>
                                      <h6 className="card-subtitle mb-4">
                                        Print:
                                        <span className="d-none d-lg-inline">
                                          _______________________________
                                        </span>
                                        <span className="d-inline d-lg-none">
                                          _____________________
                                        </span>
                                      </h6>
                                      <h6 className="card-subtitle mb-2">
                                        Title:
                                        <span className="d-none d-lg-inline">
                                          _______________________________
                                        </span>
                                        <span className="d-inline d-lg-none">
                                          _____________________
                                        </span>
                                      </h6>
                                      <h6 className="card-subtitle ml-lg-3">
                                        I have authority to bind lease.
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 mt-3">
                            <div className="card w-100">
                              <div className="card-header">
                                <h6 className="card-subtitle mb-2">
                                  Rental Damage Protection:
                                </h6>
                                <h6 className="card-subtitle font-italic text-muted">
                                  Failure to initial will result in Lessee
                                  declining protection.
                                </h6>
                              </div>
                              <div className="row pt-3">
                                <div className="col-12">
                                  <div className="card sub-card w-100">
                                    <div className="card-body text-justify">
                                      <h6 className="card-subtitle mb-2">
                                        _____________________ ACCEPT
                                      </h6>
                                      <h6 className="card-subtitle mb-4">
                                        I hereby accept the RENTAL DAMAGE
                                        COVERAGE PROGRAM and agree to pay
                                        additional charge based on current
                                        rental rates. I have read and understand
                                        all aspects of the program.
                                      </h6>
                                      <h6 className="card-subtitle mt-2 mb-2">
                                        _____________________ DECLINE
                                      </h6>
                                      <h6 className="card-subtitle mb-4">
                                        I hereby decline the RENTAL DAMAGE
                                        COVERAGE PROGRAM and agree to pay for
                                        all damages done to the rental unit
                                        while in my possession.
                                      </h6>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return agreement;
  }
}

RentalAgreement.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  location: state.router,
  orders: state.orders
});

export default connect(
  mapStateToProps,
  { getOrder }
)(RentalAgreement);
