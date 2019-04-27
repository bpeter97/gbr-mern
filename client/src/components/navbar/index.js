import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/defaultsActions";

import SvgIcon from "react-icons-kit";
import { AccountIcon } from "../../icons";
import { shoppingCart } from "react-icons-kit/fa/shoppingCart";
import Clock from "./Clock";
import GBRCart from "./../orders/GBRCart";

import DropDownNavItem from "./../common/DropDownNavItem";

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      errors: {}
    };
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { cart, totalQty } = this.props.cart;

    let navbar = "";

    let orderLinks = [
      <Link className="dropdown-item" key={Math.random(10)} to="/orders/rental">
        Rental
      </Link>,
      <Link className="dropdown-item" key={Math.random(10)} to="/orders">
        View Orders
      </Link>,
      <Link className="dropdown-item" key={Math.random(10)} to="/orders/add">
        Add Order
      </Link>
    ];

    let productLinks = [
      <Link className="dropdown-item" key={Math.random(10)} to="/products">
        View Products
      </Link>,
      <Link className="dropdown-item" key={Math.random(10)} to="/products/add">
        Add Product
      </Link>
    ];

    let customerLinks = [
      <Link className="dropdown-item" key={Math.random(10)} to="/customers">
        View Customers
      </Link>,
      <Link className="dropdown-item" key={Math.random(10)} to="/customers/add">
        Add Customer
      </Link>
    ];

    let containerLinks = [
      <Link className="dropdown-item" key={Math.random(10)} to="/containers">
        View Containers
      </Link>,
      <Link
        className="dropdown-item"
        key={Math.random(10)}
        to="/containers/add"
      >
        Add Container
      </Link>
    ];

    if (isAuthenticated) {
      navbar = (
        <nav
          className="navbar navbar-expand-md navbar-dark top-nav"
          style={{ backgroundColor: "#ffffff" }}
        >
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"> </span>
          </button>
          {/* DISAPPEARS WHEN < MD OR < 768px */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <img
                    className="gbr_logo_image d-none d-xl-block ml-3 mr-2 mt-2"
                    height="25"
                    src="../../../img/logo.png"
                    alt="GBR Logo"
                  />
                  <img
                    className="small_gbr_logo_image d-block d-xl-none mt-2"
                    height="25"
                    src="../../../img/logosmall.png"
                    alt="GBR Logo"
                  />
                </Link>
              </li>
              <DropDownNavItem
                label="Containers"
                labelId="containersDropdown"
                links={containerLinks}
              />
              <DropDownNavItem
                label="Customers"
                labelId="customersDropdown"
                links={customerLinks}
              />
              <li className="nav-item">
                <Link className="nav-link" to="/quotes">
                  Quotes
                </Link>
              </li>
              <DropDownNavItem
                label="Orders"
                labelId="ordersDropdown"
                links={orderLinks}
              />
              <DropDownNavItem
                label="Products"
                labelId="productsDropdown"
                links={productLinks}
              />
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/calendar">
                  Calendar
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="dropdown my-auto">
                <a
                  href=""
                  className={
                    cart.length > 0 ? "dropdown-toggle" : "dropdown-toggle"
                  }
                  id="account"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{ color: "#008000" }}
                >
                  <SvgIcon
                    size={30}
                    icon={shoppingCart}
                    style={{ color: "#008000" }}
                    className="pr-2"
                  />
                  {totalQty} - item(s)
                </a>
                <GBRCart cart={this.props.cart.cart} />
              </li>
              <li className="nav-item px-2 my-auto d-none d-lg-block">|</li>
              <li className="nav-item pr-2 my-auto d-none d-lg-block">
                <strong>
                  <Clock />
                </strong>
              </li>
              <li className="dropdown my-auto">
                <a
                  href=""
                  className="dropdown-toggle"
                  id="account"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <SvgIcon
                    size={30}
                    icon={AccountIcon}
                    style={{ color: "#008000" }}
                  />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="account"
                >
                  <p className="dropdown-item dropdown-name disabled">
                    {user.firstName}{" "}
                    {user.middleInitial ? user.middleInitial : ""}.{" "}
                    {user.lastName} {user.suffix ? user.suffix : ""}
                  </p>
                  <hr />
                  <a className="dropdown-item" href="">
                    Settings
                  </a>

                  <a
                    className="dropdown-item"
                    onClick={this.onLogoutClick.bind(this)}
                  >
                    Log off
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      );
    }

    return navbar;
  }
}

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  logoutUser: PropTypes.func.isRequired,
  user: state.auth.user,
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NavBar);
