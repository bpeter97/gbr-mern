import React, { Component } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productActions";
import "react-table/react-table.css";
import PropTypes from "prop-types";
// import ReactTable from "react-table";
// import matchSorter from "match-sorter";

// Components
import Shortcuts from "./../dashboard/Shortcuts";

class Products extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    return (
      <div className="container-fluid main-content">
        <Shortcuts history={this.props.history} />
        <div className="row justify-content-center">
          <div className="col-sm-12 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">Products</h5>
                <div className="d-flex flex-row justify-content-center">
                  <div className="col-12 py-md-3 pl-md-5">Table</div>
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
