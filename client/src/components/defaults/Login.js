import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { loginUser } from "../../actions/defaultsActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push("/dashboard");
    // }
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.auth.isAuthenticated) {
    //   this.props.history.push("/dashboard");
    // }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;

    return (
      <div className="container-fluid">
        <div className="row mh-100vh">
          <div
            className="col-10 col-sm-8 col-md-6 col-lg-6 offset-1 offset-sm-2 offset-md-3 offset-lg-0 align-self-center d-lg-flex align-items-lg-center align-self-lg-stretch bg-white p-5 rounded rounded-lg-0 my-5 my-lg-0"
            id="login-block"
          >
            <div className="m-auto w-lg-75 w-xl-50">
              <h2 className="text-center font-weight-light mb-5">
                GBR Management System
              </h2>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Username"
                  name="username"
                  type="username"
                  value={this.state.username}
                  onChange={this.onChange}
                  error={errors.username}
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <input type="submit" className="btn btn-info mt-2" />
              </form>
              <p className="mt-3 mb-0">
                <a href="#" className="small">
                  Forgot your email or password?
                </a>
              </p>
            </div>
          </div>
          <div className="col-lg-6 d-flex align-items-end" id="bg-block" />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
