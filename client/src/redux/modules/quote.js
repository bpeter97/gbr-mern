import axios from "axios";
import GET_ERRORS from "./error";

/* 
################## TYPES ##################
*/
export const GET_QUOTES = "GET_QUOTES";
export const GET_QUOTE = "GET_QUOTE";
export const ADD_QUOTE = "ADD_QUOTE";
export const EDIT_QUOTE = "EDIT_QUOTE";
export const DELETE_QUOTE = "DELETE_QUOTE";
export const CLEAR_QUOTE = "CLEAR_QUOTE";
export const QUOTE_LOADING = "QUOTE_LOADING";

/* 
################## REDUCER ##################
*/
const initialState = {
	quotes: [],
	quote: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case QUOTE_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_QUOTES:
			return {
				...state,
				quotes: action.payload,
				loading: false
			};
		case GET_QUOTE:
			return {
				...state,
				quote: action.payload,
				loading: false
			};
		case EDIT_QUOTE:
			return {
				...state,
				quote: action.payload,
				loading: false
			};
		case ADD_QUOTE:
			return {
				...state,
				quotes: [action.payload, ...state.quotes]
			};
		case DELETE_QUOTE:
			return {
				...state,
				quotes: state.quotes.filter(quote => quote._id !== action.payload)
			};
		case CLEAR_QUOTE:
			return {};
		default:
			return state;
	}
}

/* 
################## ACTION CREATOR ##################
*/
export const getQuotes = () => dispatch => {
	dispatch(setQuoteLoading());
	axios
		.get("/api/quotes")
		.then(res =>
			dispatch({
				type: GET_QUOTES,
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

export const clearQuote = () => {
	return {
		type: CLEAR_QUOTE
	};
};

export const setQuoteLoading = () => {
	return {
		type: QUOTE_LOADING
	};
};
