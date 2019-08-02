import axios from "axios";

/* 
################## TYPES ##################
*/
export const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";
export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";
export const NOTIFICATIONS_LOADING = "NOTIFICATIONS_LOADING";

/* 
################## REDUCER ##################
*/
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

/* 
################## ACTION CREATORS ##################
*/
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
