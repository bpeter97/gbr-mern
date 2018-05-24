import React, { Component } from "react";
import PropTypes from "prop-types";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { connect } from "react-redux";

class Table extends Component {
  render() {
    const { location } = this.props;
    let header = "";
    switch (location.pathname) {
      case "/customers":
        header = (
          <TableHead
            headers={[
              "ID#",
              "First",
              "Last",
              "Phone",
              "Fax",
              "Email",
              "FLAG(S)",
              "Edit"
            ]}
          />
        );
        break;
      case "/orders":
        break;
      case "/products":
        break;
      default:
        break;
    }

    return (
      <table className="table table-hover">
        {header}
        <tbody>{/* <TableBody items={customers} /> */}</tbody>
      </table>
    );
  }
}

Table.propTypes = {
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  location: state.router.location
});

export default connect(mapStateToProps, {})(Table);
