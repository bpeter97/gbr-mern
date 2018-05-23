import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTodos } from "../../actions/todoActions";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

class Todos extends Component {
  componentDidMount() {
    this.props.getTodos();
  }

  render() {
    const { todos } = this.props;
    return (
      <div className="todo-list-container">
        <TodoForm />
        <TodoList todos={todos} />
      </div>
    );
  }
}

Todos.propTypes = {
  getTodos: PropTypes.func.isRequired,
  todos: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  todos: state.todos
});

export default connect(mapStateToProps, { getTodos })(Todos);
