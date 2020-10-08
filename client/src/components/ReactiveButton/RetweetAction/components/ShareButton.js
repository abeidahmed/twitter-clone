import React, { useState } from 'react';
import { useRefetchMutation } from 'hooks/useRefetchMutation';
import { bookmarkRetweet } from 'api/create-bookmark';
import { deleteBookmark } from 'api/delete-bookmark';
import * as q from 'shared/queryKey';
import { OutsideClickHandler, DropdownContainer } from 'components/Container';
import { MenuButton, ShareButton } from 'components/Button';

function ShareBtn({ tweet }) {
  const { id, meta: { isBookmarked } = {} } = tweet;
  const [isActive, setIsActive] = useState(false);

  const [
    addBookmark,
    { isLoading: adding },
  ] = useRefetchMutation(bookmarkRetweet, [q.ALL_RETWEETS]);

  async function handleAddBookmark() {
    await addBookmark({
      retweetID: id,
    });
  }

  const [
    removeBookmark,
    { isLoading: removing },
  ] = useRefetchMutation(deleteBookmark, [q.ALL_RETWEETS, q.ALL_BOOKMARKS]);

  async function handleRemoveBookmark() {
    await removeBookmark({
      id,
    });
  }

  const links = [
    {
      title: isBookmarked ? 'Remove from bookmarks' : 'Add tweet to bookmarks',
      icon: 'bookmark',
      onClick: isBookmarked ? handleRemoveBookmark : handleAddBookmark,
      disabled: isBookmarked ? removing : adding,
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
            onClick={link.onClick ? link.onClick : null}
            disabled={link.disabled && link.disabled}
          >
            {link.title}
          </MenuButton>
        ))}
      </DropdownContainer>
    </OutsideClickHandler>
  );
}

export default ShareBtn;
