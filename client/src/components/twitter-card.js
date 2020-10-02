import React, { useState } from 'react';
import { useCurrentUser } from 'store/current-user';
import { withPartialMonth } from 'utils/date-time';
import { useRefetchMutation } from 'hooks/refetch-mutation';
import { useModalType } from 'store/modal';
import { voteTweet } from 'api/vote-tweet';
import { bookmarkTweet } from 'api/create-bookmark';
import * as a from 'shared/user-defaults';
import * as q from 'shared/query-key';
import { Avatar } from './avatar';
import { TextButton, TwitterActionButton, IconWithTextButton } from './button';
import { CardContainer, DropdownContainer } from 'components/container';
import { AspectRatio } from './aspect-ratio';
import { TweetCardOption } from './tweet-card-option';
import { LikeButton } from './like-button';
import { CommentButton } from './comment-button';
import { CommentCard } from './comment-card';
import { OutsideClickHandler } from './outside-click-handler';

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
          <div className="flex items-center justify-between w-full max-w-md mt-1 -ml-2">
            <CommentBtn tweet={tweet} user={user} />
            <RetweetBtn />
            <LikeBtn tweet={tweet} />
            <ShareBtn tweet={tweet} />
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

function CommentBtn({ tweet, user }) {
  const { id, body, createdAt, meta = {}, twitter = user } = tweet;
  const { comments } = meta;

  const { modalOn, types } = useModalType();

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
    <CommentButton
      size="sm"
      showCount={true}
      count={comments.totalComments}
      onClick={handleComment}
    />
  );
}

function LikeBtn({ tweet }) {
  const { id, meta = {} } = tweet;
  const { likes } = meta;

  const [mutate, { isLoading }] = useRefetchMutation(voteTweet, [
    q.ALL_TWEETS,
    q.SHOW_TWEET,
    q.SHOW_USER,
    q.USER_COMMENTED_TWEETS,
    q.USER_LIKED_TWEETS,
    q.USER_MEDIA_TWEETS,
  ]);

  async function handleLike() {
    await mutate({
      id,
    });
  }

  return (
    <LikeButton
      size="sm"
      showCount={true}
      status={likes}
      onClick={handleLike}
      disabled={isLoading}
    />
  );
}

function RetweetBtn() {
  return (
    <TwitterActionButton
      icon="refresh"
      size="sm"
      color="green"
      className="relative"
    >
      4
    </TwitterActionButton>
  );
}

function ShareBtn({ tweet }) {
  const { id, meta: { isBookmarked } = {} } = tweet;

  const [isActive, setIsActive] = useState(false);
  const [mutate, { isLoading }] = useRefetchMutation(bookmarkTweet);

  async function handleBookmark() {
    await mutate({
      tweetID: id,
    });
  }

  const links = [
    {
      title: isBookmarked ? 'Remove from bookmarks' : 'Add tweet to bookmarks',
      icon: 'bookmark',
      onClick: () => handleBookmark(),
      disabled: isLoading,
    },
    {
      title: 'Copy link to tweet',
      icon: 'link',
    },
  ];

  return (
    <OutsideClickHandler
      onOutsideClick={() => setIsActive(false)}
      className="relative"
    >
      <TwitterActionButton
        icon="upload"
        size="sm"
        color="teal"
        className="relative"
        onClick={() => setIsActive(!isActive)}
      />
      <DropdownContainer position="top" isActive={isActive}>
        {links.map((link) => (
          <IconWithTextButton
            key={link.title}
            color="white"
            size="md"
            icon={link.icon}
            variant="menu"
            onClick={link.onClick ? link.onClick : null}
            disabled={link.disabled && link.disabled}
          >
            {link.title}
          </IconWithTextButton>
        ))}
      </DropdownContainer>
    </OutsideClickHandler>
  );
}
