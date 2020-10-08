import React, { useState } from 'react';
import { RetweetButton, MenuButton } from 'components/Button';
import { OutsideClickHandler, DropdownContainer } from 'components/Container';

function RetweetBtn({ showCount }) {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <OutsideClickHandler
      onOutsideClick={() => setMenuActive(false)}
      className="relative flex items-center"
    >
      <RetweetButton
        status={{ isRetweeted: false, totalRetweets: 4 }}
        size="sm"
        showCount={showCount}
        onClick={() => setMenuActive(!menuActive)}
      />
      <DropdownContainer isActive={menuActive}>
        <MenuButton size="md" icon="trash" variant="menu">
          Delete
        </MenuButton>
      </DropdownContainer>
    </OutsideClickHandler>
  );
}

export default RetweetBtn;
