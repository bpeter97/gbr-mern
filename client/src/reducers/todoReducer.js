import {
  ADD_TODO,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_TODOS,
  GET_TODO,
  COMPLETE_TODO,
  TODOS_LOADING
} from "../actions/types";

const initialState = {
  todos: [],
  todo: {},
  loading: false
};

export default function(state = initialState, action) {
  debugger;
  switch (action.type) {
    case TODOS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_TODOS:
      debugger;
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
