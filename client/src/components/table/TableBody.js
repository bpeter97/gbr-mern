import React, { Component } from "react";
import PropTypes from "prop-types";
import TableItem from "./TableItem";

class TableBody extends Component {
  render() {
    const { items } = this.props;
    return items.map((item, i) => <TableItem key={i} item={item} />);
  }
}

TableBody.propTypes = {
  items: PropTypes.array.isRequired
};

export default TableBody;
