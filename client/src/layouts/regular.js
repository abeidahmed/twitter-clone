import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MobileSidebar from 'lib/mobile-sidebar';
import MobileMenu from 'lib/mobile-menu';
import Header from 'lib/header';
import Sidebar from 'lib/sidebar';
import Home from 'pages';
import Profile from 'pages/profile';

export default function Regular() {
  return (
    <div className="sm:flex sm:max-w-7xl sm:mx-auto lg:grid lg:grid-cols-12">
      <MobileSidebar />
      <Sidebar />
      <div className="flex flex-col justify-between w-full h-screen lg:col-span-6">
        <Header />
        <div className="flex-1 overflow-y-auto border-l border-r border-gray-200">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </div>
        <MobileMenu />
      </div>
    </div>
  );
}
