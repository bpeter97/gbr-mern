import {
  GET_PRODUCTS,
  GET_PRODUCT_TYPES,
  GET_PRODUCT,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  CLEAR_PRODUCT,
  PRODUCT_LOADING
} from "../actions/types";

const initialState = {
  products: [],
  product: {},
  types: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false
      };
    case GET_PRODUCT_TYPES:
      return {
        ...state,
        types: action.payload,
        loading: false
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products]
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product._id !== action.payload
        )
      };
    case CLEAR_PRODUCT:
      return {};
    default:
      return state;
  }
}
