import React, { Component } from "react";
import { connect } from "react-redux";
import "react-table/react-table.css";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import matchSorter from "match-sorter";

// Actions
import { getOrders } from "../../actions/orderActions";

// Components
import Shortcuts from "./../dashboard/Shortcuts";
import Spinner from "./../common/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.getOrders();
  }

  render() {
    const { orders } = this.props.orders;

    orders.forEach(order => {
      let newCreationDate = new Date(order.creationDate);
      let newDateFormat =
        newCreationDate.getMonth() +
        "/" +
        newCreationDate.getDay() +
        "/" +
        newCreationDate.getFullYear();
      order.creationDate = newDateFormat;

      if (order.stage === 1) {
        order.stage = "Pending Delivery";
      }

      if (order.containers.length > 0) {
        order.containers.forEach(container => {
          var c = container.container;
          if (c.delivery.isDelivered) {
            container.container.delivery.isDelivered = "Yes";
          } else {
            container.container.delivery.isDelivered = "No";
            container.container.delivery.dateDelivered = "N/A";
          }
          if (c.delivery.isPickedUp) {
            container.container.delivery.isPickedUp = "Yes";
          } else {
            container.container.delivery.isPickedUp = "No";
            container.container.delivery.pickupDate = "N/A";
          }
        });
      }
    });

    const columns = [
      {
        Header: "Customer",
        accessor: "customer.name",
        width: 200,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["customer.name"] }),
        filterAll: true
      },
      {
        Header: "Type",
        accessor: "purchaseType.type",
        width: 120,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["purchaseType.type"] }),
        filterAll: true
      },
      {
        Header: "Job",
        accessor: "job.name",
        width: 200,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["job.name"] }),
        filterAll: true
      },
      {
        Header: "Job City",
        accessor: "job.city",
        width: 200,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["job.city"] }),
        filterAll: true
      },
      {
        Header: "Products",
        accessor: "products.length",
        width: 100,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["products.length"] }),
        filterAll: true
      },
      {
        Header: "Containers",
        accessor: "containers.length",
        width: 100,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["containers.length"] }),
        filterAll: true
      },
      {
        Header: "Creation Date",
        accessor: "creationDate",
        width: 150,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["creationDate"] }),
        filterAll: true
      },
      {
        Header: "Status",
        accessor: "stage",
        width: 200,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["stage"] }),
        filterAll: true
      },
      {
        Header: "Created By",
        accessor: "createdBy.username",
        width: 150,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["createdBy.username"] }),
        filterAll: true
      },
      {
        Header: "View / Edit",
        id: "edit",
        accessor: "_id",
        width: 150,
        Cell: ({ value }) => (
          <button
            className="btn btn-success"
            // onClick={this.editCustomerClick.bind(this, value)}
          >
            View / Edit
          </button>
        )
      }
    ];

    const containerColumns = [
      {
        Header: "Container Number",
        accessor: "container.gbrNumber",
        width: 200,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["container.gbrNumber"] }),
        filterAll: true
      },
      {
        Header: "Size",
        accessor: "container.size.size",
        width: 150
      },
      {
        Header: "Is Delivered?",
        accessor: "container.delivery.isDelivered",
        width: 150
      },
      {
        Header: "Date Delivered",
        accessor: "container.delivery.dateDelivered",
        width: 150
      },
      {
        Header: "Is Picked Up?",
        accessor: "container.delivery.isPickedUp",
        width: 150
      },
      {
        Header: "Date Picked Up",
        accessor: "container.delivery.pickupDate",
        width: 150
      }
    ];

    const productColumns = [
      {
        Header: "Product",
        accessor: "product.name",
        width: 200
      },
      {
        Header: "Label",
        accessor: "product.shortName",
        width: 150
      },
      {
        Header: "Price",
        accessor: "product.price",
        width: 200,
        Cell: e => `$${e.value}`
      },
      {
        Header: "Monthly Price",
        accessor: "product.monthlyPrice",
        width: 200,
        Cell: e => `$${e.value}`
      }
    ];

    return (
      <div className="container-fluid main-content">
        <Shortcuts history={this.props.history} />
        <div className="row justify-content-center">
          <div className="col-sm-12 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">Orders</h5>
                <div className="d-flex flex-row justify-content-center">
                  <div className="col-12 py-md-3 pl-md-5">
                    {this.props.orders.loading ? (
                      <Spinner />
                    ) : (
                      <ReactTable
                        data={orders}
                        filterable
                        defaultFilterMethod={(filter, row) =>
                          String(row[filter.id]) === filter.value
                        }
                        defaultSorted={[
                          {
                            id: "Name",
                            desc: true
                          }
                        ]}
                        className="-striped -highlight align-middle text-center"
                        columns={columns}
                        defaultPageSize={10}
                        getTrProps={(s, i) => {
                          let f = false;
                          if (i) {
                            f = i.original.isFlagged;
                          }
                          return {
                            style: {
                              backgroundColor: f
                                ? "rgb(255, 204, 204, 0.5)"
                                : "inherit"
                            }
                          };
                        }}
                        SubComponent={row => {
                          var numOfC = row.original.containers.length;
                          var numOfP = row.original.products.length;

                          return (
                            <div className="p-3">
                              <ReactTable
                                data={row.original.containers}
                                columns={containerColumns}
                                showPagination={false}
                                defaultPageSize={numOfC}
                              />
                              <ReactTable
                                data={row.original.products}
                                columns={productColumns}
                                showPagination={false}
                                defaultPageSize={numOfP}
                              />
                            </div>
                          );
                        }}
                      />
                    )}
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

Orders.propTypes = {
  auth: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired,
  getOrders: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  orders: state.orders
});

export default connect(
  mapStateToProps,
  { getOrders }
)(Orders);
