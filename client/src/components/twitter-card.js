import React from 'react';
import { useCurrentUser } from 'store/current-user';
import { withPartialMonth } from 'utils/date-time';
import { useRefetchMutation } from 'hooks/refetch-mutation';
import { useModalType } from 'store/modal';
import { voteTweet } from 'api/vote-tweet';
import * as a from 'shared/user-defaults';
import * as q from 'shared/query-key';
import { Avatar } from './avatar';
import { TextButton, TwitterActionButton } from './button';
import { CardContainer } from 'components/container';
import { AspectRatio } from './aspect-ratio';
import { TweetCardOption } from './tweet-card-option';
import { LikeButton } from './like-button';
import { CommentButton } from './comment-button';
import { CommentCard } from './comment-card';

export function TwitterCard({ tweet, user, showComments }) {
  // In user show page, the user details is not listed in the tweet array,
  // and hence twitter = user.
  const { id, uuid, body, createdAt, image, twitter = user } = tweet;
  const { currentUser } = useCurrentUser();

  return (
    <>
      <CardContainer
        to={`/${twitter.twitterHandle}/status/${uuid}`}
        bordered={!showComments}
      >
        <div className="flex flex-col items-center">
          <div className="flex-shrink-0">
            <Avatar size="md" src={twitter.avatar} alt="" />
          </div>
          {showComments && (
            <div className="flex-1 w-0.5 py-4 my-2 bg-gray-300"></div>
          )}
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
              {twitter.id === currentUser.id && (
                <TweetCardOption tweetID={id} />
              )}
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
          <CardActionButtons tweet={tweet} user={user} />
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

function CardActionButtons({ tweet, user }) {
  const { id, body, createdAt, meta = {}, twitter = user } = tweet;
  const { likes, comments } = meta;

  const { modalOn, types } = useModalType();

  const [mutate, { isLoading }] = useRefetchMutation(voteTweet, [
    q.ALL_TWEETS,
    q.SHOW_TWEET,
    q.SHOW_USER,
  ]);

  async function handleLike() {
    await mutate({
      id,
    });
  }

  function handleComment() {
    modalOn({
      modalType: types.CREATE_COMMENT_ON_TWEET,
      modalProps: {
        tweetID: id,
        twitterName: twitter.name,
        twitterTwitterHandle: twitter.twitterHandle,
        twitterAvatar: twitter.avatar,
        tweetBody: body,
        tweetCreatedAt: createdAt,
      },
    });
  }

  return (
    <div className="flex items-center justify-between w-full max-w-md mt-1 -ml-2">
      <CommentButton
        size="sm"
        showCount={true}
        count={comments.totalComments}
        onClick={handleComment}
      />
      <TwitterActionButton
        icon="refresh"
        size="sm"
        color="green"
        className="relative"
      >
        4
      </TwitterActionButton>
      <LikeButton
        size="sm"
        showCount={true}
        status={likes}
        onClick={handleLike}
        disabled={isLoading}
      />
      <TwitterActionButton
        icon="upload"
        size="sm"
        color="teal"
        className="relative"
      />
    </div>
  );
}
