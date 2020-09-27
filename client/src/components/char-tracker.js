import React from 'react';
import cn from 'classnames';

function isThreshold(current, limit) {
  return current > limit;
}

export function CharTracker({ size, current, limit, className, ...props }) {
  const trackerClass = cn('text-gray-600', [
    {
      'text-sm': size === 'sm',
      'text-base': size === 'md',
      'text-red-700 font-medium': isThreshold(current, limit),
    },
  ]);

  return (
    <p className={`${trackerClass} ${className}`} {...props}>
      {current}/{limit}
    </p>
  );
}
