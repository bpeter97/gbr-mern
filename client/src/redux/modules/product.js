import axios from "axios";
import { clearSuccess } from "./../modules/success";
import GET_ERRORS, { clearErrors } from "./../modules/error";
import SET_SUCCESS from "./../modules/success";

/* 
################## TYPES ##################
*/
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_TYPES = "GET_PRODUCT_TYPES";
export const GET_PRODUCT = "GET_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CLEAR_PRODUCT = "CLEAR_PRODUCT";
export const PRODUCT_LOADING = "PRODUCT_LOADING";

/* 
################## REDUCER ##################
*/
const initialState = {
	products: [],
	product: {},
	types: [],
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case PRODUCT_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_PRODUCTS:
			return {
				...state,
				products: action.payload,
				loading: false
			};
		case GET_PRODUCT:
			return {
				...state,
				product: action.payload,
				loading: false
			};
		case GET_PRODUCT_TYPES:
			return {
				...state,
				types: action.payload,
				loading: false
			};
		case EDIT_PRODUCT:
			return {
				...state,
				product: action.payload,
				loading: false
			};
		case ADD_PRODUCT:
			return {
				...state,
				products: [action.payload, ...state.products]
			};
		case DELETE_PRODUCT:
			return {
				...state,
				products: state.products.filter(
					product => product._id !== action.payload
				)
			};
		case CLEAR_PRODUCT:
			return {};
		default:
			return state;
	}
}

/* 
################## ACTION CREATORS ##################
*/
export const getProducts = () => dispatch => {
	dispatch(setProductLoading());
	axios
		.get("/api/products")
		.then(res =>
			dispatch({
				type: GET_PRODUCTS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PRODUCTS,
				payload: null
			})
		);
};

export const getProduct = id => dispatch => {
	dispatch(setProductLoading());
	axios
		.get(`/api/products/${id}`)
		.then(res =>
			dispatch({
				type: GET_PRODUCT,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PRODUCT,
				payload: null
			})
		);
};

export const getProductTypes = () => dispatch => {
	dispatch(setProductLoading());
	axios
		.get("/api/products/types")
		.then(res =>
			dispatch({
				type: GET_PRODUCT_TYPES,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PRODUCT_TYPES,
				payload: null
			})
		);
};

export const addProduct = productData => dispatch => {
	dispatch(clearErrors());
	dispatch(clearSuccess());
	axios
		.post("/api/products", productData)
		.then(
			res =>
				dispatch({
					type: ADD_PRODUCT,
					payload: res.data
				}),
			dispatch({
				type: SET_SUCCESS,
				payload: "Product successfully created."
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const editProduct = productData => dispatch => {
	dispatch(clearErrors());
	axios
		.patch(`/api/products/${productData._id}`, productData)
		.then(
			res =>
				dispatch({
					type: EDIT_PRODUCT,
					payload: res.data
				}),
			dispatch({
				type: SET_SUCCESS,
				payload: "Product successfully updated."
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const clearProduct = () => {
	return {
		type: CLEAR_PRODUCT
	};
};

export const setProductLoading = () => {
	return {
		type: PRODUCT_LOADING
	};
};
