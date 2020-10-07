import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ModalStore } from 'store/modal';
import { PageTitleStore } from 'store/page-title';
import { SidebarStore } from 'store/sidebar';
import { MobileSidebar, DesktopSidebar } from 'components/Sidebar';
import MobileMenu from 'lib/mobile-menu';
import Header from 'lib/header';
import Explore from 'containers/ExplorePage';
import Home from 'containers/HomePage';
import Bookmark from 'containers/BookmarkPage';
import Profile from 'containers/UserProfile';
import ShowTweet from 'containers/ShowTweet';
import ModalRoot from 'modals/modal-root';

export default function Regular() {
  return (
    <ModalStore>
      <PageTitleStore>
        <ModalRoot />
        <div className="sm:flex sm:max-w-7xl sm:mx-auto lg:grid lg:grid-cols-12">
          <SidebarStore>
            <MobileSidebar />
            <DesktopSidebar />
            <div className="flex flex-col justify-between w-full h-screen lg:col-span-9 xl:col-span-6">
              <Header />
              <div className="relative flex-1 overflow-y-auto border-l border-r border-gray-200">
                <Switch>
                  <Route exact path="/explore" component={Explore} />
                  <Route exact path="/:id/status/:uuid" component={ShowTweet} />
                  <Route exact path="/:id/bookmarks" component={Bookmark} />
                  <Route path="/users/:id" component={Profile} />
                  <Route path="/" component={Home} />
                </Switch>
              </div>
              <MobileMenu />
            </div>
          </SidebarStore>
        </div>
      </PageTitleStore>
    </ModalStore>
  );
}
