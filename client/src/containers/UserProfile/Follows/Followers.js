import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import * as q from 'shared/queryKey';
import { allFollowers } from 'api/all-followers';
import { UserCard } from 'components/Card';
import { Spinner } from 'components/Loader';

function Followers() {
  const { id } = useParams();
  const { data: { data: { users } = {} } = {}, isLoading, isError } = useQuery(
    [q.ALL_FOLLOWERS, { id }],
    allFollowers
  );

  return (
    <main className="relative">
      {isLoading || isError ? (
        <Spinner />
      ) : (
        users.map((user) => <UserCard key={user.id} user={user} />)
      )}
    </main>
  );
}

export default Followers;
