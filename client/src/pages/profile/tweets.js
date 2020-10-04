import React from 'react';
import { useSetTitle } from 'store/page-title';
import { TwitterCard } from 'components/twitter-card';
import ObjectNotFound from 'shared/not-found/object-not-found';

function Tweets({ user }) {
  useSetTitle(user.name, `@${user.twitterHandle}`);
  const { tweets } = user;

  return (
    <div className="relative">
      <section>
        <DisplayTweets tweets={tweets} user={user} />
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
        <ObjectNotFound description="You do not have any tweets. Try tweeting about what's happening." />
      )}
    </>
  );
}

export default Tweets;
