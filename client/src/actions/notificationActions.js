import axios from "axios";

import {
  GET_NOTIFICATIONS,
  // ADD_NOTIFICATION,
  // DELETE_NOTIFICATION,
  NOTIFICATIONS_LOADING
} from "./types";
// import { clearErrors } from "./commonActions";

export const getNotifications = () => dispatch => {
  dispatch(setNotificationLoading());
  axios
    .get("/api/notifications")
    .then(res =>
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: null
      })
    );
};

export const setNotificationLoading = () => {
  return {
    type: NOTIFICATIONS_LOADING
  };
};
