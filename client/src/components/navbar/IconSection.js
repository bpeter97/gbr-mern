import React, { Component } from "react";
import { connect } from "react-redux";
import SvgIcon from "react-icons-kit";

import {
  addCustomerIcon,
  CalendarIcon,
  ProductsIcon,
  OrdersIcon,
  QuotesIcon
} from "../../icons";

class IconSection extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { location } = this.props;
    let iconSection = "";

    switch (location.pathname) {
      case "/":
        break;
      case "/customers":
        iconSection = (
          <ul id="icon-section" className="navbar-nav px-3 mr-auto">
            <li className="nav-item">
              <a href="">
                <SvgIcon size={24} icon={addCustomerIcon} />
              </a>
            </li>
          </ul>
        );
        break;
      case "/quotes":
        iconSection = (
          <ul id="icon-section" className="navbar-nav px-3 mr-auto">
            <li className="nav-item">
              <a href="">
                <SvgIcon size={24} icon={QuotesIcon} />
              </a>
            </li>
          </ul>
        );
        break;
      case "/orders":
        iconSection = (
          <ul id="icon-section" className="navbar-nav px-3 mr-auto">
            <li className="nav-item">
              <a href="">
                <SvgIcon size={24} icon={OrdersIcon} />
              </a>
            </li>
          </ul>
        );
        break;
      case "/products":
        iconSection = (
          <ul id="icon-section" className="navbar-nav px-3 mr-auto">
            <li className="nav-item">
              <a href="">
                <SvgIcon size={24} icon={ProductsIcon} />
              </a>
            </li>
          </ul>
        );
        break;
      case "/calendar":
        iconSection = (
          <ul id="icon-section" className="navbar-nav px-3 mr-auto">
            <li className="nav-item">
              <a href="">
                <SvgIcon size={24} icon={CalendarIcon} />
              </a>
            </li>
          </ul>
        );
        break;
      default:
        break;
    }

    return iconSection;
  }
}

const mapStateToProps = state => ({
  location: state.router.location
});

export default connect(mapStateToProps)(IconSection);
