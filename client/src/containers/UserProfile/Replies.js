import React from 'react';
import { useQuery } from 'react-query';
import { useSetTitle } from 'store/pageTitle';
import { allUserCommentedTweets } from 'api/all-tweets';
import * as q from 'shared/query-key';
import { Spinner } from 'components/Loader';
import DisplayTweets from './DisplayTweet';

function Replies({ user }) {
  useSetTitle(user.name, `@${user.twitterHandle}`);
  const { id } = user;

  const { data: { data: { tweets } = {} } = {}, isLoading, isError } = useQuery(
    [q.USER_COMMENTED_TWEETS, { id }],
    allUserCommentedTweets
  );

  return (
    <div className="relative">
      {isLoading || isError ? (
        <Spinner />
      ) : (
        <DisplayTweets tweets={tweets} showComments={true} />
      )}
    </div>
  );
}

export default Replies;
