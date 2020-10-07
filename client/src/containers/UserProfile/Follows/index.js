import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSetTitle } from 'store/pageTitle';
import Followers from './Followers';
import Following from './Following';
import { Tab } from 'components/Tab';

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
      <div className="border-b border-gray-200">
        <Tab links={links} />
      </div>
      <Switch>
        <Route path="/users/:id/followers" component={Followers} />
        <Route path="/users/:id/followings" component={Following} />
      </Switch>
    </div>
  );
}

export default Follows;
