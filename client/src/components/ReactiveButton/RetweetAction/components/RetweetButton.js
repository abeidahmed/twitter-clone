import React, { useState } from 'react';
import { useRefetchMutation } from 'hooks/useRefetchMutation';
import { createRetweetRetweet } from 'api/create-retweet';
import { deleteRetweet } from 'api/delete-retweet';
import * as q from 'shared/queryKey';
import { RetweetButton, MenuButton } from 'components/Button';
import { OutsideClickHandler, DropdownContainer } from 'components/Container';

function RetweetBtn({ showCount, tweet }) {
  const { id, meta: { retweets } = {} } = tweet;
  const { isRetweeted } = retweets;
  const [menuActive, setMenuActive] = useState(false);

  const [
    createRetweet,
    { isLoading: retweeting },
  ] = useRefetchMutation(createRetweetRetweet, [q.ALL_RETWEETS]);

  async function handleRetweet() {
    await createRetweet({
      retweetID: id,
      body: null,
    });
  }

  const [
    undoRetweet,
    { isLoading: deleting },
  ] = useRefetchMutation(deleteRetweet, [q.ALL_RETWEETS]);

  async function handleUndoRetweet() {
    await undoRetweet({
      id,
    });
  }

  const links = [
    {
      title: isRetweeted ? 'Undo Retweet' : 'Retweet',
      icon: 'refresh',
      onClick: isRetweeted ? handleUndoRetweet : handleRetweet,
      disabled: isRetweeted ? deleting : retweeting,
    },
    {
      title: 'Quote Tweet',
      icon: 'pencil',
      // onClick: handleQuoteTweet,
      disabled: isRetweeted,
    },
  ];

  return (
    <OutsideClickHandler
      onOutsideClick={() => setMenuActive(false)}
      className="relative flex items-center"
    >
      <RetweetButton
        status={retweets}
        size="sm"
        showCount={showCount}
        onClick={() => setMenuActive(!menuActive)}
      />
      <DropdownContainer isActive={menuActive}>
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

export default RetweetBtn;
