import axios from "axios";

import {
  GET_EVENTS,
  GET_EVENT,
  EVENTS_LOADING,
  EDIT_EVENT,
  GET_ERRORS,
  SET_SUCCESS
} from "./types";
import { clearErrors, clearSuccess } from "./commonActions";

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

export const editEvent = e => dispatch => {
  dispatch(setEventLoading());
  dispatch(clearErrors());
  dispatch(clearSuccess());
  let event = {
    _id: e._id,
    title: e.title,
    color: e.color,
    start: e.start,
    end: e.end,
    order: e.order._id
  };

  axios
    .patch(`/api/events/${event._id}`, event)
    .then(
      res =>
        dispatch({
          type: EDIT_EVENT,
          payload: res.data
        }),
      dispatch({
        type: SET_SUCCESS,
        payload: "Event sucessfully updated."
      })
    )
    .catch(err =>
      dispatch({
        tye: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setEventLoading = () => {
  return {
    type: EVENTS_LOADING
  };
};
