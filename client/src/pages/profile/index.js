import React from 'react';
import { Switch, Route, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { showUser } from 'api/show-user';
import Likes from './likes';
import Tweets from './tweets';
import ProfileWrapper from 'lib/profile-wrapper';

function Profile() {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(['showUser', { id }], showUser);

  if (isLoading || isError) return null;

  const user = data.data.user;

  return (
    <div>
      <ProfileWrapper user={user}>
        <Switch>
          <Route
            path={`/${id}/likes`}
            render={(props) => <Likes {...props} user={user} />}
          />
          <Route
            path={`/${id}`}
            render={(props) => <Tweets {...props} user={user} />}
          />
        </Switch>
      </ProfileWrapper>
    </div>
  );
}

export default Profile;
