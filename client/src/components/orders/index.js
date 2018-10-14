import React, { Component } from "react";
import { connect } from "react-redux";
import "react-table/react-table.css";
import PropTypes from "prop-types";
// import ReactTable from "react-table";
// import matchSorter from "match-sorter";

// Actions
import { getOrders } from "../../actions/orderActions";

// Components
import Shortcuts from "./../dashboard/Shortcuts";

class Orders extends Component {
  componentDidMount() {
    this.props.getOrders();
  }

  render() {
    return (
      <div className="container-fluid main-content">
        <Shortcuts history={this.props.history} />
        <div className="row justify-content-center">
          <div className="col-sm-12 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">Orders</h5>
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
