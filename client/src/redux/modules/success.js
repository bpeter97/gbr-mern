/* 
################## TYPES ##################
*/
export const CLEAR_SUCCESS = "CLEAR_SUCCESS";
export const SET_SUCCESS = "SET_SUCCESS";

/* 
################## REDUCER ##################
*/
const initialState = {};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_SUCCESS:
			return { message: action.payload };
		case CLEAR_SUCCESS:
			return {};
		default:
			return state;
	}
}

/* 
################## ACTION CREATORS ##################
*/
export const setSuccess = success => {
	return {
		type: SET_SUCCESS,
		payload: success
	};
};

export const clearSuccess = () => {
	return {
		type: CLEAR_SUCCESS
	};
};
