import React from 'react';
import { IconButton } from 'components/Button';
import { Icon } from 'components/Icon';

function Header({ setOff }) {
  return (
    <header className="flex items-center justify-between px-4 border-b h-14">
      <h2 className="text-lg font-extrabold">Account info</h2>
      <IconButton
        size="md"
        appearance="minimal"
        onClick={setOff}
        className="-mr-2"
      >
        <Icon icon="x" className="w-6 h-6 text-blue-500" />
      </IconButton>
    </header>
  );
}

export default Header;
