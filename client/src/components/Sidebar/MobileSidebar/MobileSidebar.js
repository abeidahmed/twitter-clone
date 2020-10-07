import React from 'react';
import { useSidebarToggle } from 'store/sidebar';
import { Aside, Header, UserInfo, Navigation } from './components';

function MobileSidebar() {
  const { setOff, isActive } = useSidebarToggle();

  return (
    <div className="bg-white sm:hidden">
      <Aside isActive={isActive}>
        <Header setOff={setOff} />
        <div className="py-3">
          <UserInfo />
          <Navigation />
        </div>
      </Aside>
    </div>
  );
}

export default MobileSidebar;
