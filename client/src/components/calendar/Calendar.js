import React, { Component } from "react";

import $ from "jquery";
import "moment/min/moment.min.js";

import "fullcalendar/dist/fullcalendar.css";
import "fullcalendar/dist/fullcalendar.js";

class Calendar extends Component {
  componentDidMount() {
    const { calendar } = this.refs;
    const h = parseInt(this.props.height, 10);

    $(calendar).fullCalendar({
      theme: "bootstrap4",
      businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        dow: [1, 2, 3, 4, 5], // Monday - Thursday

        start: "07:30", // a start time (10am in this example)
        end: "17:00" // an end time (6pm in this example)
      },
      header: {
        left: "",
        center: "title",
        right: "today prev,next"
      },
      height: h,
      events: this.props.events,
      defaultView: "month"
    });
  }

  render() {
    const containerHeight = parseInt(this.props.containerHeight, 10);
    const divStyle = {
      height: containerHeight
    };

    return <div id="main-calendar" ref="calendar" style={divStyle} />;
  }
}

export default Calendar;
