import { CLEAR_ERRORS, CLEAR_SUCCESS, SET_SUCCESS, SET_ERRORS } from "./types";

export const setErrors = success => {
  return {
    type: SET_ERRORS,
    payload: success
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const setSuccess = success => {
  return {
    type: SET_SUCCESS,
    payload: success
  };
};

export const clearSuccess = () => {
  return {
    type: CLEAR_SUCCESS
  };
};
