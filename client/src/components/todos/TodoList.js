import React, { Component } from "react";
import { connect } from "react-redux";
import SvgIcon from "react-icons-kit";
import PropTypes from "prop-types";
import TextFieldInput from "../common/TextFieldInput";
import Todo from "./Todo";

class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      todoDesc: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    //fetch data from auth.user.todos
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
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="todo-list-container">
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

        <ul className="todo-list">
          {/* append todos */}
          {/* <Todo todo={todo} */}
          <Todo desc="Todo #1" />
          <Todo desc="Todo #2" />
        </ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  location: state.router.location
});

export default connect(mapStateToProps)(TodoList);
// export default connect(mapStateToProps, {createTodo})(TodoList);
