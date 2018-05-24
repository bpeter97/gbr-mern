import React, { Component } from "react";
import PropTypes from "prop-types";

class TableHead extends Component {
  render() {
    const { headers } = this.props;
    let content = "";
    if (headers) {
      content = headers.map((header, i) => (
        <th key={i} scope="col">
          {header}
        </th>
      ));
    }
    return (
      <thead>
        <tr>{content}</tr>
      </thead>
    );
  }
}

TableHead.propTypes = {
  headers: PropTypes.array.isRequired
};
export default TableHead;
