import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import $ from "jquery";
import "moment/min/moment.min.js";

import "fullcalendar/dist/fullcalendar.css";
import "fullcalendar/dist/fullcalendar.js";

import { getEvents, getEvent } from "./../../actions/eventActions";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { events: [], show: false };

    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.props.getEvents();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.events.length !== nextProps.events.events.length;
  }

  toggleModal() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const { calendar } = this.refs;
    const h = parseInt(this.props.height, 10);
    const containerHeight = parseInt(this.props.containerHeight, 10);
    const divStyle = {
      height: containerHeight
    };

    $(calendar).fullCalendar({
      theme: this.props.theme,
      businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        dow: [1, 2, 3, 4, 5], // Monday - Thursday

        start: "07:30",
        end: "17:00"
      },
      header: this.props.header,
      height: h,
      navLinks: true,
      editable: true,
      eventLimit: true,
      events: this.props.events,
      defaultView: this.props.defaultView,
      eventTextColor: "#FFFFFF",
      eventClick: event => {
        this.props.getEvent(event._id);
        this.toggleModal();
      }
    });
    var modalEvent;
    if (this.props.events.event === undefined) {
      modalEvent = { title: "none" };
    } else {
      modalEvent = this.props.events.event;
    }

    return (
      <div id={this.props.calendarId} ref="calendar" style={divStyle}>
        <div>
          <Modal isOpen={this.state.show}>
            <form>
              <ModalHeader>IPL 2018</ModalHeader>
              <ModalBody>
                <div className="row">
                  <div className="form-group col-md-4">
                    <label>Name: {modalEvent.title}</label>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-4">
                    <label>Team:</label>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-4">
                    <label>Country:</label>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <input
                  type="submit"
                  value="Submit"
                  color="primary"
                  className="btn btn-primary"
                />
                <Button color="danger" onClick={this.toggleModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </Modal>
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  events: PropTypes.object.isRequired,
  event: PropTypes.object,
  getEvents: PropTypes.func.isRequired,
  getEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  events: state.events,
  event: state.event
});

export default connect(
  mapStateToProps,
  { getEvents, getEvent }
)(Calendar);
