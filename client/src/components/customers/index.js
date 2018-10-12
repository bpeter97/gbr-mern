import React, { Component } from "react";
import { connect } from "react-redux";
import { getCustomers } from "../../actions/customerActions";
import ReactTable from "react-table";
import "react-table/react-table.css";
import PropTypes from "prop-types";

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
  addCustomerClick() {
    const location = {
      pathname: "/customers/add"
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
        accessor: "name"
      },
      {
        Header: "Phone",
        accessor: "phone"
      },
      {
        Header: "Fax",
        accessor: "fax"
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Flags",
        id: "flagReason",
        accessor: d => d.flagReason
      },
      {
        Header: "View / Edit",
        id: "edit",
        accessor: "_id",
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
    const columns_history = [
      {
        Header: "Container ID#",
        accessor: "containerID"
      },
      {
        Header: "Rented @",
        accessor: "dateRented"
      },
      {
        Header: "Returned",
        accessor: "dateReturned"
      },
      {
        Header: "Money Earned",
        accessor: "earned"
      },
      {
        Header: "Quote",
        accessor: "quote"
      }
    ];
    return (
      <div className="container-fluid main-content">
        <div className="row justify-content-center">
          <div className="col-sm-12 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">Customers</h5>
                <div className="d-flex flex-row justify-content-center">
                  <div className="col-12 py-md-3 pl-md-5">
                    <div className="d-flex justify-content-end mb-3">
                      <button
                        className="btn btn-primary"
                        onClick={this.addCustomerClick.bind(this)}
                      >
                        Add
                      </button>
                    </div>

                    <ReactTable
                      data={customers}
                      className="-striped -highlight"
                      columns={columns}
                      defaultPageSize={10}
                      getTrProps={(s, i) => {
                        let f = false;
                        if (i) {
                          f = i.original.isFlagged;
                        }
                        return {
                          style: { backgroundColor: f ? "#DAE7D7" : "inherit" }
                        };
                      }}
                      SubComponent={row => {
                        // CREATE NEW COMPONENT FOR CUSTOMER HISTORY
                        return (
                          <div className="p-3">
                            <ReactTable
                              data={data_history}
                              columns={columns_history}
                              showPagination={false}
                              defaultPageSize={3}
                            />
                          </div>
                        );
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
