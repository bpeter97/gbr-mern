import React, { Component } from "react";

// Components
import Calendar from "./../calendar/Calendar";
import SalesChart from "./../charts/SalesChart";
import StockChart from "./../charts/StockChart";
import Shortcuts from "./Shortcuts";
import Notifications from "./../notifications/Notifications";

import ReactTable from "react-table";
import matchSorter from "match-sorter";

class Dashboard extends Component {
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

    const visitedColumns = [
      {
        Header: "Item Visited",
        accessor: "itemVisited",
        className: "text-center",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["itemVisited"] }),
        filterAll: true
      },
      {
        Header: "Type",
        accessor: "type",
        className: "text-center",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["type"] }),
        filterAll: true
      },
      {
        Header: "Last Visited",
        accessor: "lastVisited",
        className: "text-center",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["lastVisited"] }),
        filterAll: true
      }
    ];

    const visitedData = [
      {
        itemVisited: "James Smith",
        type: "Customer",
        lastVisited: "2018-10-11T23:32:14.757Z"
      },
      {
        itemVisited: "990012",
        type: "Container",
        lastVisited: "2018-10-12T23:32:14.757Z"
      },
      {
        itemVisited: "James Smith",
        type: "Order",
        lastVisited: "2018-10-13T23:32:14.757Z"
      }
    ];

    visitedData.forEach(visit => {
      let newDate = new Date(visit.lastVisited);
      let newDateFormat =
        newDate.getMonth() +
        "/" +
        newDate.getDay() +
        "/" +
        newDate.getFullYear();
      visit.lastVisited = newDateFormat;
    });

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
                    <ReactTable
                      data={visitedData}
                      defaultSorted={[
                        {
                          id: "Name",
                          desc: true
                        }
                      ]}
                      className="-striped -highlight"
                      columns={visitedColumns}
                      showPageSizeOptions={false}
                      defaultPageSize={10}
                      getTrProps={(s, i) => {
                        let f = false;
                        if (i) {
                          f = i.original.isFlagged;
                        }
                        return {
                          style: { backgroundColor: f ? "#DAE7D7" : "inherit" }
                        };
                      }}
                    />
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
                      events={events}
                      height="450"
                      containerHeight="458"
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
