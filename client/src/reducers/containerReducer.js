import {
  GET_CONTAINERS,
  GET_CONTAINER,
  ADD_CONTAINER,
  EDIT_CONTAINER,
  DELETE_CONTAINER,
  CLEAR_CONTAINER,
  CONTAINER_LOADING
} from "../actions/types";

const initialState = {
  containers: [],
  container: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CONTAINER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CONTAINERS:
      return {
        ...state,
        containers: action.payload,
        loading: false
      };
    case GET_CONTAINER:
      return {
        ...state,
        container: action.payload,
        loading: false
      };
    case EDIT_CONTAINER:
      return {
        ...state,
        container: action.payload,
        loading: false
      };
    case ADD_CONTAINER:
      return {
        ...state,
        containers: [action.payload, ...state.containers]
      };
    case DELETE_CONTAINER:
      return {
        ...state,
        containers: state.containers.filter(
          container => container._id !== action.payload
        )
      };
    case CLEAR_CONTAINER:
      return {};
    default:
      return state;
  }
}
