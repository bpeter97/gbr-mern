import React, { Component } from "react";
import Table from "../table/Table";
import ReactTable from "react-table";
import "react-table/react-table.css";

class Customers extends Component {
  editCustomerClick(value) {
    console.log(`edit clicked for`, value);
  }

  render() {
    const data = [
      {
        id: "1",
        first: "Taylor",
        last: "Hartley",
        phone: "706-555-5555",
        fax: "N/A",
        email: "awesome@awesome.com",
        flags: {
          flagged: false,
          flags: "NONE"
        }
      },
      {
        id: "2",
        first: "Brian",
        last: "Peter",
        phone: "706-555-1234",
        fax: "N/A",
        email: "admin@awesome.com",
        flags: {
          flagged: false,
          flags: "NONE"
        }
      },
      {
        id: "254",
        first: "Riley",
        last: "Hartley",
        phone: "706-555-4321",
        fax: "N/A",
        email: "dog@awesome.com",
        flags: {
          flagged: true,
          flags: "REQUIRES PO"
        }
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
        Header: "ID#",
        accessor: "id"
      },
      {
        Header: "First Name",
        accessor: "first"
      },
      {
        Header: "Last Name",
        accessor: "last"
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
        id: "flags",
        accessor: d => d.flags.flags
      },
      {
        Header: "Edit",
        id: "edit",
        accessor: "id",
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
          data={data}
          className="-striped -highlight"
          columns={columns}
          showPagination={false}
          defaultPageSize={10}
          getTrProps={(s, i) => {
            let f = false;
            if (i) {
              f = i.original.flags.flagged;
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

export default Customers;
