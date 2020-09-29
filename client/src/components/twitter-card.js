import React, { useState } from 'react';
import { useCurrentUser } from 'store/current-user';
import { useRefetchMutation } from 'hooks/refetch-mutation';
import { withPartialMonth } from 'utils/date-time';
import { deleteTweet } from 'api/delete-tweet';
import * as q from 'shared/query-key';
import * as a from 'shared/user-defaults';
import { Avatar } from './avatar';
import {
  TextButton,
  TwitterActionButton,
  IconButton,
  IconWithTextButton,
} from './button';
import { Icon } from './icon';
import { DropdownContainer, CardContainer } from 'components/container';
import { AspectRatio } from './aspect-ratio';

export function TwitterCard({ tweet, user }) {
  // In user show page, the user details is not listed in the tweet array,
  // and hence twitter = user.
  const { id, uuid, body, createdAt, image, twitter = user } = tweet;
  const { currentUser } = useCurrentUser();

  return (
    <CardContainer to={`/${twitter.twitterHandle}/status/${uuid}`}>
      <div className="flex-shrink-0">
        <Avatar size="md" src={twitter.avatar} alt="" />
      </div>
      <div className="flex flex-col flex-1">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TextButton
                to={`/${twitter.twitterHandle}`}
                color="black"
                size="sm"
                className="relative font-bold"
              >
                {twitter.name || a.DEFAULT_NAME}
              </TextButton>
              <span className="pl-2 text-sm leading-5 text-gray-500">
                @{twitter.twitterHandle}
              </span>
              <span className="mx-1">&middot;</span>
              <span className="text-sm leading-5 text-gray-500">
                {withPartialMonth(createdAt)}
              </span>
            </div>
            {twitter.id === currentUser.id && <CardOptions tweetID={id} />}
          </div>
          <div className="mt-2">
            <p className="text-gray-600">{body}</p>
          </div>
          {image && (
            <figure className="mt-3">
              <AspectRatio src={image} alt="attachment" ratio="16:9" />
            </figure>
          )}
        </div>
        <div className="flex items-center justify-between w-full max-w-md mt-1 -ml-2">
          <TwitterActionButton
            icon="chat"
            size="sm"
            color="blue"
            className="relative"
          >
            18
          </TwitterActionButton>
          <TwitterActionButton
            icon="refresh"
            size="sm"
            color="green"
            className="relative"
          >
            4
          </TwitterActionButton>
          <TwitterActionButton
            icon="heart"
            size="sm"
            color="red"
            className="relative"
          >
            23
          </TwitterActionButton>
          <TwitterActionButton
            icon="upload"
            size="sm"
            color="teal"
            className="relative"
          />
        </div>
      </div>
    </CardContainer>
  );
}

function CardOptions({ tweetID }) {
  const [menuActive, setMenuActive] = useState(false);

  const [mutate, { isLoading }] = useRefetchMutation(deleteTweet, [
    q.ALL_TWEETS,
    q.SHOW_USER,
  ]);

  async function handleDelete(id) {
    await mutate({ id });
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
