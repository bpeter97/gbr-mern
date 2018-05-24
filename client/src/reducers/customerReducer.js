import {
  GET_CUSTOMERS,
  GET_CUSTOMER,
  EDIT_CUSTOMER,
  DELETE_CUSTOMER,
  CUSTOMERS_LOADING,
  GET_ERRORS
} from "../actions/types";

const initialState = {
  customers: [],
  customer: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CUSTOMERS_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_CUSTOMER:
      return {
        ...state,
        customers: [action.payload, ...state.customers]
      };
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
        loading: false
      };
    case GET_CUSTOMER:
      return {
        ...state,
        customer: action.payload,
        loading: false
      };
    case EDIT_CUSTOMER:
      return {
        ...state,
        customer: action.payload
      };
    case DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(
          customers => customer._id !== action.payload
        )
      };
    default:
      return state;
  }
}
