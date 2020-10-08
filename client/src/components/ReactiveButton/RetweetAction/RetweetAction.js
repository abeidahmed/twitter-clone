import React from 'react';
import {
  CommentButton,
  RetweetButton,
  LikeButton,
  ShareButton,
} from './components';

function RetweetAction({ showCount, tweet }) {
  return (
    <div className="flex items-center justify-between w-full max-w-md mt-1 -ml-2">
      <CommentButton />
      <RetweetButton showCount={showCount} tweet={tweet} />
      <LikeButton />
      <ShareButton />
    </div>
  );
}

export default RetweetAction;
