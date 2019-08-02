import axios from "axios";
import { setSuccess } from "./success";
import GET_ERRORS, { clearErrors } from "./error";
/* 
################## TYPES ##################
*/
export const CART_LOADING = "CART_LOADING";
export const GET_CART_ITEMS = "GET_CART_ITEMS";
export const ADD_CART_ITEM = "ADD_CART_ITEM";
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";
export const CLEAR_CART_ITEMS = "CLEAR_CART_ITEMS";
export const MODIFY_ITEM_QUANTITY = "MODIFY_ITEM_QUANTITY";
export const MODIFY_TAX_RATE = "MODIFY_TAX_RATE";
export const MODIFY_ITEM_PRICE = "MODIFY_ITEM_PRICE";

/* 
################## REDUCER ##################
*/
const initialState = {
	cart: [],
	totalQty: 0.0,
	priceBeforeTax: 0.0,
	salesTax: 0.0,
	totalPrice: 0.0,
	monthlyPrice: 0.0,
	taxRate: 0.08,
	deliveryTotal: 0.0,
	loading: false
};

export default function(state = initialState, action) {
	const calculatePrices = (cart, taxRate = state.taxRate) => {
		let prices = {
			priceBeforeTax: 0.0,
			totalQty: 0.0,
			monthlyPrice: 0.0,
			delivery: 0.0,
			salesTax: 0.0,
			totalPrice: 0.0,
			taxRate: taxRate
		};

		cart.forEach(item => {
			// Calculate monthly cost
			prices.monthlyPrice += item.product.monthlyPrice * item.quantity;
			// Calculate price before tax
			prices.priceBeforeTax += item.product.monthlyPrice * item.quantity;
			prices.priceBeforeTax += item.product.price * item.quantity;
			// Calculate cart quantity
			prices.totalQty += item.quantity;
			// Calculate delivery costs
			if (
				item.product.type.type === "delivery" ||
				item.product.type.type === "pickup"
			) {
				prices.delivery += item.product.price * item.quantity;
			}
			// Calculate sales tax
			prices.salesTax += item.product.price * prices.taxRate;
		});

		// Calculate total price.
		prices.totalPrice += prices.priceBeforeTax + prices.salesTax;

		return prices;
	};

	switch (action.type) {
		case CART_LOADING:
			return {
				...state,
				loading: true
			};
		case ADD_CART_ITEM: {
			let prices = calculatePrices(action.payload);

			return {
				...state,
				cart: action.payload,
				priceBeforeTax: prices ? prices.priceBeforeTax : 0,
				totalQty: prices ? prices.totalQty : 0,
				monthlyPrice: prices ? prices.monthlyPrice : 0,
				delivery: prices ? prices.delivery : 0,
				salesTax: prices ? prices.salesTax : 0,
				totalPrice: prices ? prices.totalPrice : 0,
				taxRate: prices ? prices.taxRate : state.taxRate,
				loading: false
			};
		}
		case REMOVE_CART_ITEM: {
			let prices = calculatePrices(action.payload);
			return {
				...state,
				cart: action.payload,
				priceBeforeTax: prices ? prices.priceBeforeTax : 0,
				totalQty: prices ? prices.totalQty : 0,
				monthlyPrice: prices ? prices.monthlyPrice : 0,
				delivery: prices ? prices.delivery : 0,
				salesTax: prices ? prices.salesTax : 0,
				totalPrice: prices ? prices.totalPrice : 0,
				taxRate: prices ? prices.taxRate : state.taxRate,
				loading: false
			};
		}
		case MODIFY_ITEM_QUANTITY: {
			let prices = calculatePrices(action.payload);
			return {
				...state,
				cart: action.payload,
				priceBeforeTax: prices ? prices.priceBeforeTax : 0,
				totalQty: prices ? prices.totalQty : 0,
				monthlyPrice: prices ? prices.monthlyPrice : 0,
				delivery: prices ? prices.delivery : 0,
				salesTax: prices ? prices.salesTax : 0,
				totalPrice: prices ? prices.totalPrice : 0,
				taxRate: prices ? prices.taxRate : state.taxRate,
				loading: false
			};
		}
		case MODIFY_TAX_RATE: {
			let prices = calculatePrices(action.payload.cart, action.payload.taxRate);
			return {
				...state,
				priceBeforeTax: prices ? prices.priceBeforeTax : 0,
				totalQty: prices ? prices.totalQty : 0,
				monthlyPrice: prices ? prices.monthlyPrice : 0,
				delivery: prices ? prices.delivery : 0,
				salesTax: prices ? prices.salesTax : 0,
				totalPrice: prices ? prices.totalPrice : 0,
				taxRate: prices ? prices.taxRate : state.taxRate,
				loading: false
			};
		}
		case MODIFY_ITEM_PRICE: {
			let prices = calculatePrices(action.payload);
			return {
				...state,
				cart: action.payload,
				priceBeforeTax: prices ? prices.priceBeforeTax : 0,
				totalQty: prices ? prices.totalQty : 0,
				monthlyPrice: prices ? prices.monthlyPrice : 0,
				delivery: prices ? prices.delivery : 0,
				salesTax: prices ? prices.salesTax : 0,
				totalPrice: prices ? prices.totalPrice : 0,
				taxRate: prices ? prices.taxRate : state.taxRate,
				loading: false
			};
		}
		case CLEAR_CART_ITEMS:
			return initialState;
		default:
			return state;
	}
}

/* 
################## ACTION CREATORS ##################
*/
export const addCartItem = (item, cart) => dispatch => {
	dispatch(setCartLoading());

	// check to see if cart is defined
	if (cart === undefined) {
		dispatch({
			type: GET_ERRORS,
			payload: {
				cart: "The shopping cart is undefined."
			}
		});
	}

	cart.push({
		id: cart.length,
		quantity: 1,
		product: {
			_id: item._id,
			name: item.name,
			shortName: item.shortName,
			price: item.price,
			monthlyPrice: item.monthlyPrice,
			rental: item.rental,
			type: item.type
		}
	});

	dispatch({
		type: ADD_CART_ITEM,
		payload: cart
	});
};

export const modifyItemQuantity = (id, quantity, cart) => dispatch => {
	// make sure each parameter exists
	if (cart === undefined) {
		dispatch({
			type: GET_ERRORS,
			payload: "Cart is undefined"
		});
	} else if (id === undefined) {
		dispatch({
			type: GET_ERRORS,
			payload: "Id is undefined"
		});
	} else if (quantity === undefined) {
		dispatch({
			type: GET_ERRORS,
			payload: "Quantity is undefined"
		});
	}

	cart[id].quantity = quantity;

	dispatch({
		type: MODIFY_ITEM_QUANTITY,
		payload: cart
	});
};

export const removeCartItem = (item, cart) => dispatch => {
	// check to see if item and cart exist
	if (cart === undefined) {
		dispatch({
			type: GET_ERRORS,
			payload: "Cart is undefined"
		});
	} else if (item === undefined) {
		dispatch({
			type: GET_ERRORS,
			payload: "Item is undefined"
		});
	}

	// Remove item from cart array
	for (var i = 0; i < cart.length; i++) {
		if (cart[i].product._id === item._id) {
			cart.splice(i, 1);
		}
	}

	dispatch({
		type: REMOVE_CART_ITEM,
		payload: cart
	});
};

export const modifyCartTaxRate = (rate, cart) => dispatch => {
	// Check to see if rate or cart is undefined
	if (rate === undefined) {
		dispatch({
			type: GET_ERRORS,
			payload: "Tax rate is undefined."
		});
	} else if (cart === undefined) {
		dispatch({
			type: GET_ERRORS,
			payload: "Cart is undefined."
		});
	}

	if (rate === "") {
		rate = 0.0;
	}

	// set tax rate
	cart.taxRate = parseFloat(rate);

	dispatch({
		type: MODIFY_TAX_RATE,
		payload: cart
	});
};

export const changeCartItemPrice = (id, price, cart, monthly) => dispatch => {
	if (price === undefined) {
		dispatch({
			type: GET_ERRORS,
			payload: "Item is undefined"
		});
	} else if (cart === undefined) {
		dispatch({
			type: GET_ERRORS,
			payload: "Cart is undefined"
		});
	} else if (id === undefined) {
		dispatch({
			type: GET_ERRORS,
			payload: "Id is undefined"
		});
	}

	// find product in cart
	if (monthly) {
		cart[id].product.monthlyPrice = parseFloat(price);
	} else {
		cart[id].product.price = parseFloat(price);
	}

	dispatch({
		type: MODIFY_ITEM_PRICE,
		payload: cart
	});
};

export const changeItemPrice = (id, price, cart, monthly = false) => {
	return [
		changeCartItemPrice(id, price, cart, monthly),
		setSuccess(`Item price successfully updated.`)
	];
};

export const removeItem = (item, cart) => {
	return [
		removeCartItem(item, cart),
		setSuccess(`${item.name} successfully added.`)
	];
};

export const addItem = (item, cart) => {
	return [
		clearErrors(),
		addCartItem(item, cart),
		setSuccess(`${item.name} successfully added.`)
	];
};

export const modifyQuantity = (id, quantity, cart) => {
	return [
		modifyItemQuantity(id, parseInt(quantity, 10), cart),
		setSuccess(`Item quantity successfully updated.`)
	];
};

export const modifyTaxRate = (rate, cart) => {
	return [modifyCartTaxRate(rate, cart), setSuccess(`Tax rate updated.`)];
};

export const setCartLoading = () => {
	return {
		type: CART_LOADING
	};
};
