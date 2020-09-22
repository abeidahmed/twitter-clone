import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from 'components/icon';
import { logout } from 'actions/current-user';

function Sidebar({ user, logout }) {
  const links = [
    {
      title: 'Home',
      path: '/',
      icon: 'home',
    },
    {
      title: 'Explore',
      path: '/explore',
      icon: 'hashtag',
    },
    {
      title: 'Notifications',
      path: '/',
      icon: 'bell',
    },
    {
      title: 'Bookmarks',
      path: '/',
      icon: 'bookmark',
    },
    {
      title: 'Profile',
      path: `/${user.twitterHandle}`,
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
            {links.map(({ title, path, icon }) => (
              <Link
                key={title}
                to={path}
                className="flex items-center justify-center p-2 text-gray-700 transition duration-150 ease-in-out rounded-full lg:justify-start focus:outline-none hover:bg-blue-50 hover:text-blue-500 focus:shadow-outline-blue"
              >
                <Icon icon={icon} className="w-6 h-6 lg:w-7 lg:h-7" />
                <span className="hidden pl-3 text-lg font-semibold leading-5 lg:block">
                  {title}
                </span>
              </Link>
            ))}
            <TweetButton />
          </nav>
          <ProfileDropdown logout={logout} />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.currentUser.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

function TweetButton() {
  return (
    <>
      <button className="flex items-center justify-center p-2 text-white bg-blue-500 rounded-full lg:hidden hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
        <Icon
          icon="magic-wand"
          stroke="none"
          fill="currentColor"
          className="w-6 h-6"
        />
      </button>
      <button className="hidden w-full py-3 font-medium text-white transition duration-150 ease-in-out bg-blue-500 rounded-full lg:block hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
        Tweet
      </button>
    </>
  );
}

function ProfileDropdown({ logout }) {
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
        <img
          className="flex-shrink-0 w-10 h-10 rounded-full"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80"
          alt=""
        />
        <span className="items-center justify-between flex-1 hidden lg:pl-3 lg:flex">
          <span className="text-sm lg:pr-2">
            <p className="font-semibold leading-5">Abeid Ahmed</p>
            <p className="leading-5 text-gray-500">@iamhawaabi</p>
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
      <Link
        to="/"
        className="flex items-center justify-center p-2 text-gray-700 transition duration-150 ease-in-out rounded-full hover:text-blue-500 lg:justify-start focus:outline-none hover:bg-blue-50 focus:shadow-outline-blue"
      >
        <Icon
          icon="twitter-solid"
          stroke="none"
          fill="currentColor"
          className="text-blue-500 w-9 h-9"
        />
      </Link>
    </header>
  );
}
