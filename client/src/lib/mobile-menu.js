import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'components/icon';

const links = [
  {
    icon: 'home',
    path: '/',
  },
  {
    icon: 'search',
    path: '/',
  },
  {
    icon: 'bell',
    path: '/',
  },
  {
    icon: 'message',
    path: '/',
  },
];

function MobileMenu() {
  return (
    <div className="flex-shrink-0 px-8 border-t border-gray-200 sm:hidden">
      <nav className="flex items-center justify-between h-14">
        {links.map(({ icon, path }) => (
          <Link
            key={icon}
            to={path}
            className="p-1 rounded-full hover:bg-blue-50 focus:shadow-outline-blue"
          >
            <Icon icon={icon} className="w-6 h-6 text-gray-500" />
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default MobileMenu;
