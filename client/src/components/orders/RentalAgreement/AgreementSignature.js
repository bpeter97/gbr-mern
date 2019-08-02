import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Shortcuts from "./../../dashboard/Shortcuts";
import SignaturePad from "signature_pad";
import {
  addOrderSignature,
  deleteOrderSignature
} from "./../../../actions/orderActions";

export class AgreementSignature extends Component {
  constructor() {
    super();
    this.state = {
      signInput: "",
      buttons: {
        sign: false,
        clear: false,
        revoke: false
      },
      printedName: "",
      title: "",
      signData: ""
    };
    this.signingSurface = React.createRef();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  bindSignature = e => {
    if (this.state.signInput.isEmpty()) return false;

    let orderSignature = {
      order: this.props.order._id,
      customer: this.props.order.customer._id,
      signature: this.state.signInput.toDataURL(),
      printedName: this.state.printedName,
      title: this.state.title
    };

    this.props.addOrderSignature(orderSignature);

    this.setState({ buttons: { revoke: true, clear: true, sign: true } });

    this.props.history.push("/orders/view", { id: this.props.order._id });
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
    canvas.width = canvas ? canvas.offsetWidth * ratio : null;
    canvas.height = canvas ? canvas.offsetHeight * ratio : null;
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
    let printedName = "";
    let title = "";

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

    this.setState({ signInput: widget, printedName, title });
    window.addEventListener("resize", this.resizeCanvas);
  }

  render() {
    if (this.props.order.signature) {
      let signatureData = this.props.order.signature.signature.length > 0 ? this.props.order.signature.signature[0][0] : null;

      let image = signatureData,
        container = document.getElementById("container"),
        img = document.createElement("img");

      img.src = image;
      img.alt = "Signature";

      if (container) {
        if (container.children.length > 0) {
          container.removeChild(container.children[0]);
        }
        container.appendChild(img);
      }
    }

    return (
      <div id="signature">
        <div id="container" />

        <div
          className="modal fade"
          id="signatureModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="signatureModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h5
                  className="modal-title"
                  style={{ marginLeft: "auto" }}
                  id="signatureModalLabel"
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
                <div className="row">
                  <div className="col-12 text-center" id="canvas-container">
                    <canvas
                      ref={this.signingSurface}
                      className="signature-input"
                      id="signatureCanvas"
                    />
                  </div>
                </div>
                <div className="row my-1">
                  <div className="col-6 text-center ml-auto mr-auto">
                    <input
                      type="text"
                      name="printedName"
                      className="form-control w-100"
                      value={this.state.printedName}
                      onChange={this.onChange}
                      placeholder="Print Name"
                      aria-label="Print Name"
                    />
                  </div>
                </div>
                <div className="row my-1">
                  <div className="col-6 text-center ml-auto mr-auto">
                    <input
                      type="text"
                      name="title"
                      value={this.state.title}
                      onChange={this.onChange}
                      className="form-control w-100"
                      placeholder="Print Title"
                      aria-label="Print Title"
                    />
                  </div>
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
    );
  }
}

AgreementSignature.propTypes = {
  order: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  order: state.orders.order
});

export default connect(
  mapStateToProps,
  { addOrderSignature, deleteOrderSignature }
)(AgreementSignature);
