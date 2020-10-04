import React from 'react';
import { useQuery } from 'react-query';
import { useSetTitle } from 'store/page-title';
import { allUserMediaTweets } from 'api/all-tweets';
import * as q from 'shared/query-key';
import { TwitterCard } from 'components/twitter-card';
import { Spinner } from 'components/spinner';
import ObjectNotFound from 'shared/not-found/object-not-found';

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

function DisplayTweets({ tweets, user }) {
  return (
    <>
      {tweets.length ? (
        tweets.map((tweet) => (
          <TwitterCard key={tweet.id} tweet={tweet} user={user} />
        ))
      ) : (
        <ObjectNotFound description="Tweets that you have tweeted with an image will show up here." />
      )}
    </>
  );
}

export default Media;
