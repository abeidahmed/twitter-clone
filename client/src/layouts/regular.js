import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'pages';
import { Sidebar } from 'components/sidebar';
import { MobileMenu } from 'components/mobile-menu';
import { Header } from 'components/header';

export default function Regular() {
  return (
    <div className="sm:flex">
      <Sidebar />
      <div className="flex flex-col justify-between w-full h-screen">
        <Header />
        <div className="flex-1">
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </div>
        <MobileMenu />
      </div>
    </div>
  );
}
