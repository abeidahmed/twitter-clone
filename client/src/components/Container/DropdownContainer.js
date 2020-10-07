import React, { useRef } from 'react';
import cn from 'classnames';
import { useSmartPosition } from 'hooks/useSmartPosition';

function DropdownContainer({ isActive, className, children }) {
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

export default DropdownContainer;
