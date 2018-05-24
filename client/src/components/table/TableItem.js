import React, { Component } from "react";
import { connect } from "react-redux";
import SvgIcon from "react-icons-kit";
import TextFieldGroup from "../common/TextFieldGroup";
import PropTypes from "prop-types";
import { deleteTodo, completeTodo, getTodos } from "../../actions/todoActions";
import classNames from "classnames";

class TableItem extends Component {
  onEditClick(e) {}
  render() {
    const { item } = this.props;
    let columns = Object.keys(item).map(i => {
      return <td key={i}>{item[i]}</td>;
    });

    return (
      <tr>
        {columns}
        <td>
          <button
            className="btn"
            onClick={this.onEditClick.bind(this, item._id)}
          >
            Edit
          </button>
        </td>
      </tr>
    );
  }
}

export default TableItem;
