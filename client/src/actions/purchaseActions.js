import {
  PURCHASE_LOADING,
  SET_PURCHASE_TYPE,
  CLEAR_PURCHASE,
  SET_JOB_NAME,
  SET_JOB_ADDRESS,
  SET_JOB_CITY,
  SET_JOB_ZIPCODE,
  GET_ERRORS
} from "./types";
import { setSuccess } from "./commonActions";

export const changePurchaseType = (type, purchaseType) => dispatch => {
  dispatch(setPurchaseLoading());

  // check to see if cart is defined
  if (type === undefined) {
    dispatch({
      type: GET_ERRORS,
      payload: "The purchase type is undefined."
    });
  }

  dispatch({
    type: SET_PURCHASE_TYPE,
    payload: type,
    purchaseType: purchaseType
  });
};

export const changeJobInfo = (dataType, info) => dispatch => {
  dispatch(setPurchaseLoading());

  // check to see if type & info is defined
  if (dataType === undefined || info === undefined) {
    dispatch({
      type: GET_ERRORS,
      payload: "Type or job info is undefined."
    });
  }

  switch (dataType) {
    case "jobName": {
      dispatch({
        type: SET_JOB_NAME,
        payload: info
      });
      break;
    }
    case "jobAddress": {
      dispatch({
        type: SET_JOB_ADDRESS,
        payload: info
      });
      break;
    }
    case "jobCity": {
      dispatch({
        type: SET_JOB_CITY,
        payload: info
      });
      break;
    }
    case "jobZipcode": {
      dispatch({
        type: SET_JOB_ZIPCODE,
        payload: info
      });
      break;
    }
    default:
      break;
  }
};

export const setJobInfo = (dataType, info) => {
  return [
    changeJobInfo(dataType, info),
    setSuccess("The job info has been updated.")
  ];
};

export const setPurchaseType = (type, purchaseType) => {
  return [
    changePurchaseType(type, purchaseType),
    setSuccess(`The purchase type has been set to "${type}".`)
  ];
};

export const setPurchaseLoading = () => {
  return {
    type: PURCHASE_LOADING
  };
};

export const clearPurchase = () => {
  return {
    type: CLEAR_PURCHASE
  };
};
