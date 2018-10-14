import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";
import todoReducer from "./todoReducer";
import customerReducer from "./customerReducer";
import { routerReducer } from "react-router-redux";
import quoteReducer from "./quoteReducer";
import productReducer from "./productReducer";
import orderReducer from "./orderReducer";
import containerReducer from "./containerReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  router: routerReducer,
  quotes: quoteReducer,
  orders: orderReducer,
  products: productReducer,
  todos: todoReducer,
  users: userReducer,
  customers: customerReducer,
  containers: containerReducer
});
