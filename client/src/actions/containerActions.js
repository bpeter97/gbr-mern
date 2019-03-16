import axios from "axios";

import {
  GET_CONTAINERS,
  GET_CONTAINER,
  // ADD_CONTAINER,
  EDIT_CONTAINER,
  EDIT_CONTAINER_SIZES,
  // DELETE_CONTAINER,
  GET_ERRORS,
  CLEAR_CONTAINER,
  CONTAINER_LOADING,
  GET_CONTAINER_SIZES
} from "./types";
import { clearErrors } from "./commonActions";

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

export const getContainer = id => dispatch => {
  dispatch(setContainerLoading());
  axios
    .get(`/api/containers/${id}`)
    .then(res =>
      dispatch({
        type: GET_CONTAINER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CONTAINER,
        payload: null
      })
    );
};

export const getContainerSizes = id => dispatch => {
  dispatch(setContainerLoading());
  axios
    .get(`/api/containers/sizes`)
    .then(res =>
      dispatch({
        type: GET_CONTAINER_SIZES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CONTAINER_SIZES,
        payload: null
      })
    );
};

export const editContainer = containerData => dispatch => {
  dispatch(clearErrors());
  axios
    .patch(`/api/containers/${containerData._id}`, containerData)
    .then(res =>
      dispatch({
        type: EDIT_CONTAINER,
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
