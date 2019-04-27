import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Shortcuts from "./../../dashboard/Shortcuts";
import SignaturePad from "react-signature-pad-wrapper";

export class RentalOrder extends Component {
  render() {
    return (
      <div className="container-fluid main-content">
        <Shortcuts history={this.props.history} />
        <div className="row justify-content-center">
          <div className="col-sm-12 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">Test</h5>
                <div className="d-flex flex-row justify-content-center">
                  <div className="col-12 py-md-3">
                    <SignaturePad />
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

// RentalOrder.propTypes = {
//   prop: PropTypes
// }

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(RentalOrder);
