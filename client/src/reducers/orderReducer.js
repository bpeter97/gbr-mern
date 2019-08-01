import {
  GET_ORDERS,
  GET_ORDER,
  ADD_ORDER,
  EDIT_ORDER,
  DELETE_ORDER,
  CLEAR_ORDER,
  ORDER_LOADING,
  GET_ORDER_SIGNATURE,
  ADD_ORDER_SIGNATURE,
  DELETE_ORDER_SIGNATURE
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
    case GET_ORDERS: {
      action.payload.forEach(order => {
        let newCreationDate = new Date(order.creationDate);
        let newDateFormat =
          newCreationDate.getMonth() +
          "/" +
          newCreationDate.getDay() +
          "/" +
          newCreationDate.getFullYear();
        order.creationDate = newDateFormat;
      });

      return {
        ...state,
        orders: action.payload,
        loading: false
      };
    }
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
    case GET_ORDER_SIGNATURE:
      return {
        ...state,
        order: {
          ...state.order,
          signature: action.payload
        }
      };
    case ADD_ORDER_SIGNATURE:
      return {
        ...state,
        order: {
          ...state.order,
          signature: action.payload
        }
      };
    case DELETE_ORDER_SIGNATURE:
      return {
        ...state,
        order: {
          ...state.order,
          signature: null
        }
      };
    case CLEAR_ORDER:
      return {};
    default:
      return state;
  }
}
