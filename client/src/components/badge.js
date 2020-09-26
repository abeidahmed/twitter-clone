import React from 'react';

export function Badge({ children }) {
  return (
    <span className="px-1 text-xs leading-5 text-gray-500 bg-gray-200 rounded">
      {children}
    </span>
  );
}
