import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import * as q from 'shared/query-key';
import { allFollowings } from 'api/all-followings';
import { UserCard } from 'components/Card';
import { Spinner } from 'components/Loader';

function Following() {
  const { id } = useParams();
  const { data: { data: { users } = {} } = {}, isLoading, isError } = useQuery(
    [q.ALL_FOLLOWINGS, { id }],
    allFollowings
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

export default Following;
