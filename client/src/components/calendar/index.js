import React, { Component } from "react";

// Components
import Shortcuts from "./../dashboard/Shortcuts";
import Calendar from "./Calendar";

class Calendars extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let events = [
      {
        title: "Jemery Hill",
        start: "2018-10-15",
        end: "2018-10-17",
        color: "#00FF00"
      },
      {
        title: "John Smith",
        start: "2018-10-14",
        end: "2018-10-15",
        color: "#008800"
      }
    ];

    return (
      <div className="container-fluid main-content">
        <Shortcuts history={this.props.history} />
        <div className="row justify-content-center">
          <div className="col-sm-12 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">Calendar</h5>
                <div className="d-flex flex-row justify-content-center">
                  <div className="col-12 py-md-3 pl-md-5">
                    <Calendar
                      events={events}
                      height="750"
                      containerHeight="778"
                    />
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

export default Calendars;
