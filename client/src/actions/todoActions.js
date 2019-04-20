import axios from "axios";

import {
  ADD_TODO,
  GET_ERRORS,
  GET_TODOS,
  GET_TODO,
  DELETE_TODO,
  TODOS_LOADING,
  SET_SUCCESS
} from "./types";
import { clearErrors } from "./commonActions";

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
