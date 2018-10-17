import React, { Component } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productActions";
import "react-table/react-table.css";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import matchSorter from "match-sorter";

// Components
import Shortcuts from "./../dashboard/Shortcuts";

class Products extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { products } = this.props.products;

    const columns = [
      {
        Header: "Product",
        accessor: "name",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["name"] }),
        filterAll: true
      },
      {
        Header: "Short Name",
        accessor: "shortName",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["shortName"] }),
        filterAll: true
      },
      {
        Header: "Sale Price",
        accessor: "price",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["price"] }),
        filterAll: true,
        Cell: e => `$${e.value}`
      },
      {
        Header: "Monthly Price",
        accessor: "monthlyPrice",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["monthlyPrice"] }),
        filterAll: true,
        Cell: e => `$${e.value}`
      },
      {
        Header: "Product Type",
        accessor: "type.type",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["type.type"] }),
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
                <h5 className="card-title text-center py-2">Products</h5>
                <div className="d-flex flex-row justify-content-center">
                  <div className="col-12 py-md-3 pl-md-5">
                    <ReactTable
                      data={products}
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
                        return {
                          onClick: () => {
                            this.props.history.push({
                              pathname: "/products/edit",
                              state: {
                                id: rowInfo.original._id
                              }
                            });
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

Products.propTypes = {
  auth: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  getProducts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  products: state.products
});

export default connect(
  mapStateToProps,
  { getProducts }
)(Products);
