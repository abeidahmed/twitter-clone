import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useSmartPosition } from 'hooks/smart-position';

export function DropdownContainer({ isActive, className, children }) {
  const dropdownRef = useRef(null);
  const { hasTopSpace } = useSmartPosition(dropdownRef, isActive);

  const containerClass = cn([
    'absolute z-50 w-56 mb-2 bg-white rounded-md shadow-custom right-0',
    {
      block: isActive,
      hidden: !isActive,
      'bottom-full mb-1': hasTopSpace,
      'top-full mt-1': !hasTopSpace,
    },
  ]);

  return (
    <div ref={dropdownRef} className={`${containerClass} ${className}`}>
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
