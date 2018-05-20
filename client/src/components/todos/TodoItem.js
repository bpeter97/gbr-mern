import React, { Component } from "react";
import { connect } from "react-redux";
import SvgIcon from "react-icons-kit";
import TextFieldGroup from "../common/TextFieldGroup";
import PropTypes from "prop-types";
import { deleteTodo, completeTodo } from "../../actions/todoActions";

class TodoItem extends Component {
  onDeleteClick(id) {
    this.props.deleteTodo(id);
  }

  onCompleteClick(id) {
    this.props.completeTodo(id);
  }

  render() {
    const { todo } = this.props;
    return (
      <div>
        <li className="todo">
          {todo.desc}
          <span onClick={this.onDeleteClick.bind(this, todo._id)}>X</span>
        </li>
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  location: state.router.location
});

export default connect(mapStateToProps, { deleteTodo, completeTodo })(TodoItem);
