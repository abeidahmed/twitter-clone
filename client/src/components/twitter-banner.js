import React from 'react';

export function TwitterBanner({ src, alt }) {
  return (
    <img
      className="flex-shrink-0 object-cover w-full h-48 bg-gray-100"
      src={src}
      alt={alt}
    />
  );
}
