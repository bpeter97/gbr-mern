import React, { Component } from "react";
import { connect } from "react-redux";

import Shortcuts from "./../../dashboard/Shortcuts";
import SignaturePad from "signature_pad";

export class RentalOrder extends Component {
  constructor() {
    super();
    this.state = {
      signInput: "",
      buttons: {
        sign: false,
        clear: false,
        revoke: false
      }
    };
    this.signingSurface = React.createRef();
  }

  bindSignature = e => {
    if (this.state.signInput.isEmpty()) return false;

    console.log(this.state.signInput.toData());

    let imageURL = this.state.signInput.toDataURL();

    let image = imageURL,
      container = document.getElementById("container"),
      img = document.createElement("img");

    img.src = image;
    img.alt = "Signature";

    // Before adding signature to page, we will send it to the DB.
    // this.props.addSignatureToOrder(orderId, signData);

    if (container.children.length > 0) {
      container.removeChild(container.children[0]);
    }
    container.appendChild(img);
    this.setState({ buttons: { revoke: true, clear: true, sign: true } });
  };

  removeSignature = e => {
    let container = document.getElementById("container");

    if (container.children.length > 0) {
      container.removeChild(container.children[0]);
    }
  };

  resizeCanvas = e => {
    let canvas = this.signingSurface.current,
      ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
  };

  clearSignature = e => {
    this.state.signInput.clear();
    this.removeSignature();
    this.setState({ buttons: { sign: true, clear: true, revoke: false } });
  };

  componentWillUnmount() {
    window.addEventListener("resize", this.resizeCanvas);
  }

  componentDidMount() {
    let canvas = document.getElementById("signatureCanvas");

    let widget = new SignaturePad(canvas, {
      minWidth: 0.2,
      maxWidth: 3,
      onBegin: e => {
        this.setState({
          buttons: { sign: true, clear: true, revoke: false }
        });
      },
      onEnd(e) {}
    });
    this.setState({ signInput: widget });
    window.addEventListener("resize", this.resizeCanvas);
  }

  render() {
    return (
      <div className="container-fluid main-content">
        <Shortcuts history={this.props.history} />
        <div className="row justify-content-center">
          <div className="col-sm-12 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">Test</h5>
                <div className="d-flex flex-row justify-content-center">
                  <div className="col-12 py-md-3">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      Sign Here
                    </button>

                    <div id="container" />

                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                          <div className="modal-header text-center">
                            <h5
                              className="modal-title"
                              style={{ marginLeft: "auto" }}
                              id="exampleModalLabel"
                            >
                              Sign Below
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <div
                              className="col-12 text-center"
                              id="canvas-container"
                            >
                              <canvas
                                ref={this.signingSurface}
                                className="signature-input"
                                id="signatureCanvas"
                              />
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={this.clearSignature}
                            >
                              Clear
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-dismiss="modal"
                              onClick={this.bindSignature}
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// RentalOrder.propTypes = {
//   prop: PropTypes
// }

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(RentalOrder);
