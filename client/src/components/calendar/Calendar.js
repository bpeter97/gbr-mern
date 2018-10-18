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
    this.state = { events: [], show: false, event: { _id: "", title: "null" } };

    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.props.getEvents();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.events.events.length > this.state.events.length) {
      this.setState({ events: nextProps.events.events });
    }

    if (nextProps.events.event !== null) {
      if (nextProps.events.event !== this.state.event) {
        this.setState({ event: nextProps.events.event });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.events.length != nextProps.events.events.length ||
      this.state.event.value !== nextProps.events.event.value
    );
  }

  toggleModal() {
    this.setState({ show: !this.state.show, event: this.props.events.event });
    this.forceUpdate();
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

        start: "07:30", // a start time (10am in this example)
        end: "17:00" // an end time (6pm in this example)
      },
      header: this.props.header,
      height: h,
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: this.state.events,
      defaultView: this.props.defaultView,
      eventTextColor: "#FFFFFF",
      eventClick: event => {
        this.props.getEvent(event._id);
        this.toggleModal();
      }
    });
    console.log(this.props);
    return (
      <div id={this.props.calendarId} ref="calendar" style={divStyle}>
        <div>
          <Modal isOpen={this.state.show}>
            <form>
              <ModalHeader>IPL 2018</ModalHeader>
              <ModalBody>
                <div className="row">
                  <div className="form-group col-md-4">
                    <label>Name: {this.state.event.title}</label>
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
