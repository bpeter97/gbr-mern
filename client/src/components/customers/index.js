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

  render() {
    const { customers } = this.props.customers;

    const data = [
      {
        id: "1",
        first: "Taylor",
        last: "Hartley",
        address1: "1122 eeee rd",
        city: "city name",
        zipcode: "31245",
        state: "AL",
        phone: "706-555-5555",
        fax: "N/A",
        email: "awesome@awesome.com",
        rdp: "",
        notes: "",
        isFlagged: false,
        flagReason: "",
        lastViewed: ""
      },
      {
        id: "2",
        first: "Brian",
        last: "Peter",
        address1: "1122 eeee rd",
        city: "city name",
        zipcode: "31245",
        state: "AL",
        phone: "706-555-5555",
        fax: "N/A",
        email: "awesome@awesome.com",
        rdp: "",
        notes: "",
        isFlagged: false,
        flagReason: "",
        lastViewed: ""
      },
      {
        id: "254",
        first: "Riley",
        last: "Hartley",
        address1: "2211 eeee rd",
        city: "city name",
        zipcode: "31245",
        state: "AL",
        phone: "706-555-5555",
        fax: "N/A",
        email: "awesome@awesome.com",
        rdp: "",
        notes: "",
        isFlagged: true,
        flagReason: "REQUIRES PO",
        lastViewed: ""
      }
    ];
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
        Header: "Edit",
        id: "edit",
        accessor: "_id",
        Cell: ({ value }) => (
          <button
            className="btn btn-success"
            onClick={this.editCustomerClick.bind(this, value)}
          >
            Edit
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
      <div className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5">
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-primary">Add</button>
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
            return { style: { backgroundColor: f ? "#DAE7D7" : "inherit" } };
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

export default connect(mapStateToProps, { getCustomers })(Customers);

// export default Customers;
