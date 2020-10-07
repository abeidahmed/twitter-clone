import React from 'react';
import PropTypes from 'prop-types';
import { withFullMonth } from 'utils/date-time';
import UserMeta from './UserMeta';
import { FollowStat } from 'components/FollowStat';

function UserInfo({ user }) {
  const {
    name,
    twitterHandle,
    bio,
    location,
    website,
    createdAt,
    includes: {
      followStat: { followersCount, followingCount },
    },
  } = user;

  return (
    <div className="mt-1">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-sm leading-5 text-gray-600">@{twitterHandle}</p>
      <p className="mt-2 text-gray-600">{bio}</p>
      <div className="py-2 space-y-2 sm:space-y-0 sm:flex sm:flex-wrap sm:items-center sm:space-x-3">
        {location && <UserMeta icon="location" title={location} />}
        {website && <UserMeta icon="link" title={website} linkTo={website} />}
        <UserMeta
          icon="calendar"
          title={`Joined ${withFullMonth(createdAt)}`}
        />
      </div>
      <FollowStat
        follower={followersCount}
        following={followingCount}
        followingTo={`/users/${twitterHandle}/followings`}
        followerTo={`/users/${twitterHandle}/followers`}
      />
    </div>
  );
}

UserInfo.propTypes = {
  user: PropTypes.object,
};

export default UserInfo;
