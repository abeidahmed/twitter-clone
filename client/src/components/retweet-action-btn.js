import React, { useState } from 'react';
import { CommentButton } from './comment-button';
import { TwitterActionButton, MenuButton } from './Button';
import { LikeButton } from './like-button';
import { OutsideClickHandler } from './outside-click-handler';
import { DropdownContainer } from './container';

export function RetweetActionBtn() {
  return (
    <div className="flex items-center justify-between w-full max-w-md mt-1 -ml-2">
      <CommentBtn />
      <RetweetBtn />
      <LikeBtn />
      <ShareBtn />
    </div>
  );
}

function CommentBtn() {
  return <CommentButton size="sm" showCount={true} count={2} />;
}

function RetweetBtn() {
  return (
    <TwitterActionButton
      icon="refresh"
      size="sm"
      appearance="green"
      className="relative"
    >
      4
    </TwitterActionButton>
  );
}

function LikeBtn() {
  return (
    <LikeButton
      size="sm"
      showCount={true}
      status={{ isLiked: true, totalLikes: 41 }}
    />
  );
}

function ShareBtn() {
  const [isActive, setIsActive] = useState(false);

  const links = [
    {
      title: true ? 'Remove from bookmarks' : 'Add tweet to bookmarks',
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
      <TwitterActionButton
        icon="upload"
        size="sm"
        appearance="teal"
        className="relative"
        onClick={() => setIsActive(!isActive)}
      />
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
