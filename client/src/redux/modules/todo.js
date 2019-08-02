import axios from "axios";
import { clearErrors } from "./error";
import GET_ERRORS from "./error";
import SET_SUCCESS from "./success";

/* 
################## TYPES ##################
*/
export const ADD_TODO = "ADD_TODO";
export const GET_TODOS = "GET_TODOS";
export const GET_TODO = "GET_TODO";
export const COMPLETE_TODO = "COMPLETE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const TODOS_LOADING = "TODOS_LOADING";

/* 
################## REDUCER ##################
*/
const initialState = {
	todos: [],
	todo: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case TODOS_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_TODOS:
			return {
				...state,
				todos: action.payload,
				loading: false
			};
		case GET_TODO:
			return {
				...state,
				todo: action.payload,
				loading: false
			};
		case ADD_TODO:
			return {
				...state,
				todos: [action.payload, ...state.todos]
			};
		case DELETE_TODO:
			return {
				...state,
				todos: state.todos.filter(todo => todo._id !== action.payload)
			};
		case COMPLETE_TODO:
			return {
				...state
			};
		default:
			return state;
	}
}

/* 
################## ACTION CREATORS ##################
*/
export const addTodo = todoData => dispatch => {
	dispatch(clearErrors());
	axios
		.post("/api/todos", todoData)
		.then(
			res =>
				dispatch({
					type: ADD_TODO,
					payload: res.data
				}),
			dispatch({
				type: SET_SUCCESS,
				payload: "Todo sucessfully created."
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const getTodos = () => dispatch => {
	axios
		.get("/api/todos")
		.then(res =>
			dispatch({
				type: GET_TODOS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_TODOS,
				payload: null
			})
		);
};

export const deleteTodo = todo => dispatch => {
	dispatch(clearErrors());
	axios
		.delete(`/api/todos/${todo._id}`)
		.then(res =>
			dispatch({
				type: DELETE_TODO,
				payload: todo._id
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};
export const completeTodo = todo => dispatch => {
	const url = `/api/todos/${todo._id}`;
	axios
		.patch(url, { desc: todo.desc, completed: !todo.completed })
		.then(res =>
			dispatch({
				type: GET_TODO,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const setTodoLoading = () => {
	return {
		type: TODOS_LOADING
	};
};
