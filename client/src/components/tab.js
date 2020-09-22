import React from 'react';
import { Link } from 'react-router-dom';

export function Tab({ links }) {
  return (
    <nav className="flex items-center justify-between min-w-0 mt-3 -mb-1">
      {links.map(({ title, path }) => (
        <Link
          key={title}
          to={path}
          className="block w-full px-2 py-3 text-sm font-medium text-center text-gray-600 truncate whitespace-no-wrap transition duration-150 ease-in-out border-b-2 border-transparent sm:text-base hover:bg-blue-50 hover:text-blue-600"
        >
          {title}
        </Link>
      ))}
    </nav>
  );
}
