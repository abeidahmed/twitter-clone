import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

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
