import React, { Component } from "react";

// Components
import Calendar from "./../calendar/Calendar";
import ChartContainer from "./../charts/ChartContainer";
import Shortcuts from "./Shortcuts";
import Notifications from "./../notifications/Notifications";
import RecentVisits from "./../visits/RecentVisits";

class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid main-content">
        <Shortcuts history={this.props.history} />
        <div className="row justify-content-center">
          <div className="col-sm-12 col-lg-4 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">
                  Orders / Quotes in {new Date().getFullYear()}
                </h5>
                <div className="d-flex flex-row justify-content-center">
                  <div className="p-1 w-75">
                    <ChartContainer type="sales" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-8 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">
                  Containers in Stock
                </h5>
                <div className="d-flex flex-row ">
                  <div className="p-1 stock-chart mt-auto mb-auto justify-content-around">
                    <ChartContainer type="stock" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-sm-12 col-lg-4 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">Recent Activity</h5>
                <div className="d-flex flex-row justify-content-center">
                  <div className="col-12">
                    <Notifications history={this.props.history} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-4 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">
                  Recently Visited
                </h5>
                <div className="d-flex flex-row justify-content-center">
                  <div className="col-12">
                    <RecentVisits history={this.props.history} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-4 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">Calendar</h5>
                <div className="d-flex flex-row justify-content-center">
                  <div className="p-2">
                    <Calendar
                      height="450"
                      containerHeight="458"
                      defaultView="month"
                      calendarId="main-calendar"
                      theme="bootstrap4"
                      header={{
                        left: "",
                        center: "title",
                        right: "today prev,next"
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card footer-message">
              <div className="card-body">
                <h5 className="card-title text-center py-2">
                  Copyright Message
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
