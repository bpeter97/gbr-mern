import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import matchSorter from "match-sorter";

// Actions
import { getNotifications } from "../../actions/notificationActions";

class Notifications extends Component {
  componentDidMount() {
    this.props.getNotifications();
  }

  render() {
    const { notifications } = this.props.notifications;

    notifications.forEach(notification => {
      let newDate = new Date(notification.dateTime);
      let newDateFormat =
        newDate.getMonth() +
        "/" +
        newDate.getDay() +
        "/" +
        newDate.getFullYear();
      notification.dateTime = newDateFormat;

      switch (notification.type) {
        case "Customer": {
          notification.notification =
            notification.notification + ` (${notification.itemId.name})`;
          break;
        }
        case "Container": {
          notification.notification =
            notification.notification + ` (${notification.itemId.gbrNumber})`;
          break;
        }
        case "Product": {
          notification.notification =
            notification.notification + ` (${notification.itemId.name})`;
          break;
        }
        default: {
          break;
        }
      }
    });

    const notificationColumns = [
      {
        Header: "Notification",
        accessor: "notification",
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["notification"] }),
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

    return (
      <ReactTable
        data={notifications}
        defaultSorted={[
          {
            id: "dateTime",
            desc: true
          }
        ]}
        className="-striped -highlight"
        columns={notificationColumns}
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
              // console.log("A Td Element was clicked!");
              // console.log("it produced this event:", e);
              // console.log("It was in this column:", column);
              // console.log("It was in this row:", rowInfo);
              // console.log("It was in this table instance:", instance);

              // IMPORTANT! React-Table uses onClick internally to trigger
              // events like expanding SubComponents and pivots.
              // By default a custom 'onClick' handler will override this functionality.
              // If you want to fire the original onClick handler, call the
              // 'handleOriginal' function.
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

Notifications.propTypes = {
  getNotifications: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  notifications: state.notifications
});

export default connect(
  mapStateToProps,
  { getNotifications }
)(Notifications);
