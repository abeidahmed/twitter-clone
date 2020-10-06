import React from 'react';
import { LikeButton } from 'components/Button';

function LikeBtn() {
  return (
    <LikeButton
      size="sm"
      showCount={true}
      status={{ isLiked: true, totalLikes: 41 }}
    />
  );
}

export default LikeBtn;
