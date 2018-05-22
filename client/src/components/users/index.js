import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsers } from "../../actions/userActions";

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
    const { users } = this.props;

    return (
      <div className="content">
        <h1 className="text-center">Users PAGE</h1>
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

export default connect(mapStateToProps, { getUsers })(Users);
