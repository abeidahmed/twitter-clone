import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { connect } from 'react-redux';
import { allFollowings } from 'api/all-followings';
import { updateHeader } from 'actions/update-header';
import { useSetTitle } from 'hooks/set-title';
import UserCard from 'components/user-card';

function Following({ user, updateHeader }) {
  useSetTitle({
    title: user.name,
    description: `@${user.twitterHandle}`,
    func: updateHeader,
  });

  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(
    ['fetchFollowings', { id }],
    allFollowings
  );

  if (isLoading || isError) return null;

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

export default connect(null, mapDispatchToProps)(Following);
