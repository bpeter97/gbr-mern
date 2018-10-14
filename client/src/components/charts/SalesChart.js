import React, { Component } from "react";

import { connect } from "react-redux";
import { getQuotes } from "../../actions/quoteActions";
import { getOrders } from "../../actions/orderActions";
import PropTypes from "prop-types";

var LineChart = require("react-chartjs").Line;

class SalesChart extends Component {
  componentDidMount() {
    this.props.getQuotes();
    this.props.getOrders();
  }

  render() {
    const { months } = this.props;
    const { quotes } = this.props.quotes;
    const { orders } = this.props.orders;
    var quotesPerMonth = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0
    };
    var ordersPerMonth = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0
    };

    if (quotes !== null) {
      for (var x = 0, l = quotes.length; x < l; x++) {
        var quotesPerDate = new Date(quotes[x].creationDate);
        quotesPerMonth[quotesPerDate.getMonth() + 1] =
          (quotesPerMonth[quotesPerDate.getMonth() + 1] || 0) + 1;
      }
    }

    if (orders !== null) {
      for (var i = 0, j = orders.length; i < j; i++) {
        var ordersPerDate = new Date(orders[i].creationDate);
        ordersPerMonth[ordersPerDate.getMonth() + 1] =
          (ordersPerMonth[ordersPerDate.getMonth() + 1] || 0) + 1;
      }
    }

    let salesChartData = {
      labels: months,
      datasets: [
        {
          label: "Quotes",
          fillColor: "rgba(220,220,220,0)",
          strokeColor: "rgba(5, 133, 7, 1)",
          pointColor: "rgba(5, 133, 7, 1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "rgba(6, 157, 8, 1)",
          pointHighlightStroke: "#fff",
          data: [
            quotesPerMonth[1],
            quotesPerMonth[2],
            quotesPerMonth[3],
            quotesPerMonth[4],
            quotesPerMonth[5],
            quotesPerMonth[6],
            quotesPerMonth[7],
            quotesPerMonth[8],
            quotesPerMonth[9],
            quotesPerMonth[10],
            quotesPerMonth[11],
            quotesPerMonth[12]
          ]
        },
        {
          label: "Orders",
          fillColor: "rgba(220,220,220,0)",
          strokeColor: "rgba(38, 247, 42, 1)",
          pointColor: "rgba(38, 247, 42, 1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "rgba(78, 249, 81, 1)",
          pointHighlightStroke: "#fff",
          data: [
            ordersPerMonth[1],
            ordersPerMonth[2],
            ordersPerMonth[3],
            ordersPerMonth[4],
            ordersPerMonth[5],
            ordersPerMonth[6],
            ordersPerMonth[7],
            ordersPerMonth[8],
            ordersPerMonth[9],
            ordersPerMonth[10],
            ordersPerMonth[11],
            ordersPerMonth[12]
          ]
        }
      ]
    };
    let salesChartOptions = {
      responsive: true,
      tooltips: {
        mode: "index",
        intersect: false
      },
      hover: {
        mode: "nearest",
        intersect: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Month"
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Value"
            }
          }
        ]
      }
    };
    return <LineChart data={salesChartData} options={salesChartOptions} />;
  }
}

SalesChart.propTypes = {
  months: PropTypes.array.isRequired,
  quotes: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired,
  getQuotes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  quotes: state.quotes,
  orders: state.orders
});

export default connect(
  mapStateToProps,
  { getQuotes, getOrders }
)(SalesChart);
