import axios from "axios";

/* 
################## TYPES ##################
*/
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const GET_USERS = "GET_USERS";
export const USERS_LOADING = "USERS_LOADING";

/* 
################## REDUCER ##################
*/
const initialState = {
	users: [],
	user: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case USERS_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_USERS:
			return {
				...state,
				users: action.payload,
				loading: false
			};
		default:
			return state;
	}
}

/* 
################## ACTION CREATORS ##################
*/
export const getUsers = () => dispatch => {
	dispatch(setUsersLoading());
	axios
		.get("/api/users")
		.then(res =>
			dispatch({
				type: GET_USERS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_USERS,
				payload: null
			})
		);
};

export const setUsersLoading = () => {
	return {
		type: USERS_LOADING
	};
};
