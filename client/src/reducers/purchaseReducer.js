import {
  PURCHASE_LOADING,
  SET_PURCHASE_TYPE,
  CLEAR_PURCHASE
} from "../actions/types";

const initialState = {
  order: {},
  quote: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.purchaseType) {
    case "order": {
      switch (action.type) {
        case PURCHASE_LOADING:
          return {
            ...state,
            loading: true
          };
        case SET_PURCHASE_TYPE:
          return {
            ...state,
            order: {
              ...state.order,
              purchaseType: action.payload
            },
            loading: false
          };
        case CLEAR_PURCHASE: {
          return {
            order: {},
            quote: {},
            loading: false
          };
        }
        default:
          return state;
      }
    }
    case "rental": {
      switch (action.type) {
        case PURCHASE_LOADING:
          return {
            ...state,
            loading: true
          };
        case SET_PURCHASE_TYPE:
          return {
            ...state,
            order: {
              ...state.order,
              purchaseType: action.payload
            },
            loading: false
          };
        case CLEAR_PURCHASE: {
          return {
            order: {},
            quote: {},
            loading: false
          };
        }
        default:
          return state;
      }
    }
    default:
      return state;
  }
}
