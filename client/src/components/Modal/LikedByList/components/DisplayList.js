import React from 'react';
import PropTypes from 'prop-types';
import { UserCard } from 'components/Card';
import { SadFaceNotFound } from 'components/NotFound';

function DisplayList({ users }) {
  if (users.length) {
    return users.map((user) => <UserCard key={user.id} user={user} />);
  }
  return (
    <SadFaceNotFound description="We're sorry, no one has liked the tweet. People who has liked the tweet will show up here." />
  );
}

DisplayList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default DisplayList;
