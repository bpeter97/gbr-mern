import {
  CART_LOADING,
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  MODIFY_ITEM_QUANTITY,
  CLEAR_CART_ITEMS,
  MODIFY_TAX_RATE,
  MODIFY_ITEM_PRICE
} from "../actions/types";

const initialState = {
  cart: [],
  totalQty: 0.0,
  priceBeforeTax: 0.0,
  salesTax: 0.0,
  totalPrice: 0.0,
  monthlyPrice: 0.0,
  taxRate: 0.08,
  deliveryTotal: 0.0,
  loading: false
};

export default function(state = initialState, action) {
  const calculatePrices = (cart, taxRate = initialState.taxRate) => {
    let prices = {
      priceBeforeTax: 0.0,
      totalQty: 0.0,
      monthlyPrice: 0.0,
      delivery: 0.0,
      salesTax: 0.0,
      totalPrice: 0.0,
      taxRate: taxRate
    };

    cart.forEach(item => {
      // Calculate monthly cost
      prices.monthlyPrice += item.product.monthlyPrice * item.quantity;
      // Calculate price before tax
      prices.priceBeforeTax += item.product.monthlyPrice;
      prices.priceBeforeTax += item.product.price;
      // Calculate cart quantity
      prices.totalQty += item.quantity;
      // Calculate delivery costs
      if (
        item.product.type.type === "delivery" ||
        item.product.type.type === "pickup"
      ) {
        prices.delivery += item.product.price * item.quantity;
      }
      // Calculate sales tax
      prices.salesTax += item.product.price * prices.taxRate;
    });

    // Calculate total price.
    prices.totalPrice += prices.priceBeforeTax + prices.salesTax;

    return prices;
  };

  switch (action.type) {
    case CART_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_CART_ITEM: {
      let prices = calculatePrices(action.payload);

      return {
        ...state,
        cart: action.payload,
        priceBeforeTax: prices ? prices.priceBeforeTax : 0,
        totalQty: prices ? prices.totalQty : 0,
        monthlyPrice: prices ? prices.monthlyPrice : 0,
        delivery: prices ? prices.delivery : 0,
        salesTax: prices ? prices.salesTax : 0,
        totalPrice: prices ? prices.totalPrice : 0,
        taxRate: prices ? prices.taxRate : initialState.taxRate,
        loading: false
      };
    }
    case REMOVE_CART_ITEM: {
      let prices = calculatePrices(action.payload);
      return {
        ...state,
        cart: action.payload,
        priceBeforeTax: prices ? prices.priceBeforeTax : 0,
        totalQty: prices ? prices.totalQty : 0,
        monthlyPrice: prices ? prices.monthlyPrice : 0,
        delivery: prices ? prices.delivery : 0,
        salesTax: prices ? prices.salesTax : 0,
        totalPrice: prices ? prices.totalPrice : 0,
        taxRate: prices ? prices.taxRate : initialState.taxRate,
        loading: false
      };
    }
    case MODIFY_ITEM_QUANTITY: {
      let prices = calculatePrices(action.payload);
      return {
        ...state,
        cart: action.payload,
        priceBeforeTax: prices ? prices.priceBeforeTax : 0,
        totalQty: prices ? prices.totalQty : 0,
        monthlyPrice: prices ? prices.monthlyPrice : 0,
        delivery: prices ? prices.delivery : 0,
        salesTax: prices ? prices.salesTax : 0,
        totalPrice: prices ? prices.totalPrice : 0,
        taxRate: prices ? prices.taxRate : initialState.taxRate,
        loading: false
      };
    }
    case MODIFY_TAX_RATE: {
      let prices = calculatePrices(action.payload.cart, action.payload.taxRate);
      return {
        ...state,
        priceBeforeTax: prices ? prices.priceBeforeTax : 0,
        totalQty: prices ? prices.totalQty : 0,
        monthlyPrice: prices ? prices.monthlyPrice : 0,
        delivery: prices ? prices.delivery : 0,
        salesTax: prices ? prices.salesTax : 0,
        totalPrice: prices ? prices.totalPrice : 0,
        taxRate: prices ? prices.taxRate : initialState.taxRate,
        loading: false
      };
    }
    case MODIFY_ITEM_PRICE: {
      let prices = calculatePrices(action.payload);
      return {
        ...state,
        cart: action.payload,
        priceBeforeTax: prices ? prices.priceBeforeTax : 0,
        totalQty: prices ? prices.totalQty : 0,
        monthlyPrice: prices ? prices.monthlyPrice : 0,
        delivery: prices ? prices.delivery : 0,
        salesTax: prices ? prices.salesTax : 0,
        totalPrice: prices ? prices.totalPrice : 0,
        taxRate: prices ? prices.taxRate : initialState.taxRate,
        loading: false
      };
    }
    case CLEAR_CART_ITEMS:
      return initialState;
    default:
      return state;
  }
}
