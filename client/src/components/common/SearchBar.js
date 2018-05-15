import React from "react";
import PropTypes from "prop-types";

const SearchBar = ({
  name,
  placeholder,
  value,
  className,
  label,
  type,
  onChange,
  disabled
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
    />
  );
};

SearchBar.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

SearchBar.defaultProps = {
  type: "text"
};

export default SearchBar;
