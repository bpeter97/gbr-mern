import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import multi from "redux-multi";
import rootReducer from "./modules";

const initialState = {};

export const history = createBrowserHistory();

const middleware = [thunk, multi];

const store = createStore(
	rootReducer(history),
	initialState,
	compose(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
