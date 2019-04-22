import {
  PURCHASE_LOADING,
  SET_PURCHASE_TYPE,
  CLEAR_PURCHASE,
  GET_ERRORS
} from "./types";
import { setSuccess } from "./commonActions";

export const changePurchaseType = (type, purchaseType) => dispatch => {
  dispatch(setPurchaseLoading());

  // check to see if cart is defined
  if (type === undefined) {
    dispatch({
      type: GET_ERRORS,
      payload: {
        cart: "The purchase type is undefined."
      }
    });
  }

  dispatch({
    type: SET_PURCHASE_TYPE,
    payload: type,
    purchaseType: purchaseType
  });
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
