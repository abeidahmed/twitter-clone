import React from 'react';
import { useQuery } from 'react-query';
import { useSetTitle } from 'store/page-title';
import { allUserCommentedTweets } from 'api/all-tweets';
import * as a from 'shared/user-defaults';
import * as q from 'shared/query-key';
import { TwitterCard } from 'components/twitter-card';
import { Spinner } from 'components/spinner';

function Replies({ user }) {
  useSetTitle(user.name || a.DEFAULT_NAME, `@${user.twitterHandle}`);
  const { id } = user;

  const { data: { data: { tweets } = {} } = {}, isLoading, isError } = useQuery(
    [q.USER_COMMENTED_TWEETS, { id }],
    allUserCommentedTweets
  );

  if (isLoading || isError) return <Spinner />;

  return (
    <>
      {tweets.map((tweet) => (
        <TwitterCard key={tweet.id} tweet={tweet} showComments={true} />
      ))}
    </>
  );
}

export default Replies;
