import React from 'react';
import {
  CommentButton,
  RetweetButton,
  LikeButton,
  ShareButton,
} from './components';

function TweetAction({ tweet, user, size, showCount }) {
  return (
    <>
      <CommentButton
        tweet={tweet}
        user={user}
        size={size}
        showCount={showCount}
      />
      <RetweetButton size={size} showCount={showCount} tweet={tweet} />
      <LikeButton tweet={tweet} size={size} showCount={showCount} />
      <ShareButton tweet={tweet} size={size} />
    </>
  );
}

export default TweetAction;
