import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import $ from "jquery";
import "moment/min/moment.min.js";

import "fullcalendar/dist/fullcalendar.css";
import "fullcalendar/dist/fullcalendar.js";

import { getEvents } from "./../../actions/eventActions";

class Calendar extends Component {
  constructor() {
    super();
    this.state = { events: [] };
  }

  componentDidMount() {
    this.props.getEvents();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.events.events.length > this.state.events.length) {
      this.setState({ events: nextProps.events.events });
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.state.events.length !== nextProps.events.events.length;
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
      eventTextColor: "#FFFFFF"
    });

    return <div id={this.props.calendarId} ref="calendar" style={divStyle} />;
  }
}

Calendar.propTypes = {
  events: PropTypes.object.isRequired,
  getEvents: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  events: state.events
});

export default connect(
  mapStateToProps,
  { getEvents }
)(Calendar);
