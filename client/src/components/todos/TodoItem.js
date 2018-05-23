import React, { Component } from "react";
import { connect } from "react-redux";
import SvgIcon from "react-icons-kit";
import TextFieldGroup from "../common/TextFieldGroup";
import PropTypes from "prop-types";
import { deleteTodo, completeTodo, getTodos } from "../../actions/todoActions";
import classNames from "classnames";

class TodoItem extends Component {
  constructor() {
    super();
    this.state = {
      completed: false,
    }
  }
  componentDidMount() {
    this.setState({ completed: this.props.todo.completed });
  }

  onDeleteClick(id, e) {
    e.stopPropagation();
    this.props.deleteTodo(id);
  }

  onCompleteClick(id, todoCompleted) {

    this.props.completeTodo(id, todoCompleted);

    this.setState({ completed: !this.state.completed });
    // this.props.getTodos();
  }

  render() {
    const { todo } = this.props;

    let todoClass = classNames("todo", this.props.className, {
      'completed': this.state.completed
    });
    return (
      <div>
        <li
          className={todoClass}
          onClick={this.onCompleteClick.bind(this, todo._id, todo.completed)}
        >
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
  auth: state.auth
});

export default connect(mapStateToProps, { deleteTodo, completeTodo, getTodos })(TodoItem);
