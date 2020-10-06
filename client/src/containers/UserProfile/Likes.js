import React from 'react';
import { useQuery } from 'react-query';
import { useSetTitle } from 'store/page-title';
import { allUserLikedTweets } from 'api/all-tweets';
import * as q from 'shared/query-key';
import { Spinner } from 'components/Loader';
import DisplayTweets from './DisplayTweet';

function Likes({ user }) {
  useSetTitle(user.name, `@${user.twitterHandle}`);
  const { id } = user;

  const { data: { data: { tweets } = {} } = {}, isLoading, isError } = useQuery(
    [q.USER_LIKED_TWEETS, { id }],
    allUserLikedTweets
  );

  return (
    <div className="relative">
      <section>
        {isLoading || isError ? <Spinner /> : <DisplayTweets tweets={tweets} />}
      </section>
    </div>
  );
}

export default Likes;
