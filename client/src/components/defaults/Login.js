import React, { Component } from 'react';
import TextFieldGroup from '../commons/TextFieldGroup';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="col-lg m-auto">
              <h1 className="text-center">GBR</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
