import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PageTitleStore } from 'store/page-title';
import { SidebarStore } from 'store/sidebar';
import MobileSidebar from 'lib/mobile-sidebar';
import MobileMenu from 'lib/mobile-menu';
import Header from 'lib/header';
import Sidebar from 'lib/sidebar';
import Explore from 'pages/explore';
import Home from 'pages';
import Profile from 'pages/profile';

export default function Regular() {
  return (
    <PageTitleStore>
      <div className="sm:flex sm:max-w-7xl sm:mx-auto lg:grid lg:grid-cols-12">
        <SidebarStore>
          <MobileSidebar />
          <Sidebar />
          <div className="flex flex-col justify-between w-full h-screen lg:col-span-6">
            <Header />
            <div className="flex-1 overflow-y-auto border-l border-r border-gray-200">
              <Switch>
                <Route path="/explore" component={Explore} />
                <Route exact path="/" component={Home} />
                <Route path="/:id" component={Profile} />
              </Switch>
            </div>
            <MobileMenu />
          </div>
        </SidebarStore>
      </div>
    </PageTitleStore>
  );
}
