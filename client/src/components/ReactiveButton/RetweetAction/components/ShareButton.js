import React, { useState } from 'react';
import { OutsideClickHandler, DropdownContainer } from 'components/Container';
import { MenuButton, ShareButton } from 'components/Button';

function ShareBtn({ tweet }) {
  const { meta: { isBookmarked } = {} } = tweet;
  const [isActive, setIsActive] = useState(false);

  const links = [
    {
      title: isBookmarked ? 'Remove from bookmarks' : 'Add tweet to bookmarks',
      icon: 'bookmark',
      // onClick: isBookmarked
      //   ? () => handleRemoveBookmark()
      //   : () => handleBookmark(),
      // disabled: isBookmarked ? removingBookmark : isLoading,
    },
    {
      title: 'Copy link to tweet',
      icon: 'link',
    },
  ];

  return (
    <OutsideClickHandler
      onOutsideClick={() => setIsActive(false)}
      className="relative flex items-center justify-center"
    >
      <ShareButton size="sm" onClick={() => setIsActive(!isActive)} />
      <DropdownContainer isActive={isActive}>
        {links.map((link) => (
          <MenuButton
            key={link.title}
            size="md"
            icon={link.icon}
            variant="menu"
            // onClick={link.onClick ? link.onClick : null}
            // disabled={link.disabled && link.disabled}
          >
            {link.title}
          </MenuButton>
        ))}
      </DropdownContainer>
    </OutsideClickHandler>
  );
}

export default ShareBtn;
