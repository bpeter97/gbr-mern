import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from "match-sorter";

// Actions
import { getCustomers } from "../../actions/customerActions";

// Components
import Shortcuts from "./../dashboard/Shortcuts";
import Spinner from "./../common/Spinner";

class Customers extends Component {
  componentDidMount() {
    this.props.getCustomers();
  }

  componentDidUpdate(prevProps) {
    // Update the table component if new changes exist
    if (this.props.customers !== prevProps.customers) {
      this.forceUpdate();
    }
  }

  editCustomerClick(id) {
    const location = {
      pathname: "/customers/edit",
      state: { id: id }
    };
    this.props.history.push(location);
  }

  getEarnings(v) {
    let type = v.original.purchaseType.type;
    let stage = v.original.stage;
    let endDate = v.original.endDate;
    let deliveryDate =
      v.original.containers[0].container.delivery.dateDelivered;

    let earnings = 0;
    let correctSalesTax = v.original.purchasePrices.salesTax / 100;

    if (type === "Rental") {
      let currentDate = new Date();
      let numOfMonths;

      // Get the monthly earnings
      let monthlyEarnings =
        v.original.purchasePrices.monthlyPrice +
        v.original.purchasePrices.monthlyPrice * correctSalesTax;

      // Get the number of months
      if (stage === 1) {
        numOfMonths = 1;
      } else if (stage > 1 && endDate === null) {
        numOfMonths =
          (currentDate.getFullYear() - deliveryDate.getFullYear()) * 12;
        numOfMonths -= deliveryDate.getMonth() + 1;
        numOfMonths += currentDate.getMonth() + 1;
      } else if (endDate !== null) {
        numOfMonths = (endDate.getFullYear() - deliveryDate.getFullYear()) * 12;
        numOfMonths -= deliveryDate.getMonth() + 1;
        numOfMonths += endDate.getMonth() + 1;
      }

      // Calculate the earnings
      earnings = monthlyEarnings * numOfMonths;
      earnings += v.original.purchasePrices.deliveryTotal;

      return earnings;
    } else {
      let productEarnings =
        v.original.purchasePrices.priceBeforeTax -
        v.original.purchasePrices.deliveryTotal;
      earnings = productEarnings + productEarnings * correctSalesTax;

      earnings += v.original.purchasePrices.deliveryTotal;
      return earnings;
    }
  }

  render() {
    const { customers } = this.props.customers;

    const columns = [
      {
        Header: "Name",
        accessor: "name",
        width: 200,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["name"] }),
        filterAll: true
      },
      {
        Header: "Phone",
        accessor: "phone",
        width: 200,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["phone"] }),
        filterAll: true
      },
      {
        Header: "Fax",
        accessor: "fax",
        width: 200,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["fax"] }),
        filterAll: true
      },
      {
        Header: "Email",
        accessor: "email",
        width: 200,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["email"] }),
        filterAll: true
      },
      {
        Header: "Flags",
        id: "flagReason",
        accessor: d => d.flagReason,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["flagReason"] }),
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
            onClick={this.editCustomerClick.bind(this, value)}
          >
            View / Edit
          </button>
        )
      }
    ];

    const customerOrdersColumns = [
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
        Header: "Containers",
        accessor: "containers.length",
        width: 100,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["containers.length"] }),
        filterAll: true
      },
      {
        Header: "Order Created",
        accessor: "creationDate",
        Cell: v => (v.value = new Date(v.original.creationDate).toDateString()),
        width: 150,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["creationDate"] }),
        filterAll: true
      },
      {
        Header: "Total Earned",
        Cell: v => (v.value = `$${this.getEarnings(v)}`),
        width: 150,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["createdBy.username"] }),
        filterAll: true
      }
    ];

    return (
      <div className="container-fluid main-content">
        <Shortcuts history={this.props.history} />
        <div className="row justify-content-center">
          <div className="col-sm-12 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">Customers</h5>
                <div className="d-flex flex-row justify-content-center">
                  <div className="col-12 py-md-3 pl-md-5">
                    {this.props.customers.loading ? (
                      <Spinner />
                    ) : (
                      <ReactTable
                        data={customers}
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
                          var numOfC = row.original.orders.length;

                          return (
                            <div className="p-3">
                              <ReactTable
                                data={row.original.orders}
                                columns={customerOrdersColumns}
                                showPagination={false}
                                defaultPageSize={numOfC}
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

Customers.propTypes = {
  auth: PropTypes.object.isRequired,
  customers: PropTypes.object.isRequired,
  getCustomers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  customers: state.customers
});

export default connect(
  mapStateToProps,
  { getCustomers }
)(Customers);
