import axios from "axios";

import { GET_USERS, USERS_LOADING } from "./types";
// import { clearErrors } from "./commonActions";

// Get Todos
export const getUsers = () => dispatch => {
  dispatch(setUsersLoading());
  axios
    .get("/api/users")
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
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
