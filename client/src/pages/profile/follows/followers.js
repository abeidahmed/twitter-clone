import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import * as q from 'shared/query-key';
import { allFollowers } from 'api/all-followers';
import UserCard from 'components/user-card';
import { Spinner } from 'components/spinner';

function Followers() {
  const { id } = useParams();
  const { data: { data: { users } = {} } = {}, isLoading, isError } = useQuery(
    [q.ALL_FOLLOWERS, { id }],
    allFollowers
  );

  if (isLoading || isError) return <Spinner />;

  return (
    <main>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </main>
  );
}

export default Followers;
