import React from 'react';
import cn from 'classnames';

export function CharTracker({ size, current, limit, className, ...props }) {
  const trackerClass = cn('text-gray-600', [
    {
      'text-sm': size === 'sm',
      'text-base': size === 'md',
    },
  ]);

  return (
    <p className={`${trackerClass} ${className}`} {...props}>
      {current}/{limit}
    </p>
  );
}
