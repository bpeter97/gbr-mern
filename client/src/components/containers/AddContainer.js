import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getContainerSizes } from "../../actions/containerActions";
import AddContainerForm from "./AddContainerForm";

// Components
import Shortcuts from "../dashboard/Shortcuts";

class AddContainer extends Component {
  componentDidMount() {
    this.props.getContainerSizes();
  }

  onFormSubmit() {
    this.props.history.push("/containers");
  }

  render() {
    return (
      <div className="container-fluid main-content">
        <Shortcuts history={this.props.history} />
        <div className="row justify-content-center">
          <div className="col-sm-12 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">Add Container</h5>
                <div className="d-flex flex-row justify-content-center">
                  <div className="col-12 py-md-3 pl-md-5">
                    <AddContainerForm
                      redirectFunc={this.onFormSubmit.bind(this)}
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

AddContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  location: state.router
});

export default connect(
  mapStateToProps,
  { getContainerSizes }
)(AddContainer);
