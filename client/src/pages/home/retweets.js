import React from 'react';
import { useQuery } from 'react-query';
import { allRetweets } from 'api/all-retweets';
import * as q from 'shared/query-key';
import { RetweetCollection } from 'components/retweet-card';
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
            <RetweetCollection key={tweet.id} tweet={tweet} />
          ))}
        </section>
      )}
    </>
  );
}

export default Retweets;
