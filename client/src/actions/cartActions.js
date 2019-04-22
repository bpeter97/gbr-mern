import {
  CART_LOADING,
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  CLEAR_CART_ITEMS,
  MODIFY_ITEM_QUANTITY,
  MODIFY_TAX_RATE,
  MODIFY_ITEM_PRICE,
  GET_ERRORS
} from "./types";
import { setSuccess, clearErrors } from "./commonActions";

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
