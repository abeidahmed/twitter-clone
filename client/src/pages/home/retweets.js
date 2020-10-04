import React from 'react';
import { useQuery } from 'react-query';
import { allRetweets } from 'api/all-retweets';
import { RetweetCollection } from 'components/retweet-card';
import { Spinner } from 'components/spinner';

function Retweets() {
  const {
    data: { data: { retweets } = {} } = {},
    isLoading,
    isError,
  } = useQuery('allRetweets', allRetweets);

  return (
    <>
      {isLoading || isError ? (
        <Spinner />
      ) : (
        <section>
          {retweets.map((tweet) => (
            <RetweetCollection key={tweet.id} tweet={tweet} />
          ))}
        </section>
      )}
    </>
  );
}

export default Retweets;
