import React from "react";
import PropTypes from "prop-types";

const TextArea = ({
  name,
  placeholder,
  value,
  className,
  onChange,
  disabled,
  autoComplete
}) => {
  return (
    <textarea
      className={"form-control"}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      disabled={disabled}
      autoComplete={autoComplete}
      value={value}
    />
  );
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  autoComplete: PropTypes.string
};

export default TextArea;
