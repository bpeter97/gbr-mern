import React, { Component } from "react";
import { connect } from "react-redux";
import SvgIcon from "react-icons-kit";
import TextFieldGroup from "../common/TextFieldGroup";

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      desc: "",
      completed: false
    };
  }

  render() {
    let newtodo = "";
    return (newtodo = (
      <div>
        <li className="todo">
          {this.props.desc}
          {/* <span>X</span> */}
        </li>
      </div>
    ));
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  location: state.router.location
});

export default connect(mapStateToProps)(Todo);
