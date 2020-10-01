import React from 'react';
import { useSetTitle } from 'store/page-title';
import * as a from 'shared/user-defaults';
import { TwitterCard } from 'components/twitter-card';

function Tweets({ user }) {
  useSetTitle(user.name || a.DEFAULT_NAME, `@${user.twitterHandle}`);
  const { tweets } = user;

  return (
    <div className="relative">
      <section>
        {tweets.map((tweet) => (
          <TwitterCard key={tweet.id} tweet={tweet} user={user} />
        ))}
      </section>
    </div>
  );
}

export default Tweets;
