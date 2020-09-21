import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'pages';
import { MobileSidebar } from 'components/mobile-sidebar';
import { MobileMenu } from 'components/mobile-menu';
import { Header } from 'components/header';
import { Sidebar } from 'components/sidebar';

export default function Regular() {
  return (
    <div className="sm:flex sm:max-w-7xl sm:mx-auto lg:grid lg:grid-cols-12">
      <MobileSidebar />
      <Sidebar />
      <div className="flex flex-col justify-between w-full h-screen lg:col-span-6">
        <Header />
        <div className="flex-1 overflow-y-auto border-l border-r border-gray-200">
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </div>
        <MobileMenu />
      </div>
    </div>
  );
}
