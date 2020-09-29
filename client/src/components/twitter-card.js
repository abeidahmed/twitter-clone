import React from 'react';
import { useCurrentUser } from 'store/current-user';
import { withPartialMonth } from 'utils/date-time';
import * as a from 'shared/user-defaults';
import { Avatar } from './avatar';
import { TextButton, TwitterActionButton } from './button';
import { CardContainer } from 'components/container';
import { AspectRatio } from './aspect-ratio';
import { TweetCardOption } from './tweet-card-option';

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
            {twitter.id === currentUser.id && <TweetCardOption tweetID={id} />}
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
