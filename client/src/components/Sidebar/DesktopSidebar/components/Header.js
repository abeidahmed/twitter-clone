import React from 'react';
import { IconButton } from 'components/Button';
import { Icon } from 'components/Icon';

function Header() {
  return (
    <header className="flex items-center justify-center lg:px-2 lg:justify-start h-14">
      <IconButton size="md" to="/">
        <Icon
          icon="twitter-solid"
          stroke="none"
          fill="currentColor"
          className="text-blue-500 w-9 h-9"
        />
      </IconButton>
    </header>
  );
}

export default Header;
