import { SET_SUCCESS, CLEAR_SUCCESS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SUCCESS:
      return { message: action.payload };
    case CLEAR_SUCCESS:
      return {};
    default:
      return state;
  }
}
