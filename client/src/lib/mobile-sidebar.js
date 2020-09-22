import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Icon } from 'components/icon';
import { connect } from 'react-redux';
import { closeSidebar } from 'actions/sidebar';
import { logout } from 'actions/current-user';

function MobileSidebar({ user, isActive, logout, closeSidebar }) {
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
            onClick={closeSidebar}
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
                <p className="font-semibold">Abeid Ahmed</p>
                <p className="text-gray-500">@iamhawaabi</p>
              </div>
            </div>
            <div className="flex items-center mt-4 space-x-4 text-sm">
              <p className="font-bold">
                39{' '}
                <span className="font-normal text-gray-500 pl-0.5">
                  Following
                </span>
              </p>
              <p className="font-bold">
                17{' '}
                <span className="font-normal text-gray-500 pl-0.5">
                  Followers
                </span>
              </p>
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

function mapStateToProps(state) {
  return {
    isActive: state.sidebar.sidebar,
    user: state.currentUser.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeSidebar: () => dispatch(closeSidebar()),
    logout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileSidebar);
