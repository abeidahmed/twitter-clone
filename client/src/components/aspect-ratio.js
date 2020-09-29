import React from 'react';

function makeRatio(ratio) {
  return ratio
    .split(':')
    .map((el) => +el)
    .reduce((prev, curr) => curr / prev);
}

export function AspectRatio({ ratio, ...props }) {
  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-md"
      style={{ paddingBottom: `${makeRatio(ratio) * 100}%` }}
    >
      <img
        {...props}
        className="absolute object-cover w-full h-full overflow-hidden"
      />
    </div>
  );
}
