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
    let orderStatus = "";
    let containerListItems = "";

    if (order.purchaseType) {
      if (order.purchaseType.type === "Sales") {
        btnClass = "btn btn-success ml-2 mr-2 disabled";
      }
    }

    switch (order.stage) {
      case 1:
        orderStatus = "Pending Delivery";
        break;

      default:
        break;
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
                      <nav className="navbar navbar-expand-lg navbar-light">
                        <button
                          className="navbar-toggler ml-auto"
                          type="button"
                          data-toggle="collapse"
                          data-target="#navbarNav"
                          aria-controls="navbarNav"
                          aria-expanded="false"
                          aria-label="Toggle navigation"
                        >
                          <span className="navbar-toggler-icon" />
                        </button>
                        <div
                          className="collapse navbar-collapse"
                          id="navbarNav"
                        >
                          <ul className="navbar-nav w-100">
                            <li className="nav-item mx-lg-1 my-1 my-lg-0 active">
                              <button
                                type="button"
                                className="btn btn-sm btn-success"
                              >
                                Edit Order
                              </button>
                            </li>
                            <li className="nav-item mx-lg-1 my-1 my-lg-0 ">
                              <button
                                type="button"
                                className="btn btn-sm btn-success"
                              >
                                Print Agreement
                              </button>
                            </li>
                            <li className="nav-item mx-lg-1 my-1 my-lg-0 ">
                              <button
                                type="button"
                                className="btn btn-sm btn-success"
                              >
                                Print Order
                              </button>
                            </li>
                            <li className="nav-item mx-lg-1 my-1 my-lg-0 ">
                              <button
                                type="button"
                                className="btn btn-sm btn-success"
                                data-toggle="modal"
                                data-target="#exampleModalCenter"
                              >
                                Deliver Container
                              </button>
                            </li>
                            <li className="nav-item ml-lg-auto my-1 my-lg-0 ">
                              <button
                                type="button"
                                className="btn btn-sm btn-danger"
                              >
                                Delete Order
                              </button>
                            </li>
                          </ul>
                        </div>
                      </nav>
                      <div className="row mt-2">
                        <div className="col-12">
                          <hr />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 col-md-8 col-lg-8 text-xs-center text-md-left">
                          <p className="h1 mb-2">
                            {order.customer.name ? order.customer.name : ""}
                          </p>
                          <span className="pl-1">
                            {order.customer.address1
                              ? order.customer.address1
                              : ""}
                          </span>
                          <br />
                          {order.customer.address2 ? (
                            <span className="pl-1">
                              {order.customer.address2}
                              <br />
                            </span>
                          ) : (
                            ""
                          )}

                          <span className="pl-1">
                            {order.customer.city ? order.customer.city : ""},{" "}
                            {order.customer.state ? order.customer.state : ""},{" "}
                            {order.customer.zipcode
                              ? order.customer.zipcode
                              : ""}
                          </span>
                          <br />
                          <span className="pl-1">
                            Phone:{" "}
                            {order.customer.phone
                              ? order.customer.phone
                              : "None"}{" "}
                            {order.customer.ext
                              ? "Ext: " + order.customer.ext
                              : ""}
                          </span>
                          <br />

                          {order.customer.fax ? (
                            <span className="pl-1">
                              Fax: {order.customer.fax}
                              <br />
                            </span>
                          ) : (
                            ""
                          )}

                          {order.customer.email ? (
                            <span className="pl-1">
                              Email: {order.customer.email}
                              <br />
                            </span>
                          ) : (
                            ""
                          )}
                          <div className="mt-4 d-block d-lg-none text-xs-center text-md-left">
                            <span className="h5 pl-1 d-inline text-uppercase font-weight-bold">
                              Order Type:
                            </span>
                            <h5 className="d-inline ml-2 font-weight-normal">
                              {order.purchaseType.type
                                ? order.purchaseType.type
                                : ""}
                            </h5>
                            <br />
                            <h5 className="pl-1 d-inline text-uppercase">
                              Status:
                            </h5>
                            <h5 className="d-inline ml-2 font-weight-normal">
                              {orderStatus ? orderStatus : ""}
                            </h5>
                            <br />
                            <h4 className="mt-4 pl-1">
                              {order.job.name ? order.job.name : ""}
                            </h4>
                            <span className="pl-1">
                              {order.job.address ? order.job.address : ""}
                            </span>
                            <br />
                            <span className="pl-1">
                              {order.job.city ? order.job.city : ""}, CA,{" "}
                              {order.job.zipcode ? order.job.zipcode : ""}
                            </span>
                            <br />
                          </div>
                        </div>
                        <div className="col-sm-12 col-lg d-none d-lg-block text-left mt-2">
                          <h5 className="d-inline text-uppercase">
                            Order Type:
                          </h5>
                          <h5 className="d-inline ml-2 font-weight-normal">
                            {order.purchaseType.type
                              ? order.purchaseType.type
                              : ""}
                          </h5>
                          <br />
                          <h5 className="d-inline text-uppercase">Status:</h5>
                          <h5 className="d-inline ml-2 font-weight-normal">
                            {orderStatus ? orderStatus : ""}
                          </h5>
                          <h4 className="mt-4">
                            {order.job.name ? order.job.name : ""}
                          </h4>
                          <span className="">
                            {order.job.address ? order.job.address : ""}
                          </span>
                          <br />
                          <span className="">
                            {order.job.city ? order.job.city : ""}, CA,{" "}
                            {order.job.zipcode ? order.job.zipcode : ""}
                          </span>
                          <br />
                        </div>
                        <div className="col-12">
                          <hr />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="pl-3 col-12 text-center">
                          {order.containers.length <= 0 ? (
                            <div>
                              <h3 className="font-weight-normal mb-3">
                                Containers
                              </h3>
                              <span className="font-italic">
                                No containers are currently attached to the
                                order.
                              </span>
                              <hr />
                            </div>
                          ) : (
                            <ul className="list-group mt-3">
                              <li className="list-group-item">
                                <div className="row text-center">
                                  <div className="col">
                                    <span>GBR Number</span>
                                  </div>
                                  <div className="col">
                                    <span>Serial Number</span>
                                  </div>
                                  <div className="col">
                                    <span>Size</span>
                                  </div>
                                  <div className="col d-none d-sm-block">
                                    <span>Type</span>
                                  </div>
                                  <div className="col">
                                    <span>Status</span>
                                  </div>
                                </div>
                              </li>
                              {order.containers.map(container => {
                                let c = container.container;
                                console.log(c);
                                return (
                                  <li
                                    key={Math.random(10)}
                                    className="list-group-item"
                                  >
                                    <div className="row text-center">
                                      <div className="col">
                                        <span>
                                          {c.gbrNumber ? c.gbrNumber : ""}
                                        </span>
                                      </div>
                                      <div className="col">
                                        <span>
                                          {c.serialNumber ? c.serialNumber : ""}
                                        </span>
                                      </div>
                                      <div className="col">
                                        <span>
                                          {c ? c.size.size + "'" : ""}
                                        </span>
                                      </div>
                                      <div className="col d-none d-sm-block">
                                        <span>
                                          {c.rentalResale ? c.rentalResale : ""}
                                        </span>
                                      </div>
                                      <div className="col">
                                        <span>
                                          {c.deliveries
                                            ? c.deliveries.slice(-1)[0].delivery
                                                .isDelivered
                                              ? "Delivered"
                                              : "Pending Delivery"
                                            : ""}
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="pl-3 col-sm-12 text-xs-center text-md-left mt-2">
                          <div className="row">
                            <div className="col-12 text-center">
                              <h4 className="font-weight-normal">Prices</h4>
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <ul className="list-group mt-3">
                            <li className="list-group-item">
                              <div className="row text-center">
                                <div className="col">
                                  <span>Tax Rate:</span>
                                </div>
                                <div className="col">
                                  <span>
                                    {order.purchasePrices.taxRate
                                      ? order.purchasePrices.taxRate
                                      : ""}
                                  </span>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="row text-center">
                                <div className="col">
                                  <span>Total Monthly:</span>
                                </div>
                                <div className="col">
                                  <span>
                                    $
                                    {order.purchasePrices.monthlyPrice
                                      ? order.purchasePrices.monthlyPrice.toFixed(
                                          2
                                        )
                                      : "0.00"}
                                  </span>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="row text-center">
                                <div className="col">
                                  <span>Total Delivery:</span>
                                </div>
                                <div className="col">
                                  <span>
                                    $
                                    {order.purchasePrices.deliveryTotal
                                      ? order.purchasePrices.deliveryTotal.toFixed(
                                          2
                                        )
                                      : "0.00"}
                                  </span>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="row text-center">
                                <div className="col">
                                  <span>Total Price (before tax):</span>
                                </div>
                                <div className="col">
                                  <span>
                                    $
                                    {order.purchasePrices.priceBeforeTax
                                      ? order.purchasePrices.priceBeforeTax.toFixed(
                                          2
                                        )
                                      : "0.00"}
                                  </span>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="row text-center">
                                <div className="col">
                                  <span>Sales Tax</span>
                                  <span className="small text-muted">
                                    (Sales and Deliveries)
                                  </span>
                                  <span>:</span>
                                </div>
                                <div className="col">
                                  <span>
                                    $
                                    {order.purchasePrices.salesTax
                                      ? order.purchasePrices.salesTax.toFixed(2)
                                      : "0.00"}
                                  </span>
                                </div>
                              </div>
                            </li>
                            <li className="list-group-item">
                              <div className="row text-center">
                                <div className="col">
                                  <span>Total Price (after tax):</span>
                                </div>
                                <div className="col">
                                  <span>
                                    $
                                    {order.purchasePrices.totalPrice
                                      ? order.purchasePrices.totalPrice.toFixed(
                                          2
                                        )
                                      : "0.00"}
                                  </span>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="row mb-5">
                        <div className="pl-3 col-12 text-center">
                          <span className="h3 font-weight-normal">
                            Products
                          </span>
                          <ul className="list-group mt-3">
                            <li className="list-group-item">
                              <div className="row text-center">
                                <div className="col">
                                  <span>Item</span>
                                </div>
                                <div className="col">
                                  <span>Price</span>
                                </div>
                                <div className="col">
                                  <span>Monthly</span>
                                </div>
                                <div className="col">
                                  <span>Quantity</span>
                                </div>
                              </div>
                            </li>
                            {order.products.map(product => {
                              let p = product.product;
                              return (
                                <li
                                  className="list-group-item"
                                  key={Math.random(10)}
                                >
                                  <div className="row text-center">
                                    <div className="col">
                                      <span>
                                        {p.product.name ? p.product.name : ""}
                                      </span>
                                    </div>
                                    <div className="col">
                                      <span>
                                        $
                                        {!p.product.rental
                                          ? p.product.price.toFixed(2)
                                          : "0.00"}
                                      </span>
                                    </div>
                                    <div className="col">
                                      <span>
                                        $
                                        {p.product.rental
                                          ? p.product.price.toFixed(2)
                                          : "0.00"}
                                      </span>
                                    </div>
                                    <div className="col">
                                      <span>
                                        {p.productQuantity
                                          ? p.productQuantity
                                          : ""}
                                      </span>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>

                      <div
                        className="modal fade"
                        id="exampleModalCenter"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalCenterTitle"
                        aria-hidden="true"
                      >
                        <div
                          className="modal-dialog modal-dialog-centered modal-lg"
                          role="document"
                        >
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalCenterTitle"
                              >
                                Create Delivery
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                              ............................................................
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                              >
                                Cancel Delivery
                              </button>
                              <button type="button" className="btn btn-success">
                                Deliver Container
                              </button>
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
