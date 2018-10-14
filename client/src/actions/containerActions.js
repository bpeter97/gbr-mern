import axios from "axios";

import {
  GET_CONTAINERS,
  // GET_CONTAINER,
  // ADD_CONTAINER,
  // EDIT_CONTAINER,
  // DELETE_CONTAINER,
  // GET_ERRORS,
  CLEAR_CONTAINER,
  CONTAINER_LOADING
} from "./types";
// import { clearErrors } from "./commonActions";

export const getContainers = () => dispatch => {
  dispatch(setContainerLoading());
  axios
    .get("/api/containers")
    .then(res =>
      dispatch({
        type: GET_CONTAINERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CONTAINERS,
        payload: null
      })
    );
};

export const clearContainer = () => {
  return {
    type: CLEAR_CONTAINER
  };
};

export const setContainerLoading = () => {
  return {
    type: CONTAINER_LOADING
  };
};
