import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import {
  getContainer,
  clearContainer,
  getContainerSizes
} from "../../actions/containerActions";
import EditContainerForm from "./EditContainerForm";

// Components
import Shortcuts from "../dashboard/Shortcuts";

class EditContainer extends Component {
  componentDidMount() {
    let hasState = this.props.location.location.state;
    let id = "";
    if (!hasState) {
      this.props.history.push("/containers");
    } else {
      id = hasState.id;
      this.props.getContainer(id);
      this.props.getContainerSizes();
    }
  }

  render() {
    const { container, loading } = this.props.containers;
    let form = "";
    if (container === null || loading) {
      form = <Spinner />;
    } else {
      form = <EditContainerForm history={this.props.history} />;
    }

    return (
      <div className="container-fluid main-content">
        <Shortcuts history={this.props.history} />
        <div className="row justify-content-center">
          <div className="col-sm-12 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">
                  {container.gbrNumber}
                </h5>
                <div className="d-flex flex-row justify-content-center">
                  <div className="col-12 py-md-3 pl-md-5">
                    <div className="container-fluid">
                      <ul className="nav nav-pills" id="myTab" role="tablist">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            id="edit-container-tab"
                            data-toggle="tab"
                            href="#edit-container"
                            role="tab"
                            aria-controls="edit-container"
                            aria-selected="true"
                          >
                            Edit Container
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={
                              container.rentalResale === "Rental"
                                ? "nav-link"
                                : "nav-link disabled"
                            }
                            id="rental-history-tab"
                            data-toggle="tab"
                            href="#rental-history"
                            role="tab"
                            aria-controls="rental-history"
                            aria-selected="false"
                          >
                            Rental History
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="tab-content mt-3" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="edit-container"
                        role="tabpanel"
                        aria-labelledby="edit-container-tab"
                      >
                        {form}
                      </div>
                      <div
                        className="tab-pane fade"
                        id="rental-history"
                        role="tabpanel"
                        aria-labelledby="rental-history-tab"
                      >
                        <div className="container-fluid">
                          <span>Not implemented yet.....</span>
                        </div>
                      </div>
                    </div>
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

EditContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  containers: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  location: state.router,
  containers: state.containers
});

export default connect(
  mapStateToProps,
  { getContainer, clearContainer, getContainerSizes }
)(EditContainer);
