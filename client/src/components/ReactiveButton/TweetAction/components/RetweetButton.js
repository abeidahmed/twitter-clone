import React, { useState } from 'react';
import { useRefetchMutation } from 'hooks/useRefetchMutation';
import { createTweetRetweet } from 'api/create-retweet';
import * as q from 'shared/queryKey';
import { RetweetButton, MenuButton } from 'components/Button';
import { OutsideClickHandler, DropdownContainer } from 'components/Container';

function RetweetBtn({ tweet, showCount }) {
  const { id } = tweet;
  const [menuActive, setMenuActive] = useState(false);

  const [mutate, { isLoading }] = useRefetchMutation(createTweetRetweet, [
    q.ALL_RETWEETS,
  ]);
  async function handleRetweet() {
    await mutate({
      tweetID: id,
      body: null,
    });
  }

  return (
    <OutsideClickHandler
      onOutsideClick={() => setMenuActive(false)}
      className="relative flex items-center justify-center"
    >
      <RetweetButton
        status={{ isRetweeted: false, totalRetweets: 4 }}
        showCount={showCount}
        size="sm"
        onClick={() => setMenuActive(!menuActive)}
      />
      <DropdownContainer isActive={menuActive}>
        <MenuButton
          size="md"
          icon="refresh"
          variant="menu"
          onClick={handleRetweet}
          disabled={isLoading}
        >
          Retweet
        </MenuButton>
        <MenuButton size="md" icon="pencil" variant="menu">
          Quote Tweet
        </MenuButton>
      </DropdownContainer>
    </OutsideClickHandler>
  );
}

export default RetweetBtn;
