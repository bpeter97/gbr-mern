import axios from "axios";
import { setSuccess } from "./success";
import GET_ERRORS from "./error"

/* 
################## TYPES ##################
*/
export const PURCHASE_LOADING = "PURCHASE_LOADING";
export const SET_PURCHASE_TYPE = "SET_PURCHASE_TYPE";
export const CLEAR_PURCHASE = "CLEAR_PURCHASE";
export const SET_JOB_NAME = "SET_JOB_NAME";
export const SET_JOB_ADDRESS = "SET_JOB_ADDRESS";
export const SET_JOB_CITY = "SET_JOB_CITY";
export const SET_JOB_ZIPCODE = "SET_JOB_ZIPCODE";
export const SET_PURCHASE_CUSTOMER = "SET_PURCHASE_CUSTOMER";
export const GET_PURCHASE_TYPES = "GET_PURCHASE_TYPES";

/* 
################## REDUCER ##################
*/
const initialState = {
  order: {
    customer: "",
    job: {}
  },
  quote: {
    customer: "",
    job: {}
  },
  purchase_type: "",
  loading: false
};

export default function(state = initialState, action) {
  if (action.type === "SET_PURCHASE_TYPE") {
    state.purchaseType = action.purchaseType;
  }

  if (action.type === "GET_PURCHASE_TYPES") {
    state.purchaseTypes = action.payload;
  }

  switch (state.purchaseType) {
    case "order": {
      switch (action.type) {
        case PURCHASE_LOADING:
          return {
            ...state,
            loading: true
          };
        case SET_PURCHASE_TYPE:
          return {
            ...state,
            order: {
              ...state.order,
              purchaseType: action.payload
            },
            loading: false
          };
        case SET_PURCHASE_CUSTOMER: {
          return {
            ...state,
            order: {
              ...state.order,
              customer: action.payload
            },
            loading: false
          };
        }
        case SET_JOB_NAME:
          return {
            ...state,
            order: {
              ...state.order,
              job: {
                ...state.order.job,
                name: action.payload
              }
            },
            loading: false
          };
        case SET_JOB_ADDRESS:
          return {
            ...state,
            order: {
              ...state.order,
              job: {
                ...state.order.job,
                address: action.payload
              }
            },
            loading: false
          };
        case SET_JOB_CITY:
          return {
            ...state,
            order: {
              ...state.order,
              job: {
                ...state.order.job,
                city: action.payload
              }
            },
            loading: false
          };
        case SET_JOB_ZIPCODE:
          return {
            ...state,
            order: {
              ...state.order,
              job: {
                ...state.order.job,
                zipcode: action.payload
              }
            },
            loading: false
          };
        case CLEAR_PURCHASE: {
          return {
            order: {},
            quote: {},
            purchaseType: "",
            loading: false
          };
        }
        default:
          return state;
      }
    }
    case "quote": {
      switch (action.type) {
        case PURCHASE_LOADING:
          return {
            ...state,
            loading: true
          };
        case SET_PURCHASE_TYPE:
          return {
            ...state,
            quote: {
              ...state.quote,
              purchaseType: action.payload
            },
            loading: false
          };
        case SET_PURCHASE_CUSTOMER: {
          return {
            ...state,
            quote: {
              ...state.quote,
              customer: action.payload
            },
            loading: false
          };
        }
        case SET_JOB_NAME:
          return {
            ...state,
            quote: {
              ...state.quote,
              job: {
                ...state.quote.job,
                name: action.payload
              }
            },
            loading: false
          };
        case SET_JOB_ADDRESS:
          return {
            ...state,
            quote: {
              ...state.quote,
              job: {
                ...state.quote.job,
                address: action.payload
              }
            },
            loading: false
          };
        case SET_JOB_CITY:
          return {
            ...state,
            quote: {
              ...state.quote,
              job: {
                ...state.quote.job,
                city: action.payload
              }
            },
            loading: false
          };
        case SET_JOB_ZIPCODE:
          return {
            ...state,
            quote: {
              ...state.quote,
              job: {
                ...state.quote.job,
                zipcode: action.payload
              }
            },
            loading: false
          };
        case CLEAR_PURCHASE: {
          return {
            order: {},
            quote: {},
            purchaseType: "",
            loading: false
          };
        }
        default:
          return state;
      }
    }
    default:
      return state;
  }
}
/* 
################## ACTION CREATORS ##################
*/
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
