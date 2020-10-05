import React, { useState } from 'react';
import { useModalType } from 'store/modal';
import { useRefetchMutation } from 'hooks/refetch-mutation';
import { voteTweet } from 'api/vote-tweet';
import { bookmarkTweet } from 'api/create-bookmark';
import { deleteBookmark } from 'api/delete-bookmark';
import * as q from 'shared/query-key';
import { OutsideClickHandler } from './outside-click-handler';
import { TwitterActionButton, MenuButton } from './Button';
import { DropdownContainer } from './Container';
import { CommentButton } from './comment-button';
import { LikeButton } from './like-button';

export function TweetActionBtn({ tweet, user, size, showCount }) {
  return (
    <>
      <CommentBtn tweet={tweet} user={user} size={size} showCount={showCount} />
      <RetweetBtn size={size} showCount={showCount} />
      <LikeBtn tweet={tweet} size={size} showCount={showCount} />
      <ShareBtn tweet={tweet} size={size} />
    </>
  );
}

function CommentBtn({ tweet, user, size, showCount }) {
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
      size={size}
      showCount={showCount}
      count={comments.totalComments}
      onClick={handleComment}
    />
  );
}

function LikeBtn({ tweet, size, showCount }) {
  const { id, meta = {} } = tweet;
  const { likes } = meta;

  const [mutate, { isLoading }] = useRefetchMutation(voteTweet, [
    q.ALL_TWEETS,
    q.SHOW_TWEET,
    q.SHOW_USER,
    q.USER_COMMENTED_TWEETS,
    q.USER_LIKED_TWEETS,
    q.USER_MEDIA_TWEETS,
    q.ALL_BOOKMARKS,
  ]);

  async function handleLike() {
    await mutate({
      id,
    });
  }

  return (
    <LikeButton
      size={size}
      showCount={showCount}
      status={likes}
      onClick={handleLike}
      disabled={isLoading}
    />
  );
}

function RetweetBtn({ size, showCount }) {
  return (
    <TwitterActionButton
      icon="refresh"
      size={size}
      appearance="green"
      className="relative"
    >
      {showCount && 4}
    </TwitterActionButton>
  );
}

function ShareBtn({ tweet, size }) {
  const { id, meta: { isBookmarked } = {} } = tweet;

  const [isActive, setIsActive] = useState(false);
  const [mutate, { isLoading }] = useRefetchMutation(bookmarkTweet, [
    q.ALL_TWEETS,
    q.SHOW_TWEET,
    q.SHOW_USER,
    q.USER_COMMENTED_TWEETS,
    q.USER_LIKED_TWEETS,
    q.USER_MEDIA_TWEETS,
    q.ALL_BOOKMARKS,
  ]);

  async function handleBookmark() {
    await mutate({
      tweetID: id,
    });
  }

  const [
    removeBookmark,
    { isLoading: removingBookmark },
  ] = useRefetchMutation(deleteBookmark, [
    q.ALL_TWEETS,
    q.SHOW_TWEET,
    q.SHOW_USER,
    q.USER_COMMENTED_TWEETS,
    q.USER_LIKED_TWEETS,
    q.USER_MEDIA_TWEETS,
    q.ALL_BOOKMARKS,
  ]);

  async function handleRemoveBookmark() {
    await removeBookmark({
      id,
    });
  }

  const links = [
    {
      title: isBookmarked ? 'Remove from bookmarks' : 'Add tweet to bookmarks',
      icon: 'bookmark',
      onClick: isBookmarked
        ? () => handleRemoveBookmark()
        : () => handleBookmark(),
      disabled: isBookmarked ? removingBookmark : isLoading,
    },
    {
      title: 'Copy link to tweet',
      icon: 'link',
    },
  ];

  return (
    <OutsideClickHandler
      onOutsideClick={() => setIsActive(false)}
      className="relative flex items-center justify-center"
    >
      <TwitterActionButton
        icon="upload"
        size={size}
        appearance="teal"
        className="relative"
        onClick={() => setIsActive(!isActive)}
      />
      <DropdownContainer isActive={isActive}>
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
