import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './icon';

export function MobileMenu() {
  return (
    <div className="flex-shrink-0 px-8 border-t border-gray-200 sm:hidden">
      <nav className="flex items-center justify-between h-14">
        <Link
          to="/"
          className="p-1 rounded-full hover:bg-blue-50 focus:shadow-outline-blue"
        >
          <Icon icon="home" className="w-6 h-6 text-gray-500" />
        </Link>
        <Link
          to="/"
          className="p-1 rounded-full hover:bg-blue-50 focus:shadow-outline-blue"
        >
          <Icon icon="search" className="w-6 h-6 text-gray-500" />
        </Link>
        <Link
          to="/"
          className="p-1 rounded-full hover:bg-blue-50 focus:shadow-outline-blue"
        >
          <Icon icon="bell" className="w-6 h-6 text-gray-500" />
        </Link>
        <Link
          to="/"
          className="p-1 rounded-full hover:bg-blue-50 focus:shadow-outline-blue"
        >
          <Icon icon="message" className="w-6 h-6 text-gray-500" />
        </Link>
      </nav>
    </div>
  );
}
