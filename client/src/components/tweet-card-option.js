import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRefetchMutation } from 'hooks/refetch-mutation';
import { deleteTweet } from 'api/delete-tweet';
import * as q from 'shared/query-key';
import { IconButton, IconWithTextButton } from './button';
import { Icon } from './icon';
import { DropdownContainer } from './container';

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
    <div className="relative">
      <IconButton
        size="sm"
        color="primary-text"
        onClick={() => setMenuActive(!menuActive)}
      >
        <Icon icon="chevron-down" className="w-4 h-4" />
      </IconButton>
      <DropdownContainer position="top" isActive={menuActive}>
        <IconWithTextButton
          color="danger"
          size="md"
          icon="trash"
          variant="menu"
          disabled={isLoading}
          onClick={() => handleDelete(tweetID)}
        >
          Delete
        </IconWithTextButton>
      </DropdownContainer>
    </div>
  );
}
