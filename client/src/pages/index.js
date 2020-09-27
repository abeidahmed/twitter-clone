import React from 'react';
import { useSetTitle } from 'store/page-title';
import { Divider } from 'components/divider';
import TweetBox from 'lib/tweet-box';
import { MobileTweetButton } from 'components/mobile-tweet-button';
import { TwitterCard } from 'components/twitter-card';

function Home() {
  useSetTitle('Home', null);

  return (
    <main>
      <MobileTweetButton />
      <section className="hidden sm:block">
        <TweetBox />
        <Divider />
      </section>
      <section>
        <TwitterCard />
      </section>
    </main>
  );
}

export default Home;
