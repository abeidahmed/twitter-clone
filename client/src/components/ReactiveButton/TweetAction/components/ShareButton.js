import React, { useState } from 'react';
import { useRefetchMutation } from 'hooks/useRefetchMutation';
import { bookmarkTweet } from 'api/create-bookmark';
import { deleteBookmark } from 'api/delete-bookmark';
import * as q from 'shared/queryKey';
import { ShareButton, MenuButton } from 'components/Button';
import { OutsideClickHandler, DropdownContainer } from 'components/Container';

function ShareBtn({ tweet, size }) {
  const { id, meta: { isBookmarked } = {} } = tweet;

  const [isActive, setIsActive] = useState(false);
  const [
    addBookmark,
    { isLoading: addingBookmark },
  ] = useRefetchMutation(bookmarkTweet, [
    q.ALL_TWEETS,
    q.SHOW_TWEET,
    q.SHOW_USER,
    q.USER_COMMENTED_TWEETS,
    q.USER_LIKED_TWEETS,
    q.USER_MEDIA_TWEETS,
    q.ALL_BOOKMARKS,
  ]);

  async function handleBookmark() {
    await addBookmark({
      tweetID: id,
    });
  }

  const [
    removeBookmark,
    { isLoading: removingBookmark },
  ] = useRefetchMutation(deleteBookmark, [
    q.ALL_TWEETS,
    q.SHOW_TWEET,
    q.SHOW_USER,
    q.USER_COMMENTED_TWEETS,
    q.USER_LIKED_TWEETS,
    q.USER_MEDIA_TWEETS,
    q.ALL_BOOKMARKS,
  ]);

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
        : () => handleBookmark(),
      disabled: isBookmarked ? removingBookmark : addingBookmark,
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
      <ShareButton size={size} onClick={() => setIsActive(!isActive)} />
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
