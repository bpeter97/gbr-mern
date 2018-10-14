import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsers } from "../../actions/userActions";

// Components
import Shortcuts from "./../dashboard/Shortcuts";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    // const { users } = this.props;

    return (
      <div className="container-fluid main-content">
        <Shortcuts history={this.props.history} />
        <div className="row justify-content-center">
          <div className="col-sm-12 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">Users</h5>
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

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  { getUsers }
)(Users);
