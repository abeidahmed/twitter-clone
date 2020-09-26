import React from 'react';

export function DropdownContainer({ isActive, position, children }) {
  return (
    <div
      className={`${
        isActive ? 'block' : 'hidden'
      } absolute z-50 w-56 mb-2 bg-white rounded-md shadow-xl`}
      style={position === 'bottom' ? { bottom: '100%' } : { top: '100%' }}
    >
      {children}
    </div>
  );
}
