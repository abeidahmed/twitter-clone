import React from 'react';
import { Link } from 'react-router-dom';
import { pluralize } from 'utils/helpers';

export function FollowStat({ follower, following, followerTo, followingTo }) {
  return (
    <div className="flex items-center space-x-4 text-sm">
      <Link to={followingTo} className="font-bold hover:underline">
        {following}{' '}
        <span className="font-normal text-gray-500 pl-0.5">Following</span>
      </Link>
      <Link to={followerTo} className="font-bold hover:underline">
        {follower}{' '}
        <span className="font-normal text-gray-500 pl-0.5">
          {pluralize(parseInt(follower), 'Follower')}
        </span>
      </Link>
    </div>
  );
}
