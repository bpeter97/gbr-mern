import axios from "axios";

import {
  GET_CUSTOMERS,
  GET_CUSTOMER,
  ADD_CUSTOMER,
  EDIT_CUSTOMER,
  DELETE_CUSTOMER,
  GET_ERRORS,
  CLEAR_CUSTOMER,
  CUSTOMER_LOADING
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
  dispatch(setCustomerLoading());
  axios
    .get("/api/customers")
    .then(res => {
      // Callback function to ensure dispatch doesn't
      // occur until after forEach completes
      function callback(data) {
        dispatch({
          type: GET_CUSTOMERS,
          payload: res.data
        });
      }

      var customersProcessed = 0;

      res.data.forEach(customer => {
        axios.get(`/api/orders/customer/${customer._id}`).then(newRes => {
          customer.orders = newRes.data.orders;
          customersProcessed++;
          if (customersProcessed === res.data.length) {
            callback(res.data);
          }
        });
      });
    })
    .catch(err =>
      dispatch({
        type: GET_CUSTOMERS,
        payload: null
      })
    );
};

export const getCustomer = id => dispatch => {
  dispatch(setCustomerLoading());
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

export const editCustomer = customerData => dispatch => {
  dispatch(clearErrors());
  axios
    .patch(`/api/customers/${customerData._id}`, customerData)
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
export const clearCustomer = () => {
  return {
    type: CLEAR_CUSTOMER
  };
};

export const setCustomerLoading = () => {
  return {
    type: CUSTOMER_LOADING
  };
};
