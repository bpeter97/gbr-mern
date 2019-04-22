import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ReactTable from "react-table";
import matchSorter from "match-sorter";
import { addItem } from "./../../actions/cartActions";
import SuccessAlert from "./../alerts/SuccessAlert";
import ErrorAlert from "./../alerts/ErrorAlert";

class AddProductsToCart extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      containers: [],
      modifications: [],
      deliveries: [],
      rental: false
    };
  }

  static getDerivedStateFromProps(props, current_state) {
    if (current_state.products !== props.products) {
      // Reset containers, modifications, and deliveries arrays.
      current_state = {
        products: props.products,
        containers: [],
        modifications: [],
        deliveries: [],
        rental: props.rental
      };

      if (props.rental) {
        // Filter out sales products & map rental products.
        current_state.products = props.products
          .filter(product => {
            if (
              !product.rental &&
              product.type.type !== "delivery" &&
              product.type.type !== "pickup"
            ) {
              return false;
            }
            return true;
          })
          .map(product => {
            return product;
          });
      } else {
        // Filter out sales products & map sales products.
        current_state.products = props.products
          .filter(product => {
            if (
              product.rental &&
              product.type.type !== "delivery" &&
              product.type.type !== "pickup"
            ) {
              return false;
            }
            return true;
          })
          .map(product => {
            return product;
          });
      }

      // Push products to proper array based type of product if not already pushed.
      current_state.products.forEach(product => {
        if (product.type.type === "container") {
          let exist = false;
          current_state.containers.forEach(container => {
            if (container._id === product._id) {
              exist = true;
            }
          });

          if (!exist) {
            current_state.containers.push(product);
          }
        } else if (
          product.type.type === "delivery" ||
          product.type.type === "pickup"
        ) {
          let exist = false;
          current_state.deliveries.forEach(delivery => {
            if (delivery._id === product._id) {
              exist = true;
            }
          });

          if (!exist) {
            current_state.deliveries.push(product);
          }
        } else if (product.type.type === "modification") {
          let exist = false;
          current_state.modifications.forEach(modification => {
            if (modification._id === product._id) {
              exist = true;
            }
          });

          if (!exist) {
            current_state.modifications.push(product);
          }
        }
      });

      // Return the newly updated state.
      return current_state;
    }

    // Return null if no changes were made to products.
    return null;
  }

  render() {
    const { containers, modifications, deliveries } = this.state;
    const { cart } = this.props.cart;

    let productColumns = [
      {
        Header: "Name",
        accessor: "name",
        width: 400,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["name"] }),
        filterAll: true
      },
      {
        Header: "Short Name",
        accessor: "shortName",
        width: 200,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["shortName"] }),
        filterAll: true
      },
      {
        Header: "Monthly Price",
        accessor: "monthlyPrice",
        width: 200,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["monthlyPrice"] }),
        filterAll: true,
        Cell: e => `$${e.value}.00`
      },
      {
        Header: "Price",
        accessor: "price",
        width: 200,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["price"] }),
        filterAll: true,
        Cell: e => `$${e.value}.00`
      },
      {
        Header: "Add To Order",
        id: "add",
        accessor: d => d,
        width: 200,
        Cell: ({ value }) => (
          <button
            className="btn btn-success"
            type="button"
            onClick={this.props.addItem.bind(this, value, cart)}
          >
            Add To Order
          </button>
        )
      }
    ];

    let containersTable = (
      <span>There are no container products to display.</span>
    );
    let modificationsTable = (
      <span>There are no modifications products to display.</span>
    );
    let deliveriesTable = (
      <span>There are no deliveries products to display.</span>
    );

    if (containers.length > 0) {
      containersTable = (
        <ReactTable
          data={containers}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
          defaultSorted={[
            {
              id: "Container",
              desc: true
            }
          ]}
          className="-striped -highlight align-middle text-center"
          columns={productColumns}
          defaultPageSize={10}
        />
      );
    }

    if (modifications.length > 0) {
      modificationsTable = (
        <ReactTable
          data={modifications}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
          defaultSorted={[
            {
              id: "Container",
              desc: true
            }
          ]}
          className="-striped -highlight align-middle text-center"
          columns={productColumns}
          defaultPageSize={10}
        />
      );
    }

    if (deliveries.length > 0) {
      deliveriesTable = (
        <ReactTable
          data={deliveries}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
          defaultSorted={[
            {
              id: "Container",
              desc: true
            }
          ]}
          className="-striped -highlight align-middle text-center"
          columns={productColumns}
          defaultPageSize={10}
        />
      );
    }

    if (this.props.currentStep !== 2) {
      // Prop: The current step
      return <div className="add-order-step-component component-fade-out" />;
    }
    // The markup for the Step 1 UI
    return (
      <div className="add-order-step-component component-fade-in">
        {this.props.success.message !== "" ? (
          <SuccessAlert
            msg={this.props.success.message ? this.props.success.message : ""}
          />
        ) : null}
        {this.props.errors.error !== "" ? (
          <ErrorAlert
            error={this.props.errors.error ? this.props.errors.error : ""}
          />
        ) : null}
        <ul className="nav nav-tabs" id="rentalProductsTab" role="tablist">
          <li className="nav-item">
            <a
              className="product-tab nav-link active"
              id="containersTab"
              data-toggle="tab"
              href="#containers"
              role="tab"
              aria-controls="containers"
              aria-selected="true"
            >
              Containers
            </a>
          </li>
          <li className="nav-item">
            <a
              className="product-tab nav-link"
              id="modificationsTab"
              data-toggle="tab"
              href="#modifications"
              role="tab"
              aria-controls="modifications"
              aria-selected="false"
            >
              Modifications
            </a>
          </li>
          <li className="nav-item">
            <a
              className="product-tab nav-link"
              id="deliveriesTab"
              data-toggle="tab"
              href="#deliveries"
              role="tab"
              aria-controls="deliveries"
              aria-selected="false"
            >
              Deliveries
            </a>
          </li>
        </ul>
        <div className="tab-content" id="rentalProductsTabContent">
          <div
            className="tab-pane fade show active"
            id="containers"
            role="tabpanel"
            aria-labelledby="containers-tab"
          >
            {containersTable}
          </div>
          <div
            className="tab-pane fade"
            id="modifications"
            role="tabpanel"
            aria-labelledby="modifications-tab"
          >
            {modificationsTable}
          </div>
          <div
            className="tab-pane fade"
            id="deliveries"
            role="tabpanel"
            aria-labelledby="deliveries-tab"
          >
            {deliveriesTable}
          </div>
        </div>
      </div>
    );
  }
}

AddProductsToCart.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  location: state.router,
  cart: state.cart,
  success: state.success
});

export default connect(
  mapStateToProps,
  { addItem }
)(AddProductsToCart);
