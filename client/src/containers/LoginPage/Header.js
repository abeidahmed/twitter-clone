import React from 'react';
import { Icon } from 'components/Icon';

function Header() {
  return (
    <div className="px-4">
      <Icon
        icon="twitter-solid"
        stroke="none"
        fill="currentColor"
        className="w-12 h-12 mx-auto text-blue-500"
      />
      <h2 className="mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900">
        Sign in to your account
      </h2>
    </div>
  );
}

export default Header;
