import React, { Component } from "react";
import { connect } from "react-redux";
import { getCustomers } from "../../actions/customerActions";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from "match-sorter";

import Shortcuts from "./../dashboard/Shortcuts";

class Customers extends Component {
  componentDidMount() {
    this.props.getCustomers();
  }

  editCustomerClick(id) {
    const location = {
      pathname: "/customers/edit",
      state: { id: id }
    };
    this.props.history.push(location);
  }

  render() {
    const { customers } = this.props.customers;

    const data_history = [
      {
        containerID: "1234234",
        dateRented: "12/1/99",
        dateReturned: "12/2/2001",
        earned: "$5,000",
        quote: "QuoteItem"
      },
      {
        containerID: "123653",
        dateRented: "12/3/2001",
        dateReturned: "4/5/2004",
        earned: "$3500",
        quote: "QuoteItem"
      }
    ];
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
                    />
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

// export default Customers;
