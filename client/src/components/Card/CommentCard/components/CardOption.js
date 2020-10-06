import React, { useState } from 'react';
import { useRefetchMutation } from 'hooks/refetch-mutation';
import { useCurrentUser } from 'store/current-user';
import { deleteComment } from 'api/delete-comment';
import * as q from 'shared/query-key';
import { OutsideClickHandler, DropdownContainer } from 'components/Container';
import { IconButton, MenuButton } from 'components/Button';
import { Icon } from 'components/Icon';

function CardOption({ commenterID, twitterID, commentID }) {
  const [isActive, setIsActive] = useState(false);
  const { currentUser } = useCurrentUser();

  const [mutate, { isLoading }] = useRefetchMutation(deleteComment, [
    q.SHOW_TWEET,
    q.USER_COMMENTED_TWEETS,
    q.USER_LIKED_TWEETS,
    q.USER_MEDIA_TWEETS,
    q.ALL_BOOKMARKS,
  ]);

  async function handleDelete(id) {
    await mutate({ id });
  }

  if (commenterID === currentUser.id || twitterID === currentUser.id) {
    return (
      <OutsideClickHandler
        onOutsideClick={() => setIsActive(false)}
        className="relative"
      >
        <IconButton
          size="sm"
          appearance="primary-text"
          onClick={() => setIsActive(!isActive)}
        >
          <Icon icon="chevron-down" className="w-4 h-4" />
        </IconButton>
        <DropdownContainer isActive={isActive}>
          <MenuButton
            appearance="danger"
            size="md"
            icon="trash"
            variant="menu"
            onClick={() => handleDelete(commentID)}
            disabled={isLoading}
          >
            Delete
          </MenuButton>
        </DropdownContainer>
      </OutsideClickHandler>
    );
  }
  return null;
}

export default CardOption;