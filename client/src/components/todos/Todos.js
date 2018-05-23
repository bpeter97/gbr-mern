import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTodos } from "../../actions/todoActions";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Spinner from "../common/Spinner";

class Todos extends Component {
  componentDidMount() {
    this.props.getTodos();
  }

  render() {
    const { todos, loading } = this.props;
    let todosContent;

    if (todos === null || loading) {
      todosContent = <Spinner />;
    } else {
      todosContent = <TodoList todos={todos} />;
    }
    return (
      <div className="todo-list-container">
        <TodoForm />
        <ul className="todo-list">{todosContent}</ul>
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
