import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
  modifyQuantity,
  removeItem,
  modifyTaxRate,
  changeItemPrice
} from "./../../actions/cartActions";

class GBRCart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      priceBeforeTax: 0,
      salesTax: 0,
      totalPrice: 0,
      monthlyPrice: 0,
      taxRate: 0.08,
      deliveryTotal: 0
    };
  }

  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }

  componentWillUpdate(nextProps) {
    const { refresh } = this.props;
    if (nextProps.refresh !== refresh) {
      this.refreshCart(nextProps.cart);
    }
  }

  quantityChange = e => {
    this.props.modifyQuantity(
      e.target.name,
      e.target.value,
      this.props.cart.cart
    );
    this.forceUpdate();
  };

  priceChange = e => {
    this.props.changeItemPrice(
      parseInt(e.target.name, 10),
      e.target.value,
      this.props.cart.cart,
      false
    );
    this.forceUpdate();
  };

  monthlyPriceChange = e => {
    this.props.changeItemPrice(
      parseInt(e.target.name, 10),
      e.target.value,
      this.props.cart.cart,
      true
    );
    this.forceUpdate();
  };

  removeItem = item => {
    this.props.removeItem(item, this.props.cart.cart);
    this.forceUpdate();
  };

  changeTaxRate = e => {
    this.props.modifyTaxRate(e.target.value, this.props.cart);
    this.forceUpdate();
  };

  refreshCart = cart => {
    this.setState({ cart });
    this.forceUpdate();
  };

  render() {
    const { cart } = this.props.cart;

    if (cart.length === 0) {
      return (
        <div
          className="dropdown-menu dropdown-menu-right cart-menu"
          aria-labelledby="account"
        >
          <p className="dropdown-item text-center">
            There are no items in the cart.
          </p>
          <Link className="dropdown-item text-center" to="/orders/add">
            Add Order
          </Link>
        </div>
      );
    } else {
      return (
        <div
          className="dropdown-menu dropdown-menu-right cart-menu"
          aria-labelledby="account"
        >
          <div className="container-fluid">
            <div className="d-flex flex-row dropdown-item cart-item">
              <div className="col-md-5 text-center">Item</div>
              <div className="col-md-2 text-center">Price</div>
              <div className="col-md-2 text-center">Monthly</div>
              <div className="col-md-2 text-center">Qty</div>
              <div className="col-md-1 text-center">Delete</div>
            </div>
            {cart.map(item => {
              let { product, quantity, id } = item;

              let html = (
                <div
                  className="d-flex flex-row dropdown-item cart-item"
                  key={Math.random(10)}
                >
                  <div
                    className="col-md-5"
                    style={{
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden"
                    }}
                  >
                    {product.name}
                  </div>
                  <div className="col-md-2 text-center">
                    <input
                      type="number"
                      name={id}
                      id={Math.random(10)}
                      size="1"
                      className="text-center"
                      value={product.price}
                      onChange={this.priceChange}
                    />
                  </div>
                  <div className="col-md-2 text-center">
                    <input
                      type="number"
                      name={id}
                      id={Math.random(10)}
                      size="1"
                      className="text-center"
                      value={product.monthlyPrice}
                      onChange={this.monthlyPriceChange}
                    />
                  </div>
                  <div className="col-md-2 text-center">
                    <input
                      type="number"
                      name={id}
                      id={Math.random(10)}
                      size="1"
                      className="text-center"
                      value={quantity}
                      onChange={this.quantityChange}
                    />
                  </div>
                  <div className="col-md-1 text-right">
                    <button
                      className="btn btn-sm btn-success"
                      onClick={this.removeItem.bind(this, product)}
                    >
                      X
                    </button>
                  </div>
                </div>
              );

              return html;
            })}
            <div className="d-flex flex-row dropdown-item cart-item">
              <div className="col-md-10 text-right">Tax Rate:</div>
              <div className="col-md-2 text-center">
                <input
                  type="number"
                  name="tax-rate"
                  id="tax-rate"
                  size="2"
                  className="text-center"
                  value={this.props.cart.taxRate}
                  onChange={this.changeTaxRate}
                />
              </div>
            </div>
            <div className="d-flex flex-row dropdown-item cart-item">
              <div className="col-md-10 text-right">Total Monthly:</div>
              <div className="col-md-2 text-center">
                ${this.props.cart.monthlyPrice}.00
              </div>
            </div>
            <div className="d-flex flex-row dropdown-item cart-item">
              <div className="col-md-10 text-right">Total Delivery:</div>
              <div className="col-md-2 text-center">
                ${this.props.cart.delivery}.00
              </div>
            </div>
            <div className="d-flex flex-row dropdown-item cart-item">
              <div className="col-md-10 text-right">
                Total Price (before tax):
              </div>
              <div className="col-md-2 text-center">
                ${this.props.cart.priceBeforeTax}.00
              </div>
            </div>
            <div className="d-flex flex-row dropdown-item cart-item">
              <div className="col-md-10 text-right">Sales Tax:</div>
              <div className="col-md-2 text-center">
                ${this.props.cart.salesTax.toFixed(2)}
              </div>
            </div>
            <div className="d-flex flex-row dropdown-item cart-item">
              <div className="col-md-10 text-right">
                Total Price (after tax):
              </div>
              <div className="col-md-2 text-center">
                ${this.props.cart.totalPrice.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

GBRCart.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  location: state.router,
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { modifyQuantity, removeItem, modifyTaxRate, changeItemPrice }
)(GBRCart);
