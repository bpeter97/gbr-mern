import axios from "axios";

import { GET_EVENTS, EVENTS_LOADING } from "./types";

export const getEvents = () => dispatch => {
  dispatch(setEventLoading());
  axios
    .get("/api/events")
    .then(res =>
      dispatch({
        type: GET_EVENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EVENTS,
        payload: null
      })
    );
};

export const setEventLoading = () => {
  return {
    type: EVENTS_LOADING
  };
};
