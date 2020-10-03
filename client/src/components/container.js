import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

export function DropdownContainer({ isActive, position, children }) {
  const containerClass = cn([
    'absolute z-50 w-56 mb-2 bg-white rounded-md shadow-custom',
    {
      block: isActive,
      hidden: !isActive,
      'left-0 lg:left-auto bottom-full mb-1': position === 'bottom',
      'top-full right-0 mt-1': position === 'top',
    },
  ]);

  return (
    <div className={containerClass}>
      <ul className="py-2 rounded-md shadow-xs">{children}</ul>
    </div>
  );
}

export function CardContainer({ bordered, to, children, ...props }) {
  const containerClass = cn([
    'relative hover:bg-gray-50',
    {
      'border-b border-gray-200': bordered,
    },
  ]);

  return (
    <div className={containerClass}>
      <Link to={to} className="absolute inset-0"></Link>
      <div className="px-4 py-2" {...props}>
        {children}
      </div>
    </div>
  );
}
