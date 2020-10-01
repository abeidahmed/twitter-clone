import React from 'react';
import { useQuery } from 'react-query';
import { useSetTitle } from 'store/page-title';
import { allUserMediaTweets } from 'api/all-tweets';
import * as a from 'shared/user-defaults';
import * as q from 'shared/query-key';
import { TwitterCard } from 'components/twitter-card';
import { Spinner } from 'components/spinner';

function Media({ user }) {
  useSetTitle(user.name || a.DEFAULT_NAME, `@${user.twitterHandle}`);
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
          tweets.map((tweet) => (
            <TwitterCard key={tweet.id} tweet={tweet} user={user} />
          ))
        )}
      </section>
    </div>
  );
}

export default Media;
