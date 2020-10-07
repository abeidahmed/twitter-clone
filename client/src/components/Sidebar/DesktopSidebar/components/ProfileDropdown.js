import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useCurrentUser } from 'store/currentUser';
import { OutsideClickHandler, DropdownContainer } from 'components/Container';
import UserButton from './UserButton';
import { MenuButton } from 'components/Button';

function ProfileDropdown() {
  const { currentUser, logout } = useCurrentUser();
  const [dropActive, setDropActive] = useState(false);

  const history = useHistory();
  function handleLogout() {
    logout();
    history.push('/secure/login');
  }

  return (
    <OutsideClickHandler
      onOutsideClick={() => setDropActive(false)}
      className="relative flex items-center justify-center"
    >
      <UserButton
        user={currentUser}
        onClick={() => setDropActive(!dropActive)}
      />
      <DropdownContainer
        isActive={dropActive}
        className="left-0 lg:right-auto lg:left-auto"
      >
        <MenuButton to="/" size="md" icon="cog" variant="menu">
          Settings
        </MenuButton>
        <MenuButton
          size="md"
          icon="logout"
          variant="menu"
          onClick={handleLogout}
        >
          Logout
        </MenuButton>
      </DropdownContainer>
    </OutsideClickHandler>
  );
}

export default ProfileDropdown;
