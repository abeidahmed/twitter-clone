import React from 'react';
import { useRefetchMutation } from 'hooks/refetch-mutation';
import { voteTweet } from 'api/vote-tweet';
import * as q from 'shared/query-key';
import { LikeButton } from 'components/Button';

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

export default LikeBtn;
