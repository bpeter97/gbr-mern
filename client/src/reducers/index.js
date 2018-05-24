import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";
import todoReducer from "./todoReducer";
import customerReducer from "./customerReducer";
import { routerReducer } from "react-router-redux";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  router: routerReducer,
  todos: todoReducer,
  users: userReducer,
  customers: customerReducer
});
