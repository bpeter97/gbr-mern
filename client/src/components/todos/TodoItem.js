import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteTodo, completeTodo, getTodos } from "./../../redux/modules/todo";
import classNames from "classnames";

class TodoItem extends Component {
	constructor() {
		super();
		this.state = {
			completed: false
		};
	}
	componentDidMount() {
		this.setState({ completed: this.props.todo.completed });
	}

	onDeleteClick(todo, e) {
		e.stopPropagation();
		this.props.deleteTodo(todo);
	}

	onCompleteClick(todo) {
		this.props.completeTodo(todo);

		this.setState({ completed: !this.state.completed });
		// this.props.getTodos();
	}

	render() {
		const { todo } = this.props;

		let todoClass = classNames("todo", this.props.className, {
			completed: this.state.completed
		});
		return (
			<div id="todoItem">
				<li
					className={todoClass}
					onClick={this.onCompleteClick.bind(this, todo)}
				>
					{todo.desc}
					<span onClick={this.onDeleteClick.bind(this, todo)}>X</span>
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

export default connect(
	mapStateToProps,
	{ deleteTodo, completeTodo, getTodos }
)(TodoItem);
