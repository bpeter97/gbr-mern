import React, { Component } from "react";

import PropTypes from "prop-types";

class EventModal extends Component {
  render() {
    const { event } = this.props;

    event.start = new Date(event.start);
    event.end = new Date(event.end);

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <label>Who: {event.order.customer.name}</label>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label>
              When: {event.start.toDateString()}, {event.start.getHours()}:
              {event.start.getMinutes()}
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label>
              Where: {event.order.job.address}, {event.order.job.city}, CA,{" "}
              {event.order.job.zipcode}
            </label>
          </div>
        </div>
      </div>
    );
  }
}

EventModal.propTypes = {
  event: PropTypes.object.isRequired
};

export default EventModal;
