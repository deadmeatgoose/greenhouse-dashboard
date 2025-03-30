import React from 'react';

// Card component that accepts children and className as props
const Card = ({ children, className }) => {
  return (
    <div className={`shadow-lg rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
};

// CardContent component for wrapping content inside the card
const CardContent = ({ children }) => {
  return <div className="card-content">{children}</div>;
};

export { Card, CardContent };  // Export both components as named exports
