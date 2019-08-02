import axios from "axios";
import SET_SUCCESS, { clearSuccess } from "./success";
import GET_ERRORS, { clearErrors } from "./error";

/* 
################## TYPES ##################
*/
export const GET_EVENT = "GET_EVENT";
export const GET_EVENTS = "GET_EVENTS";
export const EVENTS_LOADING = "EVENTS_LOADING";
export const EDIT_EVENT = "EDIT_EVENT";

/* 
################## REDUCER ##################
*/
const initialState = {
	events: [],
	event: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case EVENTS_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_EVENTS:
			return {
				...state,
				events: action.payload,
				loading: false
			};
		case GET_EVENT:
			return {
				...state,
				event: action.payload,
				loading: false
			};
		default:
			return state;
	}
}

/* 
################## ACTION CREATORS ##################
*/
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
