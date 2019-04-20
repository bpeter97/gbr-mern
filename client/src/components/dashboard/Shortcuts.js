import React, { Component } from "react";

// Icons
import SvgIcon from "react-icons-kit";
import { ShoppingCart, PersonAdd, NoteAdd } from "../../icons";

class Shortcuts extends Component {
  handleClick(url) {
    const { history } = this.props;
    const location = {
      pathname: `${url}`
    };

    history.push(location);
  }

  render() {
    var addContainerIcon = {
      viewBox: "0 0 640 640",
      children: [
        {
          name: "path",
          attribs: {
            d:
              "M120.5 546.91L120.5 344.53L557.8 344.53L557.8 546.91L120.5 546.91ZM151.3 541.95L159.09 541.95L159.09 351.61L151.3 351.61L151.3 541.95ZM258.15 541.95L265.93 541.95L265.93 351.61L258.15 351.61L258.15 541.95ZM302.02 541.95L309.8 541.95L309.8 351.61L302.02 351.61L302.02 541.95ZM173.76 541.95L181.54 541.95L181.54 351.61L173.76 351.61L173.76 541.95ZM278.15 541.95L285.93 541.95L285.93 351.61L278.15 351.61L278.15 541.95ZM343.34 541.42L351.13 541.42L351.13 351.08L343.34 351.08L343.34 541.42ZM214.37 540.89L222.16 540.89L222.16 350.55L214.37 350.55L214.37 540.89ZM384.29 540.89L392.07 540.89L392.07 350.55L384.29 350.55L384.29 540.89ZM448.07 540.89L455.85 540.89L455.85 350.55L448.07 350.55L448.07 540.89ZM426.04 540.89L433.82 540.89L433.82 350.55L426.04 350.55L426.04 540.89ZM403.58 540.89L411.37 540.89L411.37 350.55L403.58 350.55L403.58 540.89ZM365.09 540.89L372.87 540.89L372.87 350.55L365.09 350.55L365.09 540.89ZM323.34 540.89L331.13 540.89L331.13 350.55L323.34 350.55L323.34 540.89ZM236.83 540.89L244.61 540.89L244.61 350.55L236.83 350.55L236.83 540.89ZM195.08 540.89L202.86 540.89L202.86 350.55L195.08 350.55L195.08 540.89ZM468.07 539.83L475.85 539.83L475.85 349.49L468.07 349.49L468.07 539.83ZM490.52 539.83L498.31 539.83L498.31 349.49L490.52 349.49L490.52 539.83ZM511.84 538.77L519.63 538.77L519.63 348.43L511.84 348.43L511.84 538.77ZM438.26 175.52L438.26 198.87L355.4 198.87L355.4 288.64L334.08 288.64L334.08 198.87L246.27 198.87L246.27 175.52L334.08 175.52L334.08 94.76L355.4 94.76L355.4 175.52L438.26 175.52Z"
          }
        }
      ]
    };

    return (
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-12 pb-2">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 text-center">
                  <button
                    className="picture-button"
                    onClick={this.handleClick.bind(this, "/orders/add")}
                    data-tip="Create Order"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Create Order"
                  >
                    <SvgIcon
                      size={50}
                      icon={ShoppingCart}
                      style={{ color: "#008000" }}
                    />
                  </button>
                  <button
                    className="picture-button"
                    data-tip="Create Quote"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Create Quote"
                  >
                    <SvgIcon
                      size={50}
                      icon={NoteAdd}
                      style={{ color: "#008000" }}
                    />
                  </button>
                  <button
                    className="picture-button"
                    onClick={this.handleClick.bind(this, "/customers/add")}
                    data-tip="Create Customer"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Create Customer"
                  >
                    <SvgIcon
                      size={50}
                      icon={PersonAdd}
                      style={{ color: "#008000" }}
                    />
                  </button>
                  <button
                    className="picture-button"
                    onClick={this.handleClick.bind(this, "/containers/add")}
                    data-tip="Create Container"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Create Container"
                  >
                    <SvgIcon
                      size={50}
                      icon={addContainerIcon}
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
