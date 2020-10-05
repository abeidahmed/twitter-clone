import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSetTitle } from 'store/page-title';
import Retweets from './retweets';
import Tweets from './tweets';
import { Divider } from 'components/Divider';
import TweetBox from 'lib/tweet-box';
import { MobileTweetButton } from 'components/mobile-tweet-button';
import { Tab } from 'components/Tab';

const links = [
  {
    title: 'Tweets',
    path: '/',
    exact: true,
  },
  {
    title: 'Retweets',
    path: '/retweets',
    exact: true,
  },
];

function Home() {
  useSetTitle('Home', null);

  return (
    <main>
      <MobileTweetButton />
      <section className="hidden sm:block">
        <TweetBox />
        <Divider />
      </section>
      <div className="border-b border-gray-200">
        <Tab links={links} />
      </div>
      <div className="relative">
        <Switch>
          <Route path="/retweets" component={Retweets} />
          <Route path="/" component={Tweets} />
        </Switch>
      </div>
    </main>
  );
}

export default Home;
