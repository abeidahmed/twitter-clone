import React from 'react';
import { useQuery } from 'react-query';
import { allRetweets } from 'api/all-retweets';
import * as q from 'shared/queryKey';
import { RetweetCard } from 'components/Card';
import { Spinner } from 'components/Loader';

function Retweets() {
  const {
    data: { data: { retweets } = {} } = {},
    isLoading,
    isError,
  } = useQuery(q.ALL_RETWEETS, allRetweets);

  return (
    <>
      {isLoading || isError ? (
        <Spinner />
      ) : (
        <section>
          {retweets.map((tweet) => (
            <RetweetCard key={tweet.id} tweet={tweet} />
          ))}
        </section>
      )}
    </>
  );
}

export default Retweets;
