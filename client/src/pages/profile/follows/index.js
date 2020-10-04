import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSetTitle } from 'store/page-title';
import Followers from './followers';
import Following from './following';
import { Tab } from 'components/tab';

function Follows({ user }) {
  useSetTitle(user.name, `@${user.twitterHandle}`);

  const links = [
    {
      title: 'Followers',
      path: `/users/${user.twitterHandle}/followers`,
      exact: true,
    },
    {
      title: 'Followings',
      path: `/users/${user.twitterHandle}/followings`,
      exact: true,
    },
  ];

  return (
    <div>
      <Tab links={links} />
      <Switch>
        <Route path="/users/:id/followers" component={Followers} />
        <Route path="/users/:id/followings" component={Following} />
      </Switch>
    </div>
  );
}

export default Follows;
