/* 
################## TYPES ##################
*/
export const GET_ERRORS = "GET_ERRORS";
export const SET_ERRORS = "SET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

/* 
################## REDUCER ##################
*/
const initialState = {};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_ERRORS: {
			return {
				error: action.payload
			};
		}
		case GET_ERRORS: {
			return action.payload;
		}
		case CLEAR_ERRORS: {
			return {};
		}
		default:
			return state;
	}
}

/* 
################## ACTION CREATORS ##################
*/
export const setErrors = success => {
	return {
		type: SET_ERRORS,
		payload: success
	};
};

export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};
