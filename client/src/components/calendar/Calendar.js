import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import $ from "jquery";
import "moment/min/moment.min.js";

import "fullcalendar/dist/fullcalendar.css";
import "fullcalendar/dist/fullcalendar.js";

import { getEvents, getEvent, editEvent } from "./../../redux/modules/event";

import Spinner from "./../common/Spinner";
import EventModal from "./EventModal";

class Calendar extends Component {
	constructor(props) {
		super(props);
		this.state = { events: [], show: false, event: {} };
	}

	componentDidMount() {
		this.props.getEvents();
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.events.length !== nextProps.events.events.length;
	}

	toggleModal = () => {
		this.setState({ show: !this.state.show });
	};

	render() {
		const { calendar } = this.refs;
		const h = parseInt(this.props.height, 10);
		const containerHeight = parseInt(this.props.containerHeight, 10);
		const divStyle = {
			height: containerHeight
		};

		$(calendar).fullCalendar({
			theme: this.props.theme,
			timezone: "local",
			businessHours: {
				// days of week. an array of zero-based day of week integers (0=Sunday)
				dow: [1, 2, 3, 4, 5], // Monday - Thursday

				start: "07:30",
				end: "17:00"
			},
			header: this.props.header,
			height: h,
			navLinks: true,
			editable: true,
			eventLimit: true,
			events: this.props.events,
			defaultView: this.props.defaultView,
			eventTextColor: "#FFFFFF",
			eventClick: event => {
				this.props.getEvent(event._id);
				this.toggleModal();
			},
			eventDragStart: event => {
				this.props.getEvent(event._id);
			},
			eventResizeStart: event => {
				this.props.getEvent(event._id);
			},
			eventResize: event => {
				event.start = new Date(event.start).toISOString();
				event.end = new Date(event.end).toISOString();
				this.props.editEvent(event);
				this.props.getEvent(event._id);
			},
			eventDrop: event => {
				event.start = new Date(event.start).toISOString();
				event.end = new Date(event.end).toISOString();
				this.props.editEvent(event);
				this.props.getEvent(event._id);
			}
		});

		var modalEvent;
		if (this.props.events.event === {} || this.props.events.event === null) {
			modalEvent = <Spinner />;
		} else {
			var { event } = this.props.events;

			var modalBody;
			if (event.order === null || event.order === undefined) {
				modalBody = (
					<div className="row">
						<div className="col-md-12">
							<label>No order attached to event.</label>
						</div>
					</div>
				);
			} else if (event.order !== null || event.order !== undefined) {
				modalBody = <EventModal event={event} />;
			}

			modalEvent = (
				<form>
					<ModalHeader>{event.title}</ModalHeader>
					<ModalBody>{modalBody}</ModalBody>
					<ModalFooter>
						<input
							type="submit"
							value="Submit"
							color="primary"
							className="btn btn-primary"
						/>
						<Button color="danger" onClick={this.toggleModal}>
							Cancel
						</Button>
					</ModalFooter>
				</form>
			);
		}

		return (
			<div id={this.props.calendarId} ref="calendar" style={divStyle}>
				<div>
					<Modal isOpen={this.state.show}>{modalEvent}</Modal>
				</div>
			</div>
		);
	}
}

Calendar.propTypes = {
	events: PropTypes.object.isRequired,
	event: PropTypes.object,
	getEvents: PropTypes.func.isRequired,
	getEvent: PropTypes.func.isRequired,
	editEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	events: state.events
});

export default connect(
	mapStateToProps,
	{ getEvents, getEvent, editEvent }
)(Calendar);
