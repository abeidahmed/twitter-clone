import React from 'react';

export function DropdownContainer({ isActive, position, children }) {
  return (
    <div
      className={`${
        isActive ? 'block' : 'hidden'
      } absolute z-50 w-56 mb-2 bg-white rounded-md shadow-xl ${
        position === 'bottom'
          ? 'left-0 lg:left-auto bottom-full'
          : 'top-full right-0'
      } `}
    >
      {children}
    </div>
  );
}
