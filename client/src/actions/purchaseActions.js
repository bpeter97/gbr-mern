import axios from "axios";

import {
	PURCHASE_LOADING,
	SET_PURCHASE_TYPE,
	GET_PURCHASE_TYPES,
	CLEAR_PURCHASE,
	SET_JOB_NAME,
	SET_JOB_ADDRESS,
	SET_JOB_CITY,
	SET_JOB_ZIPCODE,
	SET_PURCHASE_CUSTOMER,
	GET_ERRORS
} from "./types";
import { setSuccess } from "./../redux/modules/success";

export const getPurchaseTypes = () => dispatch => {
	axios
		.get("/api/settings/purchasetypes")
		.then(res =>
			dispatch({
				type: GET_PURCHASE_TYPES,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.data
			})
		);
};

export const changePurchaseType = (type, purchaseType) => dispatch => {
	dispatch(setPurchaseLoading());

	// check to see if cart is defined
	if (type === undefined) {
		dispatch({
			type: GET_ERRORS,
			payload: "The purchase type is undefined."
		});
	}

	dispatch({
		type: SET_PURCHASE_TYPE,
		payload: type,
		purchaseType: purchaseType
	});
};

export const changeJobInfo = (dataType, info) => dispatch => {
	dispatch(setPurchaseLoading());

	// check to see if type & info is defined
	if (dataType === undefined || info === undefined) {
		dispatch({
			type: GET_ERRORS,
			payload: "Type or job info is undefined."
		});
	}

	switch (dataType) {
		case "jobName": {
			dispatch({
				type: SET_JOB_NAME,
				payload: info
			});
			break;
		}
		case "jobAddress": {
			dispatch({
				type: SET_JOB_ADDRESS,
				payload: info
			});
			break;
		}
		case "jobCity": {
			dispatch({
				type: SET_JOB_CITY,
				payload: info
			});
			break;
		}
		case "jobZipcode": {
			dispatch({
				type: SET_JOB_ZIPCODE,
				payload: info
			});
			break;
		}
		default:
			break;
	}
};

export const changePurchaseCustomer = id => dispatch => {
	dispatch(setPurchaseLoading());

	// check to see if type & info is defined
	if (id === undefined) {
		dispatch({
			type: GET_ERRORS,
			payload: "Customer ID is undefined."
		});
	}

	dispatch({
		type: SET_PURCHASE_CUSTOMER,
		payload: id
	});
};

export const setJobInfo = (dataType, info) => {
	return [
		changeJobInfo(dataType, info),
		setSuccess("The job info has been updated.")
	];
};

export const setPurchaseType = (type, purchaseType) => {
	return [
		changePurchaseType(type, purchaseType),
		setSuccess(`The purchase type has been set to "${type}".`)
	];
};

export const setPurchaseCustomer = id => {
	return [changePurchaseCustomer(id), setSuccess(`The customer has been set.`)];
};

export const setPurchaseLoading = () => {
	return {
		type: PURCHASE_LOADING
	};
};

export const clearPurchase = () => {
	return {
		type: CLEAR_PURCHASE
	};
};
