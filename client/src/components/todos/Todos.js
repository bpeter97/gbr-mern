import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldInput from "../common/TextFieldInput";
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
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  location: state.router.location
});

export default connect(mapStateToProps, { getTodos })(Todos);
