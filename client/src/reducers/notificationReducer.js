import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  GET_NOTIFICATIONS,
  NOTIFICATIONS_LOADING
} from "../actions/types";

const initialState = {
  notifications: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        loading: false
      };
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      };
    case DELETE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification._id !== action.payload
        )
      };
    default:
      return state;
  }
}
