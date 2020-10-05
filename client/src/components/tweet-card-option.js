import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRefetchMutation } from 'hooks/refetch-mutation';
import { deleteTweet } from 'api/delete-tweet';
import * as q from 'shared/query-key';
import { IconButton, MenuButton } from './Button';
import { Icon } from './Icon';
import { DropdownContainer } from './Container';
import { OutsideClickHandler } from './outside-click-handler';

export function TweetCardOption({ tweetID, redirect }) {
  const [menuActive, setMenuActive] = useState(false);

  const [mutate, { isLoading }] = useRefetchMutation(deleteTweet, [
    q.ALL_TWEETS,
    q.SHOW_USER,
  ]);

  const history = useHistory();
  async function handleDelete(id) {
    await mutate({ id });
    if (redirect) history.goBack();
  }

  return (
    <OutsideClickHandler
      onOutsideClick={() => setMenuActive(false)}
      className="relative"
    >
      <IconButton
        size="sm"
        appearance="minimal"
        onClick={() => setMenuActive(!menuActive)}
      >
        <Icon icon="chevron-down" className="w-4 h-4" />
      </IconButton>
      <DropdownContainer isActive={menuActive}>
        <MenuButton
          appearance="danger"
          size="md"
          icon="trash"
          variant="menu"
          disabled={isLoading}
          onClick={() => handleDelete(tweetID)}
        >
          Delete
        </MenuButton>
      </DropdownContainer>
    </OutsideClickHandler>
  );
}
