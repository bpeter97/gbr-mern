import axios from "axios";
import GET_ERRORS from "./error";

/* 
################## TYPES ##################
*/
export const GET_VISITS = "GET_VISITS";
export const VISITS_LOADING = "VISITS_LOADING";

/* 
################## REDUCER ##################
*/
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

/* 
################## ACTION CREATORS ##################
*/
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
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const setVisitLoading = () => {
	return {
		type: VISITS_LOADING
	};
};
