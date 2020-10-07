import React from 'react';
import { useCurrentUser } from 'store/currentUser';
import { CardOption } from './components';
import { CommentCard } from 'components/Card';
import { TweetActionButtons } from 'components/ReactiveButton';
import {
  CardContainer,
  UserInfo,
  Figure,
  Content,
  UserAvatar,
} from '../shared';

function TweetCard({ tweet, user, showComments }) {
  // In user show page, the user details is not listed in the tweet array,
  // and hence twitter = user.
  const { id, uuid, body, image, twitter = user } = tweet;
  const { currentUser } = useCurrentUser();

  return (
    <>
      <CardContainer
        to={`/${twitter.twitterHandle}/status/${uuid}`}
        bordered={!showComments}
      >
        <div className="flex space-x-3">
          <UserAvatar showLine={showComments} user={twitter} />
          <div className="flex flex-col flex-1">
            <div>
              <div className="flex items-center justify-between">
                <UserInfo user={twitter} tweet={tweet} />
                {twitter.id === currentUser.id && <CardOption tweetID={id} />}
              </div>
              <Content body={body} />
              <Figure image={image} />
            </div>
            <div className="flex items-center justify-between w-full max-w-md mt-1 -ml-2">
              <TweetActionButtons
                tweet={tweet}
                user={user}
                size="sm"
                showCount={true}
              />
            </div>
          </div>
        </div>
      </CardContainer>
      {showComments &&
        tweet.comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            twitterID={twitter.id}
          />
        ))}
    </>
  );
}

export default TweetCard;
