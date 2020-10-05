import React from 'react';
import { Icon } from 'components/Icon';
import { IconButton } from 'components/button';

const links = [
  {
    icon: 'home',
    path: '/',
    exact: true,
  },
  {
    icon: 'search',
    path: '/search',
    exact: true,
  },
  {
    icon: 'bell',
    path: '/notifications',
    exact: true,
  },
  {
    icon: 'message',
    path: '/abeidmama',
    exact: true,
  },
];

function MobileMenu() {
  return (
    <div className="flex-shrink-0 px-8 border-t border-gray-200 sm:hidden">
      <nav className="flex items-center justify-between h-14">
        {links.map(({ icon, path, exact }) => (
          <IconButton
            key={icon}
            size="md"
            to={path}
            activeClassName="text-blue-500"
            passiveClassName="text-gray-500 hover:bg-blue-50"
            exact={exact}
          >
            <Icon icon={icon} className="w-6 h-6" />
          </IconButton>
        ))}
      </nav>
    </div>
  );
}

export default MobileMenu;
