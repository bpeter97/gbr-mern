import axios from "axios";

import {
  GET_PRODUCTS,
  // GET_PRODUCT,
  // ADD_PRODUCT,
  // EDIT_PRODUCT,
  // DELETE_PRODUCT,
  // GET_ERRORS,
  CLEAR_PRODUCT,
  PRODUCT_LOADING
} from "./types";
// import { clearErrors } from "./commonActions";

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
