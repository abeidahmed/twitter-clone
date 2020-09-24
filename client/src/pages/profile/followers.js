import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { allFollowers } from 'api/all-followers';
import { useSetTitle } from 'store/page-title';
import UserCard from 'components/user-card';
import { Spinner } from 'components/spinner';

function Followers({ user }) {
  useSetTitle(user.name, `@${user.twitterHandle}`);

  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(
    ['fetchFollowers', { id }],
    allFollowers
  );

  if (isLoading || isError) return <Spinner />;

  const users = data.data.users;

  return (
    <main>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </main>
  );
}

export default Followers;
