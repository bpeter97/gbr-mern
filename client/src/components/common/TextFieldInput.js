import React from "react";
import PropTypes from "prop-types";

const TextFieldInput = ({
  name,
  placeholder,
  value,
  className,
  label,
  type,
  onChange,
  disabled,
  autoComplete
}) => {
  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      autoComplete={autoComplete}
    />
  );
};

TextFieldInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  autoComplete: PropTypes.string
};

TextFieldInput.defaultProps = {
  type: "text"
};

export default TextFieldInput;
