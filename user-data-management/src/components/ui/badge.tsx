import React from 'react';

export function Badge({ children, className, ...props }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
