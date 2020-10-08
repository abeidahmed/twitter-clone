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
      <CommentButton showCount={showCount} tweet={tweet} />
      <RetweetButton showCount={showCount} tweet={tweet} />
      <LikeButton showCount={showCount} tweet={tweet} />
      <ShareButton tweet={tweet} />
    </div>
  );
}

export default RetweetAction;
