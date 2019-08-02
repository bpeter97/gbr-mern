import React, { Component } from "react";

import { connect } from "react-redux";
import { getContainers } from "../../redux/modules/container";
import PropTypes from "prop-types";
import Spinner from "./../common/Spinner";

var BarChart = require("react-chartjs-2").Bar;

class StockChart extends Component {
	componentDidMount() {
		this.props.getContainers();
	}

	render() {
		const { containers, loading } = this.props.containers;
		var containersBySize = {};
		var sizeLabels = [];
		var containerSizeCount = [];

		// Define the dictionary containersBySize
		for (var x = 0, l = containers.length; x < l; x++) {
			containersBySize[containers[x].size.size] =
				(containersBySize[containers[x].size.size] || 0) + 1;
		}

		// iterate through containerBySize dictionary and create
		// two arrays of data
		for (let [k, v] of Object.entries(containersBySize)) {
			sizeLabels.push(String(k));
			containerSizeCount.push(v);
		}

		// Define the chart data.
		let stockChartData = {
			labels: sizeLabels,
			datasets: [
				{
					label: "Container",
					fillColor: "rgba(4, 123, 6, 1)",
					strokeColor: "rgba(4, 123, 6, 0)",
					highlightFill: "rgba(4, 123, 6, 1)",
					highlightStroke: "rgba(220,220,220,1)",
					data: containerSizeCount
				}
			]
		};

		// Define the chart options
		let stockChartOptions = {
			responsive: true,
			maintainAspectRatio: false
		};
		if (containers === null || loading) {
			return <Spinner />;
		} else {
			return (
				<BarChart data={stockChartData} options={stockChartOptions} redraw />
			);
		}
	}
}

StockChart.propTypes = {
	containers: PropTypes.object.isRequired,
	getContainers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	containers: state.containers
});

export default connect(
	mapStateToProps,
	{ getContainers }
)(StockChart);
