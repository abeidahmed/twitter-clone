import React from 'react';
import { useQuery } from 'react-query';
import { useSetTitle } from 'store/page-title';
import * as q from 'shared/query-key';
import { Divider } from 'components/divider';
import TweetBox from 'lib/tweet-box';
import { MobileTweetButton } from 'components/mobile-tweet-button';
import { TwitterCard } from 'components/twitter-card';
import { Spinner } from 'components/spinner';
import { allTweets } from 'api/all-tweets';

function Home() {
  useSetTitle('Home', null);

  const { data, isLoading, isError } = useQuery(q.ALL_TWEETS, allTweets);

  return (
    <main>
      <MobileTweetButton />
      <section className="hidden sm:block">
        <TweetBox />
        <Divider />
      </section>
      <div className="relative">
        {isLoading || isError ? (
          <Spinner />
        ) : (
          <section>
            {data.data.tweets.map((tweet) => (
              <TwitterCard key={tweet.id} tweet={tweet} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default Home;
