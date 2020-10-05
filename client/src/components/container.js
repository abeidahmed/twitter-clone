import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

function useCalcSpace(element, isActive) {
  const [hasTopSpace, setHasTopSpace] = useState();

  useEffect(() => {
    if (!element.current) return;

    const dropdownRect = element.current.getBoundingClientRect();
    const menuHeight = element.current.clientHeight;
    if (!menuHeight) return;

    const spaceAtBottom =
      document.documentElement.clientHeight -
      dropdownRect.top -
      dropdownRect.height -
      menuHeight;
    const spaceAtTop = dropdownRect.top - menuHeight;

    // const upward = spaceAtBottom < 0 && spaceAtTop > spaceAtBottom;
    const upward = spaceAtBottom <= menuHeight && spaceAtTop > spaceAtBottom;

    if (!upward !== !hasTopSpace) {
      setHasTopSpace(upward);
    }
  }, [element, isActive]);

  return { hasTopSpace };
}

export function DropdownContainer({ isActive, className, children }) {
  const dropdownRef = useRef(null);

  const { hasTopSpace } = useCalcSpace(dropdownRef, isActive);

  const containerClass = cn([
    'absolute z-50 w-56 mb-2 bg-white rounded-md shadow-custom',
    {
      block: isActive,
      hidden: !isActive,
      'bottom-full mb-1 right-0': hasTopSpace,
      'top-full mt-1 right-0': !hasTopSpace,
    },
  ]);

  return (
    <div ref={dropdownRef} className={`menu ${containerClass} ${className}`}>
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
