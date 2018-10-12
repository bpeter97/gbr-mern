import {
  GET_QUOTES,
  GET_QUOTE,
  ADD_QUOTE,
  EDIT_QUOTE,
  DELETE_QUOTE,
  CLEAR_QUOTE,
  QUOTE_LOADING
} from "../actions/types";

const initialState = {
  quotes: [],
  quote: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case QUOTE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_QUOTES:
      return {
        ...state,
        quotes: action.payload,
        loading: false
      };
    case GET_QUOTE:
      return {
        ...state,
        quote: action.payload,
        loading: false
      };
    case EDIT_QUOTE:
      return {
        ...state,
        quote: action.payload,
        loading: false
      };
    case ADD_QUOTE:
      return {
        ...state,
        quotes: [action.payload, ...state.customers]
      };
    case DELETE_QUOTE:
      return {
        ...state,
        customers: state.customers.filter(
          customer => customer._id !== action.payload
        )
      };
    case CLEAR_QUOTE:
      return {};
    default:
      return state;
  }
}
