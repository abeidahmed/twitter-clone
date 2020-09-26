import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useCurrentUser } from 'store/current-user';
import { Icon } from 'components/icon';
import { Avatar } from 'components/avatar';
import { Button, IconButton } from 'components/button';

function Sidebar() {
  const { user, logout } = useCurrentUser();

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
      exact: false,
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
      path: '/asd',
      exact: false,
      icon: 'bookmark',
    },
    {
      title: 'Profile',
      path: `/${user.twitterHandle}`,
      exact: false,
      icon: 'user',
    },
  ];

  return (
    <div className="hidden h-screen px-6 sm:block lg:col-span-3">
      <div className="ml-auto lg:ml-0">
        <NavHead />
        <div
          className="flex flex-col justify-between px-2 py-3"
          style={{ height: 'calc(100vh - 56px)' }}
        >
          <nav className="flex-1 space-y-3">
            {links.map(({ title, path, icon, exact }) => (
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
            ))}
            <TweetButton />
          </nav>
          <ProfileDropdown logout={logout} user={user} />
        </div>
      </div>
    </div>
  );
}

function TweetButton() {
  return (
    <>
      <span className="block lg:hidden">
        <IconButton size="md" color="primary">
          <Icon
            icon="magic-wand"
            stroke="none"
            fill="currentColor"
            className="w-6 h-6"
          />
        </IconButton>
      </span>
      <span className="hidden lg:block">
        <Button size="lg" color="primary" variant="block">
          Tweet
        </Button>
      </span>
    </>
  );
}

function ProfileDropdown({ logout, user }) {
  const [dropActive, setDropActive] = useState(false);

  const history = useHistory();
  function handleLogout() {
    logout();
    history.push('/secure/login');
  }

  return (
    <div className="relative flex items-center justify-center">
      <button
        onClick={() => setDropActive(!dropActive)}
        className="flex items-center w-full transition duration-150 ease-in-out rounded-full lg:p-2 hover:bg-blue-50 focus:outline-none focus:shadow-outline-blue"
      >
        <Avatar
          size="md"
          src={user.avatar}
          alt={`${user.twitterHandle}'s profile`}
        />
        <span className="items-center justify-between flex-1 hidden text-left lg:pl-3 lg:flex">
          <span className="text-sm lg:pr-2">
            <p className="font-semibold leading-5">
              {user.name || 'Twitter user'}
            </p>
            <p className="leading-5 text-gray-500">@{user.twitterHandle}</p>
          </span>
          <Icon icon="chevron-down" className="w-5 h-5 -mr-1 text-gray-500" />
        </span>
      </button>
      <div
        className={`${
          dropActive ? 'block' : 'hidden'
        } absolute z-50 w-48 mb-2 bg-white rounded-md shadow-xl`}
        style={{ bottom: '100%' }}
      >
        <ul className="py-1 rounded-md shadow-xs">
          <button className="block w-full px-3 py-2 text-left whitespace-no-wrap transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue hover:bg-blue-50">
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="block w-full px-3 py-2 text-left whitespace-no-wrap transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue hover:bg-blue-50"
          >
            Log out
          </button>
        </ul>
      </div>
    </div>
  );
}

function NavHead() {
  return (
    <header className="flex items-center justify-center lg:px-2 lg:justify-start h-14">
      <IconButton size="md" to="/">
        <Icon
          icon="twitter-solid"
          stroke="none"
          fill="currentColor"
          className="text-blue-500 w-9 h-9"
        />
      </IconButton>
    </header>
  );
}

export default Sidebar;
