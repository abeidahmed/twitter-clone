import React from 'react';
import { LikeButton } from 'components/Button';

function LikeBtn({ showCount, tweet }) {
  const { meta: { likes } = {} } = tweet;

  return <LikeButton size="sm" showCount={showCount} status={likes} />;
}

export default LikeBtn;
