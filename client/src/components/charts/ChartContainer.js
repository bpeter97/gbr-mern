import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import SalesChart from "./SalesChart";
import StockChart from "./StockChart";

import { getQuotes } from "./../../redux/modules/quote";
import { getOrders } from "../../redux/modules/order";
import { getContainers } from "../../redux/modules/container";

class ChartContainer extends Component {
	constructor(props) {
		super(props);
		switch (this.props.type) {
			case "sales":
				this.chart = <SalesChart />;
				break;
			case "stock":
				this.chart = <StockChart />;
				break;
			default:
				this.chart = "No chart type specified on component.";
				break;
		}
	}

	render() {
		return this.chart;
	}
}

ChartContainer.propTypes = {
	getContainers: PropTypes.func.isRequired,
	getOrders: PropTypes.func.isRequired,
	getQuotes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(
	mapStateToProps,
	{ getQuotes, getOrders, getContainers }
)(ChartContainer);
