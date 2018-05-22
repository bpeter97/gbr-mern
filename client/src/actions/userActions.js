import axios from "axios";

import { GET_USERS } from "./types";

// Get Todos
export const getUsers = () => dispatch => {
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
