import React from 'react';
import { Switch, Route, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import * as q from 'shared/query-key';
import { showUser } from 'api/show-user';
import Likes from './likes';
import Media from './media';
import Replies from './replies';
import Tweets from './tweets';
import Follows from './follows';
import ProfileWrapper from 'lib/profile-wrapper';
import { Spinner } from 'components/Loader';

function Profile() {
  const { id } = useParams();
  const { data: { data: { user } = {} } = {}, isLoading, isError } = useQuery(
    [q.SHOW_USER, { id }],
    showUser
  );

  if (isLoading || isError) return <Spinner />;

  return (
    <div>
      <Switch>
        <Route
          path="/users/:id/(follow[ers|ings]\w+)"
          render={(props) => <Follows {...props} user={user} />}
        />
        <ProfileWrapper user={user}>
          <Route
            exact
            path={`/users/${id}/likes`}
            render={(props) => <Likes {...props} user={user} />}
          />
          <Route
            exact
            path={`/users/${id}/media`}
            render={(props) => <Media {...props} user={user} />}
          />
          <Route
            exact
            path={`/users/${id}/tweets_replies`}
            render={(props) => <Replies {...props} user={user} />}
          />
          <Route
            exact
            path={`/users/${id}`}
            render={(props) => <Tweets {...props} user={user} />}
          />
        </ProfileWrapper>
      </Switch>
    </div>
  );
}

export default Profile;
