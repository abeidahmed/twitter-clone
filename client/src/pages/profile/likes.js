import React from 'react';
import { useQuery } from 'react-query';
import { useSetTitle } from 'store/page-title';
import { allUserLikedTweets } from 'api/all-tweets';
import * as a from 'shared/user-defaults';
import * as q from 'shared/query-key';
import { TwitterCard } from 'components/twitter-card';
import { Spinner } from 'components/spinner';
import ObjectNotFound from 'shared/not-found/object-not-found';

function Likes({ user }) {
  useSetTitle(user.name || a.DEFAULT_NAME, `@${user.twitterHandle}`);
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

function DisplayTweets({ tweets }) {
  return (
    <>
      {tweets.length ? (
        tweets.map((tweet) => (
          <TwitterCard key={tweet.id} tweet={tweet} user={tweet.user} />
        ))
      ) : (
        <ObjectNotFound description="You have not liked any tweets. The tweets that you like will show up here." />
      )}
    </>
  );
}

export default Likes;
