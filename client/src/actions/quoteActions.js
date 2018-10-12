import axios from "axios";

import {
  GET_QUOTES,
  // GET_QUOTE,
  // ADD_QUOTE,
  // EDIT_QUOTE,
  // DELETE_QUOTE,
  // GET_ERRORS,
  CLEAR_QUOTE,
  QUOTE_LOADING
} from "./types";
// import { clearErrors } from "./commonActions";

export const getQuotes = () => dispatch => {
  dispatch(setQuoteLoading());
  axios
    .get("/api/quotes")
    .then(res =>
      dispatch({
        type: GET_QUOTES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_QUOTES,
        payload: null
      })
    );
};

export const clearQuote = () => {
  return {
    type: CLEAR_QUOTE
  };
};

export const setQuoteLoading = () => {
  return {
    type: QUOTE_LOADING
  };
};
