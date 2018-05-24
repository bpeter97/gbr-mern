import axios from "axios";

import {
  ADD_TODO,
  GET_ERRORS,
  // CLEAR_ERRORS,
  GET_TODOS,
  GET_TODO,
  DELETE_TODO,
  COMPLETE_TODO,
  TODOS_LOADING
} from "./types";

// Add Post
export const addTodo = todoData => dispatch => {
  // dispatch(clearErrors());
  axios
    .post("/api/todos", todoData)
    .then(res =>
      dispatch({
        type: ADD_TODO,
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

// Get Todos
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

// Get Post
export const getTodo = id => dispatch => {
  //   axios
  //     .get(`/api/todos/${id}`)
  //     .then(res =>
  //       dispatch({
  //         type: GET_TODO,
  //         payload: res.data
  //       })
  //     )
  //     .catch(err =>
  dispatch({
    type: GET_TODO,
    payload: null
  });
  //     );
};

// Delete Post
export const deleteTodo = id => dispatch => {
  axios
    .delete(`/api/todos/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_TODO,
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
