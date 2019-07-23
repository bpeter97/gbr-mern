import axios from "axios";

import {
  GET_ORDERS,
  GET_ORDER,
  ADD_ORDER,
  // EDIT_ORDER,
  // DELETE_ORDER,
  // GET_ERRORS,
  CLEAR_ORDER,
  ORDER_LOADING,
  SET_SUCCESS,
  GET_ERRORS
} from "./types";
// import { clearErrors } from "./commonActions";

export const getOrders = () => dispatch => {
  dispatch(setOrderLoading());
  axios
    .get("/api/orders")
    .then(res =>
      dispatch({
        type: GET_ORDERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ORDERS,
        payload: null
      })
    );
};

export const getOrder = id => dispatch => {
  axios
    .get(`/api/orders/${id}`)
    .then(res =>
      dispatch({
        type: GET_ORDER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ORDER,
        payload: null
      })
    );
};

export const addOrder = order => dispatch => {
  dispatch(setOrderLoading());
  axios
    .post("/api/orders", order)
    .then(
      res =>
        dispatch({
          type: ADD_ORDER,
          payload: res.data
        }),
      dispatch({
        type: SET_SUCCESS,
        payload: "The order has been created."
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const clearOrder = () => {
  return {
    type: CLEAR_ORDER
  };
};

export const setOrderLoading = () => {
  return {
    type: ORDER_LOADING
  };
};
