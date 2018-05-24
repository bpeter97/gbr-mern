import axios from "axios";

import {
  GET_CUSTOMERS,
  GET_CUSTOMER,
  ADD_CUSTOMER,
  EDIT_CUSTOMER,
  DELETE_CUSTOMER,
  CUSTOMERS_LOADING,
  GET_ERRORS
} from "./types";
import { clearErrors } from "./commonActions";

export const addCustomer = customerData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/customers", customerData)
    .then(res =>
      dispatch({
        type: ADD_CUSTOMER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};
export const getCustomers = () => dispatch => {
  axios
    .get("/api/customers")
    .then(res =>
      dispatch({
        type: GET_CUSTOMERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CUSTOMERS,
        payload: null
      })
    );
};

export const getCustomer = id => dispatch => {
  axios
    .get(`/api/customers/${id}`)
    .then(res =>
      dispatch({
        type: GET_CUSTOMER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CUSTOMER,
        payload: null
      })
    );
};

export const editCustomer = id => dispatch => {
  dispatch(clearErrors());
  axios
    .patch(`/api/customers/${id}`)
    .then(res =>
      dispatch({
        type: EDIT_CUSTOMER,
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

export const deleteCustomer = id => dispatch => {
  dispatch(clearErrors());
  axios
    .delete(`/api/customers/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_CUSTOMER,
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

export const setCustomersLoading = () => {
  return {
    type: CUSTOMERS_LOADING
  };
};
