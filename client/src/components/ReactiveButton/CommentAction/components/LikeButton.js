import React from 'react';
import { useRefetchMutation } from 'hooks/useRefetchMutation';
import { voteComment } from 'api/vote-comment';
import * as q from 'shared/queryKey';
import { LikeButton } from 'components/Button';

function LikeBtn({ likes, commentID }) {
  const [mutate, { isLoading }] = useRefetchMutation(voteComment, [
    q.SHOW_TWEET,
  ]);

  async function handleLike() {
    await mutate({
      id: commentID,
    });
  }

  return (
    <LikeButton
      size="sm"
      showCount={true}
      status={likes}
      disabled={isLoading}
      onClick={handleLike}
    />
  );
}

export default LikeBtn;
