import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import successReducer from "./successReducer";
import userReducer from "./userReducer";
import todoReducer from "./todoReducer";
import customerReducer from "./customerReducer";
import { routerReducer } from "react-router-redux";
import quoteReducer from "./quoteReducer";
import productReducer from "./productReducer";
import orderReducer from "./orderReducer";
import containerReducer from "./containerReducer";
import notificationReducer from "./notificationReducer";
import visitReducer from "./visitReducer";
import eventReducer from "./eventReducer";
import cartReducer from "./cartReducer";
import purchaseReducer from "./purchaseReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  success: successReducer,
  router: routerReducer,
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
