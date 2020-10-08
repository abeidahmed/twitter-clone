import React from 'react';
import { CommentButton } from 'components/Button';

function CommentBtn({ showCount, tweet }) {
  const { meta: { comments } = {} } = tweet;
  return (
    <CommentButton
      size="sm"
      showCount={showCount}
      count={comments.totalComments}
    />
  );
}

export default CommentBtn;
