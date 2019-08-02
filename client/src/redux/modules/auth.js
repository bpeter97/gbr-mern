import axios from "axios";
import isEmpty from "./../../validation/isEmpty";
import setAuthToken from "./../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import GET_ERRORS, { clearErrors } from "./error";

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
	isAuthenticated: false,
	user: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			};
		default:
			return state;
	}
}

/* 
################## ACTION CREATORS ##################
*/
export const registerUser = (userData, history) => dispatch => {
	dispatch(clearErrors());
	axios
		.post("/api/register", userData)
		.then(res => history.push("/login"))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const loginUser = userData => dispatch => {
	dispatch(clearErrors());
	axios
		.post("/api/login", userData)
		.then(res => {
			const { token } = res.data;
			localStorage.setItem("jwtToken", token);
			setAuthToken(token);
			var decoded = jwt_decode(token);
			// delete decoded._id;
			dispatch(setCurrentUser(decoded));
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

export const logoutUser = () => dispatch => {
	dispatch(clearErrors());
	localStorage.removeItem("jwtToken");
	setAuthToken(false);
	dispatch(setCurrentUser({}));
};
