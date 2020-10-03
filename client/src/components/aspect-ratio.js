import React from 'react';

function makeRatio(ratio) {
  return ratio
    .split(':')
    .map((el) => +el)
    .reduce((prev, curr) => curr / prev);
}

export function AspectRatio({ src, alt, ratio, ...props }) {
  return (
    <div
      className="overflow-hidden rounded-lg shadow-md"
      style={{ height: `${makeRatio(ratio) * 100}%` }}
    >
      <img
        {...props}
        src={src}
        alt={alt}
        className="object-cover w-full h-full overflow-hidden"
      />
    </div>
  );
}
