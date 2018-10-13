import React, { Component } from "react";

import PropTypes from "prop-types";

import $ from "jquery";
import "moment/min/moment.min.js";

import "fullcalendar/dist/fullcalendar.css";
import "fullcalendar/dist/fullcalendar.js";

class SideNavCalendar extends Component {
  componentDidMount() {
    const { calendar } = this.refs;

    $(calendar).fullCalendar({
      themeSystem: "standard",
      header: {
        left: "",
        center: "title",
        right: ""
      },
      businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        dow: [1, 2, 3, 4, 5], // Monday - Thursday

        start: "07:30", // a start time (10am in this example)
        end: "17:00" // an end time (6pm in this example)
      },
      contentHeight: 400,
      events: this.props.events,
      defaultView: "agendaDay"
    });
  }

  render() {
    return <div id="sidebar-calendar" ref="calendar" />;
  }
}

export default SideNavCalendar;
