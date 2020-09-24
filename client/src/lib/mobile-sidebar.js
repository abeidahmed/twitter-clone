import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSidebarToggle } from 'store/sidebar';
import { useCurrentUser } from 'store/current-user';
import { Icon } from 'components/icon';
import { FollowStat } from 'components/follow-stat';

function MobileSidebar() {
  const { logout, user } = useCurrentUser();

  const links = [
    {
      title: 'Profile',
      icon: 'user',
      path: `/${user.twitterHandle}`,
    },
    {
      title: 'Explore',
      icon: 'hashtag',
      path: '/explore',
    },
    {
      title: 'Bookmarks',
      icon: 'bookmark',
      path: '/',
    },
    {
      title: 'Settings and Privacy',
      icon: 'cog',
      path: '/',
    },
  ];

  const history = useHistory();
  function handleLogout() {
    logout();
    history.push('/secure/login');
  }

  const { setOff, isActive } = useSidebarToggle();

  return (
    <div className="sm:hidden">
      <div
        className={`${
          isActive ? 'block' : 'hidden'
        } fixed inset-0 z-10 lg:hidden`}
      >
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <aside
        className={`${
          isActive ? 'translate-x-0' : '-translate-x-full'
        } fixed top-0 z-50 flex flex-col flex-shrink-0 w-64 h-screen transition duration-150 ease-in-out transform bg-white`}
      >
        <header className="flex items-center justify-between px-4 border-b h-14">
          <h2 className="text-lg font-extrabold">Account info</h2>
          <button
            onClick={setOff}
            className="p-1 -mr-2 rounded-full focus:outline-none hover:bg-blue-50 focus:shadow-outline-blue"
          >
            <Icon icon="x" className="w-6 h-6 text-blue-500" />
          </button>
        </header>
        <div className="py-3">
          <div className="px-4">
            <div>
              <img
                className="w-10 h-10 rounded-full"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80"
                alt=""
              />
              <div className="mt-2 text-sm">
                <p className="font-semibold">{user.name || 'Twitter user'}</p>
                <p className="text-gray-500">@{user.twitterHandle}</p>
              </div>
            </div>
            <div className="mt-4">
              <FollowStat
                follower={user.followersCount}
                following={user.followingCount}
                followingTo={`/${user.twitterHandle}/followings`}
                followerTo={`/${user.twitterHandle}/followers`}
              />
            </div>
          </div>
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
        </div>
      </aside>
    </div>
  );
}

export default MobileSidebar;
