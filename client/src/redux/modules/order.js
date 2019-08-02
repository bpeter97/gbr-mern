import axios from "axios";
import GET_ERRORS from "./error";
import SET_SUCCESS from "./success";

/* 
################## TYPES ##################
*/
export const GET_ORDERS = "GET_ORDERS";
export const GET_ORDER = "GET_ORDER";
export const ADD_ORDER = "ADD_ORDER";
export const EDIT_ORDER = "EDIT_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";
export const CLEAR_ORDER = "CLEAR_ORDER";
export const ADD_ORDER_SIGNATURE = "ADD_ORDER_SIGNATURE";
export const DELETE_ORDER_SIGNATURE = "DELETE_ORDER_SIGNATURE";
export const GET_ORDER_SIGNATURE = "GET_ORDER_SIGNATURE";
export const ORDER_LOADING = "ORDER_LOADING";

/* 
################## REDUCER ##################
*/
const initialState = {
	orders: [],
	order: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ORDER_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_ORDERS: {
			action.payload.forEach(order => {
				let newCreationDate = new Date(order.creationDate);
				let newDateFormat =
					newCreationDate.getMonth() +
					"/" +
					newCreationDate.getDay() +
					"/" +
					newCreationDate.getFullYear();
				order.creationDate = newDateFormat;
			});

			return {
				...state,
				orders: action.payload,
				loading: false
			};
		}
		case GET_ORDER:
			return {
				...state,
				order: action.payload,
				loading: false
			};
		case EDIT_ORDER:
			return {
				...state,
				order: action.payload,
				loading: false
			};
		case ADD_ORDER:
			return {
				...state,
				orders: [action.payload, ...state.orders]
			};
		case DELETE_ORDER:
			return {
				...state,
				orders: state.orders.filter(order => order._id !== action.payload)
			};
		case GET_ORDER_SIGNATURE:
			return {
				...state,
				order: {
					...state.order,
					signature: action.payload
				}
			};
		case ADD_ORDER_SIGNATURE:
			return {
				...state,
				order: {
					...state.order,
					signature: action.payload
				}
			};
		case DELETE_ORDER_SIGNATURE:
			return {
				...state,
				order: {
					...state.order,
					signature: null
				}
			};
		case CLEAR_ORDER:
			return {};
		default:
			return state;
	}
}

/* 
################## ACTION CREATORS ##################
*/
export const getOrders = () => dispatch => {
	dispatch(setOrderLoading());
	axios
		.get("/api/orders")
		.then(res =>
			dispatch({
				type: GET_ORDERS,
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

export const getOrderSignature = id => dispatch => {
	axios
		.get(`/api/orders/signature/${id}`)
		.then(res =>
			dispatch({
				type: GET_ORDER_SIGNATURE,
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

export const deleteOrderSignature = id => dispatch => {
	axios
		.delete(`/api/orders/signature/${id}`)
		.then(
			res =>
				dispatch({
					type: DELETE_ORDER_SIGNATURE,
					payload: res.data
				}),
			dispatch({
				type: SET_SUCCESS,
				payload: "The order signature has been removed."
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const getOrder = id => dispatch => {
	axios
		.get(`/api/orders/${id}`)
		.then(res =>
			dispatch({
				type: GET_ORDER,
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

export const addOrderSignature = signature => dispatch => {
	dispatch(setOrderLoading());
	axios
		.post("/api/orders/signature", signature)
		.then(
			res =>
				dispatch({
					type: ADD_ORDER_SIGNATURE,
					payload: res.data
				}),
			dispatch({
				type: SET_SUCCESS,
				payload: "The order signature has been added."
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const addOrder = order => dispatch => {
	dispatch(setOrderLoading());
	axios
		.post("/api/orders", order)
		.then(
			res =>
				dispatch({
					type: ADD_ORDER,
					payload: res.data
				}),
			dispatch({
				type: SET_SUCCESS,
				payload: "The order has been created."
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const clearOrder = () => {
	return {
		type: CLEAR_ORDER
	};
};

export const setOrderLoading = () => {
	return {
		type: ORDER_LOADING
	};
};
