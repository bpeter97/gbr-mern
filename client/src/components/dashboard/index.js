import React, { Component } from "react";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="container-fluid main-content">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-lg-8 pb-4 pr-0">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">Container Map</h5>
                <div className="d-flex flex-row justify-content-center">
                  Map
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-4 pb-4 lg-pl-0">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">Calendar</h5>
                <div className="d-flex flex-row justify-content-center">
                  Calendar
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-sm-12 col-lg-4 pb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center py-2">
                  Orders / Quites in 2018
                </h5>
                <div className="d-flex flex-row justify-content-center">
                  Charts
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
                <div className="d-flex flex-row justify-content-center">
                  Charts
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
