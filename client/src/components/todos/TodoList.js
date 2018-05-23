import React, { Component } from "react";
// import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

class TodoList extends Component {
  render() {
    const { todos } = this.props;
    if (todos) {
      return todos.map(todo => <TodoItem key={todo._id} todo={todo} />);
    } else {
      return "";
    }
  }
}

// TodoList.propTypes = {
//   todos: PropTypes.array.isRequired
// };

export default TodoList;
