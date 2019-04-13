import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  type,
  onChange,
  disabled,
  divClass,
  help
}) => {
  if (divClass) {
  }
  let smallText = null;

  if (help) {
    smallText = <small className="form-text text-muted">{help}</small>;
  }

  return (
    <div className={classnames(divClass ? divClass : "")}>
      <label>{label}</label>
      <input
        type={type}
        className={classnames("form-control")}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {smallText}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  label: PropTypes.string,
  divClass: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
