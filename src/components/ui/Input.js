import React from 'react';

const Input = ({ value, onChange, className }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={`px-4 py-2 border rounded ${className}`}
    />
  );
};

export default Input;

