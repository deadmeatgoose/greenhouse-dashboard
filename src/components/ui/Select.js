import React from 'react';

export const Select = ({ children, value, onValueChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="border rounded p-2 w-full"
    >
      {children}
    </select>
  );
};

export const SelectTrigger = ({ children }) => {
  return <div>{children}</div>;
};

export const SelectValue = ({ children }) => {
  return <div>{children}</div>;
};

export const SelectContent = ({ children }) => {
  return <div>{children}</div>;
};

export const SelectItem = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

