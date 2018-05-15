import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import { routerReducer } from "react-router-redux";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  router: routerReducer
});
