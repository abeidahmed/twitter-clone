import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useCurrentUser } from 'store/current-user';
import { Icon } from 'components/Icon';

function Navigation() {
  const { logout, currentUser } = useCurrentUser();
  const { twitterHandle } = currentUser;

  const history = useHistory();
  function handleLogout() {
    logout();
    history.push('/secure/login');
  }

  const links = [
    {
      title: 'Profile',
      icon: 'user',
      path: `/users/${twitterHandle}`,
    },
    {
      title: 'Explore',
      icon: 'hashtag',
      path: '/explore',
    },
    {
      title: 'Bookmarks',
      icon: 'bookmark',
      path: `/${twitterHandle}/bookmarks`,
    },
    {
      title: 'Settings and Privacy',
      icon: 'cog',
      path: '/',
    },
  ];

  return (
    <nav className="mt-2 text-sm">
      {links.map(({ title, path, icon }) => (
        <Link
          key={title}
          to={path}
          className="flex items-center px-4 py-3 hover:bg-gray-100"
        >
          <Icon icon={icon} className="w-5 h-5 text-gray-500 -ml-0.5" />
          <span className="pl-3 leading-5">{title}</span>
        </Link>
      ))}
      <hr className="my-3 text-gray-200" />
      <button
        onClick={handleLogout}
        className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-100"
      >
        <Icon icon="logout" className="w-5 h-5 text-gray-500 -ml-0.5" />
        <span className="pl-3 leading-5">Logout</span>
      </button>
    </nav>
  );
}

export default Navigation;
