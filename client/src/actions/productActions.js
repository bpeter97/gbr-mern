import axios from "axios";

import {
  GET_PRODUCTS,
  GET_PRODUCT,
  // ADD_PRODUCT,
  EDIT_PRODUCT,
  // DELETE_PRODUCT,
  GET_ERRORS,
  CLEAR_PRODUCT,
  PRODUCT_LOADING
} from "./types";
import { clearErrors } from "./commonActions";

export const getProducts = () => dispatch => {
  dispatch(setProductLoading());
  axios
    .get("/api/products")
    .then(res =>
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PRODUCTS,
        payload: null
      })
    );
};

export const getProduct = id => dispatch => {
  dispatch(setProductLoading());
  axios
    .get(`/api/products/${id}`)
    .then(res =>
      dispatch({
        type: GET_PRODUCT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PRODUCT,
        payload: null
      })
    );
};

export const editProduct = productData => dispatch => {
  dispatch(clearErrors());
  axios
    .patch(`/api/products/${productData._id}`, productData)
    .then(res =>
      dispatch({
        type: EDIT_PRODUCT,
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

export const clearProduct = () => {
  return {
    type: CLEAR_PRODUCT
  };
};

export const setProductLoading = () => {
  return {
    type: PRODUCT_LOADING
  };
};
