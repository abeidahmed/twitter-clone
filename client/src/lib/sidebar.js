import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useCurrentUser } from 'store/current-user';
import { useModalType } from 'store/modal';
import { Icon } from 'components/icon';
import { Button, IconButton, IconWithTextButton } from 'components/button';
import { DropdownContainer } from 'components/container';
import { UserButton } from 'components/user-button';
import { OutsideClickHandler } from 'components/outside-click-handler';

function Sidebar() {
  const { currentUser, logout } = useCurrentUser();

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
      path: '/bookmarks',
      exact: false,
      icon: 'bookmark',
    },
    {
      title: 'Profile',
      path: `/${currentUser.twitterHandle}`,
      exact: true,
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
          <ProfileDropdown logout={logout} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
}

function TweetButton() {
  const { modalOn, types } = useModalType();

  function openModal() {
    modalOn({
      modalType: types.CREATE_TWEET,
      modalProps: {},
    });
  }

  return (
    <>
      <IconButton
        size="md"
        color="primary"
        className="lg:hidden"
        onClick={openModal}
      >
        <Icon
          icon="magic-wand"
          stroke="none"
          fill="currentColor"
          className="w-6 h-6"
        />
      </IconButton>
      <Button
        size="lg"
        color="primary"
        variant="block"
        className="hidden lg:block"
        onClick={openModal}
      >
        Tweet
      </Button>
    </>
  );
}

function ProfileDropdown({ logout, currentUser }) {
  const [dropActive, setDropActive] = useState(false);

  const history = useHistory();
  function handleLogout() {
    logout();
    history.push('/secure/login');
  }

  return (
    <OutsideClickHandler
      onOutsideClick={() => setDropActive(false)}
      className="relative flex items-center justify-center"
    >
      <UserButton
        user={currentUser}
        onClick={() => setDropActive(!dropActive)}
      />
      <DropdownContainer position="bottom" isActive={dropActive}>
        <IconWithTextButton
          to="/"
          color="white"
          size="md"
          icon="cog"
          variant="menu"
        >
          Settings
        </IconWithTextButton>
        <IconWithTextButton
          color="white"
          size="md"
          icon="logout"
          variant="menu"
          onClick={handleLogout}
        >
          Logout
        </IconWithTextButton>
      </DropdownContainer>
    </OutsideClickHandler>
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
