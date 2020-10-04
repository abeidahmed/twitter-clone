import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import cn from 'classnames';
import { useSidebarToggle } from 'store/sidebar';
import { useCurrentUser } from 'store/current-user';
import * as a from 'shared/user-defaults';
import { Icon } from 'components/icon';
import { FollowStat } from 'components/follow-stat';
import { Avatar } from 'components/avatar';
import { IconButton } from 'components/button';

function MobileSidebar() {
  const { setOff, isActive } = useSidebarToggle();

  return (
    <div className="bg-white sm:hidden">
      <Aside isActive={isActive}>
        <Header setOff={setOff} />
        <div className="py-3">
          <UserDetails />
          <NavigationBar />
        </div>
      </Aside>
    </div>
  );
}

function NavigationBar() {
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

function UserDetails() {
  const { currentUser } = useCurrentUser();

  const {
    avatar,
    twitterHandle,
    name,
    includes: { followStat: { followersCount, followingCount } = {} } = {},
  } = currentUser;

  return (
    <div className="px-4">
      <div>
        <Avatar size="md" src={avatar} alt={`${twitterHandle}'s profile`} />
        <div className="mt-2 text-sm">
          <p className="font-semibold">{name || a.DEFAULT_NAME}</p>
          <p className="text-gray-500">@{twitterHandle}</p>
        </div>
      </div>
      <div className="mt-4">
        <FollowStat
          follower={followersCount}
          following={followingCount}
          followingTo={`/users/${twitterHandle}/followings`}
          followerTo={`/users/${twitterHandle}/followers`}
        />
      </div>
    </div>
  );
}

function Header({ setOff }) {
  return (
    <header className="flex items-center justify-between px-4 border-b h-14">
      <h2 className="text-lg font-extrabold">Account info</h2>
      <IconButton
        size="md"
        color="primary-text"
        onClick={setOff}
        className="-mr-2"
      >
        <Icon icon="x" className="w-6 h-6 text-blue-500" />
      </IconButton>
    </header>
  );
}

function Aside({ isActive, children }) {
  const overlayClass = cn([
    'fixed inset-0 z-50 lg:hidden',
    {
      block: isActive,
      hidden: !isActive,
    },
  ]);

  const asideClass = cn([
    'fixed top-0 z-50 flex flex-col flex-shrink-0 w-64 h-screen transition duration-150 ease-in-out transform bg-white',
    {
      'translate-x-0': isActive,
      '-translate-x-full': !isActive,
    },
  ]);

  return (
    <>
      <div className={overlayClass}>
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <aside className={asideClass}>{children}</aside>
    </>
  );
}

export default MobileSidebar;
