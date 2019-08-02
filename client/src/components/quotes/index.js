import React, { Component } from "react";
import { connect } from "react-redux";
import "react-table/react-table.css";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import matchSorter from "match-sorter";

// Actions
import { getQuotes } from "./../../redux/modules/quote";

// Components
import Shortcuts from "./../dashboard/Shortcuts";
import Spinner from "./../common/Spinner";
import AlertContainer from "./../alerts/AlertContainer";

class Quotes extends Component {
  componentDidMount() {
    this.props.getQuotes();
  }

  render() {
    const { quotes } = this.props.quotes;

    quotes.forEach(quote => {
      let newCreationDate = new Date(quote.creationDate);
      let newExpDate = new Date(quote.expirationDate);
      let newDateFormat =
        newCreationDate.getMonth() +
        "/" +
        newCreationDate.getDay() +
        "/" +
        newCreationDate.getFullYear();
      let newExpDateFormat =
        newExpDate.getMonth() +
        "/" +
        newExpDate.getDay() +
        "/" +
        newExpDate.getFullYear();
      quote.creationDate = newDateFormat;
      quote.expirationDate = newExpDateFormat;
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
        Header: "Phone",
        accessor: "customer.phone",
        width: 200,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["customer.phone"] }),
        filterAll: true
      },
      {
        Header: "Type",
        accessor: "purchaseType.type",
        width: 200,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["purchaseType.type"] }),
        filterAll: true
      },
      {
        Header: "# of Items",
        accessor: "products.length",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["products.length"] }),
        filterAll: true
      },
      {
        Header: "Created",
        accessor: "creationDate",
        width: 200,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["creationDate"] }),
        filterAll: true
      },
      {
        Header: "Expires",
        accessor: "expirationDate",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["expirationDate"] }),
        filterAll: true
      },

      {
        Header: "Created By",
        accessor: "createdBy.username",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["products.length"] }),
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

    return (
      <div className="container-fluid main-content">
        <Shortcuts history={this.props.history} />
        <div className="row justify-content-center">
          <div className="col-sm-12 pb-4">
            {this.props.success.message ? (
              <AlertContainer
                messages={this.props.success}
                type="Success"
                className="alert alert-success"
              />
            ) : null}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">Quotes</h5>
                <div className="d-flex flex-row justify-content-center">
                  <div className="col-12 py-md-3 pl-md-5">
                    {this.props.quotes.loading ? (
                      <Spinner />
                    ) : (
                      <ReactTable
                        data={quotes}
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

Quotes.propTypes = {
  auth: PropTypes.object.isRequired,
  quotes: PropTypes.object.isRequired,
  getQuotes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  quotes: state.quotes,
  success: state.success
});

export default connect(
  mapStateToProps,
  { getQuotes }
)(Quotes);
