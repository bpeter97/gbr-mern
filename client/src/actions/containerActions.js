import axios from "axios";

import {
  GET_CONTAINERS,
  GET_CONTAINER,
  EDIT_CONTAINER,
  // DELETE_CONTAINER,
  GET_ERRORS,
  CLEAR_CONTAINER,
  CONTAINER_LOADING,
  GET_CONTAINER_SIZES,
  ADD_CONTAINER,
  SET_SUCCESS
} from "./types";
import { clearErrors, clearSuccess } from "./commonActions";

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
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getContainer = id => dispatch => {
  dispatch(clearSuccess());
  dispatch(clearErrors());
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
        type: GET_ERRORS,
        payload: err.response.data
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
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const editContainer = containerData => dispatch => {
  dispatch(clearErrors());
  dispatch(clearSuccess());
  axios
    .patch(`/api/containers/${containerData._id}`, containerData)
    .then(
      res =>
        dispatch({
          type: EDIT_CONTAINER,
          payload: res.data
        }),
      dispatch({
        type: SET_SUCCESS,
        payload: "Container sucessfully updated."
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addContainer = containerData => dispatch => {
  dispatch(clearErrors());
  dispatch(clearSuccess());
  axios
    .post("/api/containers", containerData)
    .then(
      res =>
        dispatch({
          type: ADD_CONTAINER,
          payload: res.data
        }),
      dispatch({
        type: SET_SUCCESS,
        payload: "Container sucessfully created."
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
