import React from 'react';
import cn from 'classnames';

export function DropdownContainer({ isActive, position, children }) {
  const containerClass = cn([
    'absolute z-50 w-56 mb-2 bg-white rounded-md shadow-xl',
    {
      block: isActive,
      hidden: !isActive,
      'left-0 lg:left-auto bottom-full': position === 'bottom',
      'top-full right-0': position === 'top',
    },
  ]);

  return (
    <div className={containerClass}>
      <ul className="py-2 rounded-md shadow-xs">{children}</ul>
    </div>
  );
}
