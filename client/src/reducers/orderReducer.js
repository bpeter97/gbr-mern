import {
  GET_ORDERS,
  GET_ORDER,
  ADD_ORDER,
  EDIT_ORDER,
  DELETE_ORDER,
  GET_ERRORS,
  CLEAR_ORDER,
  ORDER_LOADING
} from "../actions/types";

const initialState = {
  orders: [],
  order: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ORDER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false
      };
    case GET_ORDER:
      return {
        ...state,
        order: action.payload,
        loading: false
      };
    case EDIT_ORDER:
      return {
        ...state,
        order: action.payload,
        loading: false
      };
    case ADD_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(order => order._id !== action.payload)
      };
    case CLEAR_ORDER:
      return {};
    default:
      return state;
  }
}
