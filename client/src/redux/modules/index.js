import { combineReducers } from "redux";
import authReducer from "./auth";
import errorReducer from "./error";
import successReducer from "./success";
import userReducer from "./user";
import todoReducer from "./todo";
import customerReducer from "./customer";
import { connectRouter } from "connected-react-router";
import quoteReducer from "./quote";
import productReducer from "./product";
import orderReducer from "./order";
import containerReducer from "./container";
import notificationReducer from "./notification";
import visitReducer from "./visit";
import eventReducer from "./event";
import cartReducer from "./cart";
import purchaseReducer from "./purchase";

export default history =>
	combineReducers({
		auth: authReducer,
		errors: errorReducer,
		success: successReducer,
		router: connectRouter(history),
		quotes: quoteReducer,
		orders: orderReducer,
		products: productReducer,
		todos: todoReducer,
		users: userReducer,
		customers: customerReducer,
		containers: containerReducer,
		notifications: notificationReducer,
		visits: visitReducer,
		events: eventReducer,
		cart: cartReducer,
		purchase: purchaseReducer
	});
