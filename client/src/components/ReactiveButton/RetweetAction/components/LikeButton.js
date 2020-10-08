import React from 'react';
import { useRefetchMutation } from 'hooks/useRefetchMutation';
import { voteRetweet } from 'api/vote-retweet';
import * as q from 'shared/queryKey';
import { LikeButton } from 'components/Button';

function LikeBtn({ showCount, tweet }) {
  const { id, meta: { likes } = {} } = tweet;
  const [mutate, { isLoading }] = useRefetchMutation(voteRetweet, [
    q.ALL_RETWEETS,
  ]);

  async function handleLike() {
    await mutate({
      id,
    });
  }

  return (
    <LikeButton
      size="sm"
      showCount={showCount}
      status={likes}
      disabled={isLoading}
      onClick={handleLike}
    />
  );
}

export default LikeBtn;
