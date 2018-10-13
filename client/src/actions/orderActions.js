import axios from "axios";

import {
  GET_ORDERS,
  // GET_ORDER,
  // ADD_ORDER,
  // EDIT_ORDER,
  // DELETE_ORDER,
  // GET_ERRORS,
  CLEAR_ORDER,
  ORDER_LOADING
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
