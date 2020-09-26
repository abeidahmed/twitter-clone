import React from 'react';
import { Icon } from 'components/icon';
import { IconButton } from 'components/button';

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
          <IconButton size="md" key={icon} to={path}>
            <Icon icon={icon} className="w-6 h-6 text-gray-500" />
          </IconButton>
        ))}
      </nav>
    </div>
  );
}

export default MobileMenu;
