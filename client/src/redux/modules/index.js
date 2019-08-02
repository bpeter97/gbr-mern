import { combineReducers } from "redux";
import authReducer from "./../../reducers/authReducer";
import errorReducer from "./error";
import successReducer from "./success";
import userReducer from "./user";
import todoReducer from "./todo";
import customerReducer from "./../../reducers/customerReducer";
import { connectRouter } from "connected-react-router";
import quoteReducer from "./quote";
import productReducer from "./product";
import orderReducer from "./order";
import containerReducer from "./../../reducers/containerReducer";
import notificationReducer from "./../../reducers/notificationReducer";
import visitReducer from "./visit";
import eventReducer from "./../../reducers/eventReducer";
import cartReducer from "./../../reducers/cartReducer";
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
