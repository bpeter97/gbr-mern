import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTodo } from "../../actions/todoActions";
import TextFieldInput from "../common/TextFieldInput";

class TodoForm extends Component {
  constructor() {
    super();
    this.state = {
      desc: "",
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
      desc: this.state.desc
    };
    //send to backend
    //attach to user object
    this.props.addTodo(todoData);
    this.setState({ desc: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <form className="todo-form" onSubmit={this.onSubmit}>
        <TextFieldInput
          placeholder="Add a Todo..."
          className="new-todo-input"
          name="desc"
          type="text"
          value={this.state.desc}
          onChange={this.onChange}
          autoComplete={"off"}
          error={errors.todo}
        />
      </form>
    );
  }
}

TodoForm.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addTodo }
)(TodoForm);
