import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import Spinner from "./../common/Spinner";

// Actions
import { getVisits } from "../../actions/visitActions";

class RecentVisits extends Component {
  componentDidMount() {
    this.props.getVisits();
  }

  render() {
    const { visits, loading } = this.props.visits;

    visits.forEach(visit => {
      let newDate = new Date(visit.dateTime);
      let newDateFormat =
        newDate.getMonth() +
        "/" +
        newDate.getDay() +
        "/" +
        newDate.getFullYear();
      visit.dateTime = newDateFormat;

      switch (visit.type) {
        case "Customer": {
          visit.item = visit.itemId.name;
          break;
        }
        case "Container": {
          visit.item = visit.itemId.gbrNumber;
          break;
        }
        case "Product": {
          visit.item = visit.itemId.name;
          break;
        }
        default: {
          break;
        }
      }
    });

    const visitColumns = [
      {
        Header: "Item Visited",
        accessor: "item",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["item"] }),
        filterAll: true
      },
      {
        Header: "Type",
        accessor: "type",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["type"] }),
        filterAll: true
      },
      {
        Header: "Date",
        accessor: "dateTime",
        maxWidth: 120,
        className: "text-center",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["dateTime"] }),
        filterAll: true
      }
    ];

    if (visits === null || loading) {
      return <Spinner />;
    } else {
      return (
        <ReactTable
          data={visits}
          defaultSorted={[
            {
              id: "dateTime",
              desc: false
            }
          ]}
          className="-striped -highlight text-center"
          columns={visitColumns}
          showPageSizeOptions={false}
          defaultPageSize={10}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                let sendTo = rowInfo.original.type.toLowerCase();
                console.log(sendTo);
                this.props.history.push({
                  pathname: `/${sendTo}s/edit`,
                  state: {
                    id: rowInfo.original.itemId._id
                  }
                });
                if (handleOriginal) {
                  handleOriginal();
                }
              }
            };
          }}
        />
      );
    }
  }
}

RecentVisits.propTypes = {
  getVisits: PropTypes.func.isRequired,
  visits: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  visits: state.visits
});

export default connect(
  mapStateToProps,
  { getVisits }
)(RecentVisits);
