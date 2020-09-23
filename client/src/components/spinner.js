import React from 'react';

export function Spinner() {
  return (
    <div
      className="absolute lds-dual-ring"
      style={{ top: '10%', left: '50%', transform: 'translateX(-50%)' }}
    ></div>
  );
}
