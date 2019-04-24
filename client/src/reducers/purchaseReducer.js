import {
  PURCHASE_LOADING,
  SET_PURCHASE_TYPE,
  SET_JOB_NAME,
  SET_JOB_CITY,
  SET_JOB_ZIPCODE,
  SET_JOB_ADDRESS,
  SET_PURCHASE_CUSTOMER,
  CLEAR_PURCHASE
} from "../actions/types";

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
