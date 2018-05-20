import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldInput from "../common/TextFieldInput";

class TodoForm extends Component {
  constructor() {
    super();
    this.state = {
      todoDesc: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const todoData = {
      todoDesc: this.state.todoDesc
    };
    debugger;
    //send to backend
    //attach to user object
    // this.props.createTodo(todoData);
    //this.setState({todoDesc : ''});
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <form className="todo-form" onSubmit={this.onSubmit}>
        <TextFieldInput
          placeholder="Add Todo..."
          className="new-todo-input"
          name="todoDesc"
          type="text"
          value={this.state.todoDesc}
          onChange={this.onChange}
          autoComplete={"off"}
          error={errors.todo}
        />
      </form>
    );
  }
}

TodoForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  location: state.router.location
});

export default connect(mapStateToProps)(TodoForm);
// export default connect(mapStateToProps, {createTodo})(TodoList);
