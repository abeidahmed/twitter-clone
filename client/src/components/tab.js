import React from 'react';
import { NavLink } from 'react-router-dom';

export function Tab({ links }) {
  return (
    <nav className="flex items-center justify-between min-w-0">
      {links.map(({ title, path, exact }) => (
        <NavLink
          key={title}
          exact={exact}
          to={path}
          activeClassName="border-blue-600 text-blue-600"
          className="block w-full px-2 py-3 text-sm font-medium text-center text-gray-500 truncate whitespace-no-wrap transition duration-150 ease-in-out border-b-2 border-transparent focus:outline-none focus:border-blue-600 sm:text-base hover:bg-blue-50 hover:text-blue-600"
        >
          {title}
        </NavLink>
      ))}
    </nav>
  );
}
