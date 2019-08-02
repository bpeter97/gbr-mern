import axios from "axios";
import SET_SUCCESS, { clearSuccess } from "./success";
import GET_ERRORS, { clearErrors } from "./error";

/* 
################## TYPES ##################
*/
export const GET_CONTAINERS = "GET_CONTAINERS";
export const GET_CONTAINER = "GET_CONTAINER";
export const GET_CONTAINER_SIZES = "GET_CONTAINER_SIZES";
export const ADD_CONTAINER = "ADD_CONTAINER";
export const EDIT_CONTAINER = "EDIT_CONTAINER";
export const DELETE_CONTAINER = "DELETE_CONTAINER";
export const CLEAR_CONTAINER = "CLEAR_CONTAINER";
export const CONTAINER_LOADING = "CONTAINER_LOADING";

/* 
################## REDUCER ##################
*/
const initialState = {
	containers: [],
	container: {},
	sizes: [],
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case CONTAINER_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_CONTAINERS:
			return {
				...state,
				containers: action.payload,
				loading: false
			};
		case GET_CONTAINER:
			return {
				...state,
				container: action.payload,
				loading: false
			};
		case GET_CONTAINER_SIZES:
			return {
				...state,
				sizes: action.payload,
				loading: false
			};
		case EDIT_CONTAINER:
			return {
				...state,
				container: action.payload,
				loading: false
			};
		case ADD_CONTAINER:
			return {
				...state,
				containers: [action.payload, ...state.containers]
			};
		case DELETE_CONTAINER:
			return {
				...state,
				containers: state.containers.filter(
					container => container._id !== action.payload
				)
			};
		case CLEAR_CONTAINER:
			return {};
		default:
			return state;
	}
}

/* 
################## ACTION CREATORS ##################
*/
export const getContainers = () => dispatch => {
	dispatch(setContainerLoading());
	axios
		.get("/api/containers")
		.then(res =>
			dispatch({
				type: GET_CONTAINERS,
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

export const getContainer = id => dispatch => {
	dispatch(clearSuccess());
	dispatch(clearErrors());
	dispatch(setContainerLoading());
	axios
		.get(`/api/containers/${id}`)
		.then(res =>
			dispatch({
				type: GET_CONTAINER,
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

export const getContainerSizes = id => dispatch => {
	dispatch(setContainerLoading());
	axios
		.get(`/api/containers/sizes`)
		.then(res =>
			dispatch({
				type: GET_CONTAINER_SIZES,
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

export const editContainer = containerData => dispatch => {
	dispatch(clearErrors());
	dispatch(clearSuccess());
	axios
		.patch(`/api/containers/${containerData._id}`, containerData)
		.then(
			res =>
				dispatch({
					type: EDIT_CONTAINER,
					payload: res.data
				}),
			dispatch({
				type: SET_SUCCESS,
				payload: "Container sucessfully updated."
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const addContainer = containerData => dispatch => {
	dispatch(clearErrors());
	dispatch(clearSuccess());
	axios
		.post("/api/containers", containerData)
		.then(
			res =>
				dispatch({
					type: ADD_CONTAINER,
					payload: res.data
				}),
			dispatch({
				type: SET_SUCCESS,
				payload: "Container sucessfully created."
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const clearContainer = () => {
	return {
		type: CLEAR_CONTAINER
	};
};

export const setContainerLoading = () => {
	return {
		type: CONTAINER_LOADING
	};
};
