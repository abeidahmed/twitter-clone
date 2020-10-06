import React from 'react';
import { useSetTitle } from 'store/page-title';
import DisplayTweets from './DisplayTweet';

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

export default Tweets;
