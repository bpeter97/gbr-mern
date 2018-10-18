import axios from "axios";

import { GET_EVENTS, GET_EVENT, EVENTS_LOADING } from "./types";

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

export const getEvent = id => dispatch => {
  dispatch(setEventLoading());
  axios
    .get(`/api/events/${id}`)
    .then(res =>
      dispatch({
        type: GET_EVENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EVENT,
        payload: null
      })
    );
};

export const setEventLoading = () => {
  return {
    type: EVENTS_LOADING
  };
};
