import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { pluralize } from 'utils/helpers';

function FollowStat({ follower, following, followerTo, followingTo }) {
  return (
    <div className="flex items-center space-x-4 text-sm">
      <Link
        to={followingTo}
        className="font-bold text-gray-900 hover:underline"
      >
        {following}{' '}
        <span className="font-normal text-gray-500 pl-0.5">Following</span>
      </Link>
      <Link to={followerTo} className="font-bold text-gray-900 hover:underline">
        {follower}{' '}
        <span className="font-normal text-gray-500 pl-0.5">
          {pluralize(parseInt(follower), 'Follower')}
        </span>
      </Link>
    </div>
  );
}

FollowStat.propTypes = {
  follower: PropTypes.number,
  following: PropTypes.number,
  followerTo: PropTypes.string,
  followingTo: PropTypes.string,
};

export default FollowStat;
