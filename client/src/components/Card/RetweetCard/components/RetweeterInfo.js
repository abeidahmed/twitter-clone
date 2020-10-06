import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrentUser } from 'store/current-user';
import { Icon } from 'components/Icon';
import { UserHoverableCard } from 'components/Card';

function RetweeterInfo({ user }) {
  const { currentUser } = useCurrentUser();
  const { id, name, twitterHandle } = user;

  return (
    <div className="relative inline-flex items-center mb-1 space-x-3 text-xs text-gray-500 ml-7">
      <Icon icon="refresh" className="w-3 h-3" />
      <UserHoverableCard
        hoverTo={
          <Link to={`/users/${twitterHandle}`} className="hover:underline">
            {currentUser.id === id ? 'You Retweeted' : `${name} Retweeted`}
          </Link>
        }
        user={user}
      />
    </div>
  );
}

export default RetweeterInfo;
