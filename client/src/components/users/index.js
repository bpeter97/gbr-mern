import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsers } from "./../../redux/modules/user";
import ReactTable from "react-table";
import matchSorter from "match-sorter";

// Components
import Shortcuts from "./../dashboard/Shortcuts";
import Spinner from "./../common/Spinner";

class Users extends Component {
	constructor() {
		super();
		this.state = {
			users: []
		};
	}

	componentDidMount() {
		this.props.getUsers();
	}

	render() {
		const { users } = this.props.users;

		const columns = [
			{
				Header: "First Name",
				accessor: "firstName",
				filterMethod: (filter, rows) =>
					matchSorter(rows, filter.value, { keys: ["firstName"] }),
				filterAll: true
			},
			{
				Header: "Middle Initial",
				accessor: "middleInitial",
				filterMethod: (filter, rows) =>
					matchSorter(rows, filter.value, { keys: ["middleInitial"] }),
				filterAll: true
			},
			{
				Header: "Last Name",
				accessor: "lastName",
				filterMethod: (filter, rows) =>
					matchSorter(rows, filter.value, { keys: ["lastName"] }),
				filterAll: true
			},
			{
				Header: "Suffix",
				accessor: "suffix",
				filterMethod: (filter, rows) =>
					matchSorter(rows, filter.value, { keys: ["suffix"] }),
				filterAll: true
			},
			{
				Header: "Username",
				accessor: "username",
				filterMethod: (filter, rows) =>
					matchSorter(rows, filter.value, { keys: ["username"] }),
				filterAll: true
			},
			{
				Header: "Title",
				accessor: "title",
				filterMethod: (filter, rows) =>
					matchSorter(rows, filter.value, { keys: ["title"] }),
				filterAll: true
			},
			{
				Header: "Email",
				accessor: "email",
				filterMethod: (filter, rows) =>
					matchSorter(rows, filter.value, { keys: ["email"] }),
				filterAll: true
			},
			{
				Header: "View / Edit",
				id: "edit",
				accessor: "_id",
				width: 150,
				Cell: ({ value }) => (
					<button
						className="btn btn-success"
						// onClick={this.editCustomerClick.bind(this, value)}
					>
						View / Edit
					</button>
				)
			}
		];

		return (
			<div className="container-fluid main-content">
				<Shortcuts history={this.props.history} />
				<div className="row justify-content-center">
					<div className="col-sm-12 pb-4">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title text-center py-2">Users</h5>
								<div className="d-flex flex-row justify-content-center">
									<div className="col-12 py-md-3 pl-md-5">
										{this.props.users.loading ? (
											<Spinner />
										) : (
											<ReactTable
												data={users}
												filterable
												defaultFilterMethod={(filter, row) =>
													String(row[filter.id]) === filter.value
												}
												defaultSorted={[
													{
														id: "First Name",
														desc: true
													}
												]}
												className="-striped -highlight text-center"
												columns={columns}
												defaultPageSize={10}
												getTrProps={(state, rowInfo, column, instance) => {
													return {
														onClick: () => {
															this.props.history.push({
																pathname: "/users/edit",
																state: {
																	id: rowInfo.original._id
																}
															});
														}
													};
												}}
											/>
										)}
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

Users.propTypes = {
	getUsers: PropTypes.func.isRequired,
	users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	users: state.users
});

export default connect(
	mapStateToProps,
	{ getUsers }
)(Users);
