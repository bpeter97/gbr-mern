import React, { Component } from "react";

import Calendar from "./../calendar/Calendar";

import SalesChart from "./../charts/SalesChart";
import StockChart from "./../charts/StockChart";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let events = [
      {
        start: "2018-10-15",
        end: "2018-10-16",
        color: "#00FF00"
      }
    ];
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    return (
      <div className="container-fluid main-content">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-lg-4 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">
                  Orders / Quotes in {new Date().getFullYear()}
                </h5>
                <div className="d-flex flex-row justify-content-center">
                  <div className="p-1 w-75">
                    <SalesChart months={months} />
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
                    <StockChart />
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
                <div className="d-flex flex-row justify-content-left">
                  Somthing
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-2 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">
                  Recently Viewed Customers
                </h5>
                <div className="d-flex flex-row justify-content-left">
                  Somthing
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-2 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">
                  Recently Viewed Containers
                </h5>
                <div className="d-flex flex-row justify-content-left">
                  Somthing
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
                    <Calendar events={events} />
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

export default Dashboard;
