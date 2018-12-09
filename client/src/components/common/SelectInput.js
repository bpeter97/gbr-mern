import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const SelectInput = ({
  className,
  label,
  selectId,
  onChange,
  options,
  divClass,
  name
}) => {
  return (
    <div className={classnames(divClass ? divClass : "")}>
      <label htmlFor={selectId}>{label}</label>
      <select
        className={className}
        onChange={onChange}
        id={selectId}
        name={name}
      >
        {options.map((opt, i) => {
          return (
            <option key={i} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  selectId: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

SelectInput.defaultProps = {
  type: "text"
};

export default SelectInput;
