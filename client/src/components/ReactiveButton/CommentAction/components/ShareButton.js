import React, { useState } from 'react';
import { useRefetchMutation } from 'hooks/useRefetchMutation';
import { bookmarkComment } from 'api/create-bookmark';
import { deleteBookmark } from 'api/delete-bookmark';
import * as q from 'shared/query-key';
import { OutsideClickHandler, DropdownContainer } from 'components/Container';
import { MenuButton, ShareButton } from 'components/Button';

function ShareBtn({ comment }) {
  const { meta, id } = comment;
  const { isBookmarked } = meta;
  const [isActive, setIsActive] = useState(false);

  const [
    addBookmark,
    { isLoading: adding },
  ] = useRefetchMutation(bookmarkComment, [
    q.SHOW_TWEET,
    q.USER_COMMENTED_TWEETS,
  ]);

  const [
    removeBookmark,
    { isLoading: removing },
  ] = useRefetchMutation(deleteBookmark, [
    q.ALL_BOOKMARKS,
    q.SHOW_TWEET,
    q.USER_COMMENTED_TWEETS,
  ]);

  async function handleAddBookmark() {
    await addBookmark({
      commentID: id,
    });
  }

  async function handleRemoveBookmark() {
    await removeBookmark({
      id,
    });
  }

  const links = [
    {
      title: isBookmarked ? 'Remove from bookmarks' : 'Add tweet to bookmarks',
      icon: 'bookmark',
      onClick: isBookmarked
        ? () => handleRemoveBookmark()
        : () => handleAddBookmark(),
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
