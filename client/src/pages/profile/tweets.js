import React from 'react';
import { useQuery } from 'react-query';
import { useSetTitle } from 'store/page-title';
import { allUserTweets } from 'api/all-tweets';
import * as a from 'shared/user-defaults';
import * as q from 'shared/query-key';
import { TwitterCard } from 'components/twitter-card';
import { Spinner } from 'components/spinner';

function Tweets({ user }) {
  useSetTitle(user.name || a.DEFAULT_NAME, `@${user.twitterHandle}`);
  const { twitterHandle } = user;

  const { data: { data: { tweets } = {} } = {}, isLoading, isError } = useQuery(
    [q.ALL_USER_TWEETS, { id: twitterHandle }],
    allUserTweets
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

export default Tweets;
