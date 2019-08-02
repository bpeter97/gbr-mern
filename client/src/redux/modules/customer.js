import axios from "axios";
import SET_SUCCESS, { clearSuccess } from "./success";
import GET_ERRORS, { clearErrors } from "./error";

/* 
################## TYPES ##################
*/
export const GET_CUSTOMERS = "GET_CUSTOMERS";
export const GET_CUSTOMER = "GET_CUSTOMER";
export const EDIT_CUSTOMER = "EDIT_CUSTOMER";
export const ADD_CUSTOMER = "ADD_CUSTOMER";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";
export const CLEAR_CUSTOMER = "DELETE_CUSTOMER";
export const CUSTOMERS_LOADING = "CUSTOMERS_LOADING";
export const CUSTOMER_LOADING = "CUSTOMER_LOADING";
export const SET_PURCHASE_CUSTOMER = "SET_PURCHASE_CUSTOMER";

/* 
################## REDUCER ##################
*/
const initialState = {
	customers: [],
	customer: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case CUSTOMER_LOADING:
			return {
				...state,
				loading: true
			};
		case ADD_CUSTOMER:
			return {
				...state,
				customers: [action.payload, ...state.customers]
			};
		case GET_CUSTOMERS:
			return {
				...state,
				customers: action.payload,
				loading: false
			};
		case GET_CUSTOMER:
			return {
				...state,
				customer: action.payload,
				loading: false
			};
		case EDIT_CUSTOMER:
			return {
				...state,
				customer: action.payload
			};
		case DELETE_CUSTOMER:
			return {
				...state,
				customers: state.customers.filter(
					customer => customer._id !== action.payload
				)
			};
		case CLEAR_CUSTOMER:
			return {};
		default:
			return state;
	}
}

/* 
################## ACTION CREATORS ##################
*/
export const addCustomer = (customerData, purchase = false) => dispatch => {
	dispatch(clearErrors());
	dispatch(clearSuccess());
	axios
		.post("/api/customers", customerData)
		.then(res => {
			dispatch({
				type: ADD_CUSTOMER,
				payload: res.data
			});
			if (purchase) {
				dispatch({
					type: SET_PURCHASE_CUSTOMER,
					payload: res.data._id
				});
				dispatch({
					type: SET_SUCCESS,
					payload: "Customer sucessfully added and selected."
				});
			} else {
				dispatch({
					type: SET_SUCCESS,
					payload: "Customer sucessfully created."
				});
			}
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};
export const getCustomers = () => dispatch => {
	dispatch(setCustomerLoading());
	axios
		.get("/api/customers")
		.then(res => {
			// Callback function to ensure dispatch doesn't
			// occur until after forEach completes
			function callback(data) {
				dispatch({
					type: GET_CUSTOMERS,
					payload: res.data
				});
			}

			var customersProcessed = 0;

			res.data.forEach(customer => {
				axios.get(`/api/orders/customer/${customer._id}`).then(newRes => {
					customer.orders = newRes.data.orders;
					customersProcessed++;
					if (customersProcessed === res.data.length) {
						callback(res.data);
					}
				});
			});
		})
		.catch(err =>
			dispatch({
				type: GET_CUSTOMERS,
				payload: null
			})
		);
};

export const getCustomer = id => dispatch => {
	dispatch(setCustomerLoading());
	axios
		.get(`/api/customers/${id}`)
		.then(res => {
			// Callback function to ensure dispatch doesn't occur too soon.
			function callback(data) {
				dispatch({
					type: GET_CUSTOMER,
					payload: res.data
				});
			}
			axios.get(`/api/orders/customer/${res.data._id}`).then(newRes => {
				res.data.orders = newRes.data.orders;
				callback(res.data);
			});
		})
		.catch(err =>
			dispatch({
				type: GET_CUSTOMER,
				payload: null
			})
		);
};

export const editCustomer = customerData => dispatch => {
	dispatch(clearErrors());
	axios
		.patch(`/api/customers/${customerData._id}`, customerData)
		.then(
			res =>
				dispatch({
					type: EDIT_CUSTOMER,
					payload: res.data
				}),
			dispatch({
				type: SET_SUCCESS,
				payload: "Customer sucessfully updated."
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const deleteCustomer = id => dispatch => {
	dispatch(clearErrors());
	axios
		.delete(`/api/customers/${id}`)
		.then(res =>
			dispatch({
				type: DELETE_CUSTOMER,
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
export const clearCustomer = () => {
	return {
		type: CLEAR_CUSTOMER
	};
};

export const setCustomerLoading = () => {
	return {
		type: CUSTOMER_LOADING
	};
};
