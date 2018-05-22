import axios from "axios";

import { GET_USERS, USERS_LOADING } from "./types";

// Get Todos
export const getUsers = () => dispatch => {
  dispatch(setUsersLoading());
  axios
    .get("/api/users")
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data.users
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USERS,
        payload: null
      })
    );
};

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING
  };
};
