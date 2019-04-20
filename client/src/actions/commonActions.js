import { CLEAR_ERRORS, CLEAR_SUCCESS, SET_SUCCESS } from "./types";

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const setSuccess = msg => {
  return {
    type: SET_SUCCESS,
    payload: msg
  };
};

export const clearSuccess = () => {
  return {
    type: CLEAR_SUCCESS
  };
};
