import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import matchSorter from "match-sorter";

// Actions
import { getContainers } from "../../actions/containerActions";

// Components
import Shortcuts from "./../dashboard/Shortcuts";

class Containers extends Component {
  componentDidMount() {
    this.props.getContainers();
  }

  render() {
    const { containers } = this.props.containers;

    containers.forEach(container => {
      container.stats.currentlyRented =
        container.stats.currentlyRented === true ? "Yes" : "No";
    });

    const columns = [
      {
        Header: "GBR Number",
        accessor: "gbrNumber",
        width: 150,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["gbrNumber"] }),
        filterAll: true
      },
      {
        Header: "Serial Number",
        accessor: "serialNumber",
        width: 175,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["serialNumber"] }),
        filterAll: true
      },
      {
        Header: "Type",
        accessor: "rentalResale",
        width: 125,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["rentalResale"] }),
        filterAll: true
      },
      {
        Header: "Size",
        accessor: "size.size",
        width: 100,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["size.size"] }),
        filterAll: true
      },
      {
        Header: "Currently Rented",
        accessor: "stats.currentlyRented",
        width: 100,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["stats.currentlyRented"] }),
        filterAll: true
      },
      {
        Header: "Current Rentee",
        accessor: "stats.currentRentee.name",
        width: 200,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, {
            keys: ["stats.currentRentee.name"]
          }),
        filterAll: true,
        className: "table-link"
      },
      {
        Header: "Flag Reason",
        accessor: "flagReason",
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
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">Containers</h5>
                <div className="d-flex flex-row justify-content-center">
                  <div className="col-12 py-md-3 pl-md-5">
                    <ReactTable
                      data={containers}
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
                      className="-striped -highlight text-center"
                      columns={columns}
                      defaultPageSize={10}
                      getTrProps={(state, rowInfo, column, instance) => {
                        let f = false;

                        if (rowInfo) {
                          f = rowInfo.original.isFlagged;
                        }
                        return {
                          onClick: () => {
                            this.props.history.push({
                              pathname: "/customers/edit",
                              state: {
                                id:
                                  rowInfo.row._original.stats.currentRentee._id
                              }
                            });
                          },
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

Containers.propTypes = {
  getContainers: PropTypes.func.isRequired,
  containers: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  containers: state.containers
});

export default connect(
  mapStateToProps,
  { getContainers }
)(Containers);
