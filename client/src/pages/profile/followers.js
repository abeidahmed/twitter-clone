import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { connect } from 'react-redux';
import { allFollowers } from 'api/all-followers';
import { updateHeader } from 'actions/update-header';
import { useSetTitle } from 'hooks/set-title';
import UserCard from 'components/user-card';
import { Spinner } from 'components/spinner';

function Followers({ user, updateHeader }) {
  useSetTitle({
    title: user.name,
    description: `@${user.twitterHandle}`,
    func: updateHeader,
  });

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

function mapDispatchToProps(dispatch) {
  return {
    updateHeader: (payload) => dispatch(updateHeader(payload)),
  };
}

export default connect(null, mapDispatchToProps)(Followers);
