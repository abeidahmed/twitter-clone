import React from 'react';
import { useQuery } from 'react-query';
import { useSetTitle } from 'store/pageTitle';
import { allUserMediaTweets } from 'api/all-tweets';
import * as q from 'shared/query-key';
import { Spinner } from 'components/Loader';
import DisplayTweets from './DisplayTweet';

function Media({ user }) {
  useSetTitle(user.name, `@${user.twitterHandle}`);
  const { id } = user;

  const { data: { data: { tweets } = {} } = {}, isLoading, isError } = useQuery(
    [q.USER_MEDIA_TWEETS, { id }],
    allUserMediaTweets
  );

  return (
    <div className="relative">
      <section>
        {isLoading || isError ? (
          <Spinner />
        ) : (
          <DisplayTweets tweets={tweets} user={user} />
        )}
      </section>
    </div>
  );
}

export default Media;
