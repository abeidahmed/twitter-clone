import React from 'react';
import { useQuery } from 'react-query';
import * as q from 'shared/query-key';
import { allTweets } from 'api/all-tweets';
import { TwitterCard } from 'components/twitter-card';
import { Spinner } from 'components/Loader';

function Tweets() {
  const { data: { data: { tweets } = {} } = {}, isLoading, isError } = useQuery(
    q.ALL_TWEETS,
    allTweets
  );

  return (
    <>
      {isLoading || isError ? (
        <Spinner />
      ) : (
        <section>
          {tweets.map((tweet) => (
            <TwitterCard key={tweet.id} tweet={tweet} />
          ))}
        </section>
      )}
    </>
  );
}

export default Tweets;
