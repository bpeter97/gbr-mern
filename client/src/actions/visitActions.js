import axios from "axios";

import { GET_VISITS, VISITS_LOADING } from "./types";

export const getVisits = () => dispatch => {
  dispatch(setVisitLoading());
  axios
    .get("/api/visits")
    .then(res =>
      dispatch({
        type: GET_VISITS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_VISITS,
        payload: null
      })
    );
};

export const setVisitLoading = () => {
  return {
    type: VISITS_LOADING
  };
};
