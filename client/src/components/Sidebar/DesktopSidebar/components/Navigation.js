import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCurrentUser } from 'store/current-user';
import { Icon } from 'components/Icon';

function Navigation() {
  const { currentUser } = useCurrentUser();

  const links = [
    {
      title: 'Home',
      path: '/',
      exact: true,
      icon: 'home',
    },
    {
      title: 'Explore',
      path: '/explore',
      exact: true,
      icon: 'hashtag',
    },
    {
      title: 'Notifications',
      path: '/asdasd',
      exact: false,
      icon: 'bell',
    },
    {
      title: 'Bookmarks',
      path: `/${currentUser.twitterHandle}/bookmarks`,
      exact: false,
      icon: 'bookmark',
    },
    {
      title: 'Profile',
      path: `/users/${currentUser.twitterHandle}`,
      exact: true,
      icon: 'user',
    },
  ];

  return links.map(({ title, path, icon, exact }) => (
    <NavLink
      key={title}
      exact={exact}
      to={path}
      activeClassName="text-blue-500"
      className="flex items-center justify-center p-2 text-gray-700 transition duration-150 ease-in-out rounded-full lg:justify-start focus:outline-none hover:bg-blue-50 hover:text-blue-500 focus:shadow-outline-blue"
    >
      <Icon icon={icon} className="w-6 h-6 lg:w-7 lg:h-7" />
      <span className="hidden pl-3 text-lg font-semibold leading-5 lg:block">
        {title}
      </span>
    </NavLink>
  ));
}

export default Navigation;
