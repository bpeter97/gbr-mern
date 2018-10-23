import { GET_VISITS, VISITS_LOADING } from "../actions/types";

const initialState = {
  visits: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VISITS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_VISITS:
      return {
        ...state,
        visits: action.payload,
        loading: false
      };
    default:
      return state;
  }
}