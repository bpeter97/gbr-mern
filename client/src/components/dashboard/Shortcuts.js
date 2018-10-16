import React, { Component } from "react";

// Icons
import ReactTooltip from "react-tooltip";
import SvgIcon from "react-icons-kit";
import { ShoppingCart, PersonAdd, NoteAdd } from "../../icons";

class Shortcuts extends Component {
  addCustomerClick() {
    const { history } = this.props;
    const location = {
      pathname: "/customers/add"
    };

    history.push(location);
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-12 pb-2">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 text-center">
                  <ReactTooltip />
                  <button className="picture-button" data-tip="Create Order">
                    <SvgIcon
                      size={50}
                      icon={ShoppingCart}
                      style={{ color: "#008000" }}
                    />
                  </button>
                  <button className="picture-button" data-tip="Create Quote">
                    <SvgIcon
                      size={50}
                      icon={NoteAdd}
                      style={{ color: "#008000" }}
                    />
                  </button>
                  <button
                    className="picture-button"
                    onClick={this.addCustomerClick.bind(this)}
                    data-tip="Create Customer"
                  >
                    <SvgIcon
                      size={50}
                      icon={PersonAdd}
                      style={{ color: "#008000" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Shortcuts;
