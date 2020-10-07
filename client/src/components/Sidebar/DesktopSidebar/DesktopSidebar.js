import React from 'react';
import { Header, Navigation, ProfileDropdown, TweetButton } from './components';

function DesktopSidebar() {
  return (
    <div className="hidden h-screen px-6 sm:block lg:col-span-3">
      <div className="ml-auto lg:ml-0">
        <Header />
        <div
          className="flex flex-col justify-between px-2 py-3"
          style={{ height: 'calc(100vh - 56px)' }}
        >
          <nav className="flex-1 space-y-3">
            <Navigation />
            <TweetButton />
          </nav>
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
}

export default DesktopSidebar;
