import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getContainers } from "../../actions/containerActions";

// Components
import Shortcuts from "./../dashboard/Shortcuts";

class Containers extends Component {
  constructor() {
    super();
    this.state = {
      containers: []
    };
  }

  componentDidMount() {
    this.props.getContainers();
  }

  render() {
    // const { containers } = this.props;

    return (
      <div className="container-fluid main-content">
        <Shortcuts history={this.props.history} />
        <div className="row justify-content-center">
          <div className="col-sm-12 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">Containers</h5>
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

Containers.propTypes = {
  getContainers: PropTypes.func.isRequired,
  containers: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  containers: state.containers
});

export default connect(
  mapStateToProps,
  { getContainers }
)(Containers);
