import React from 'react';
import { useCurrentUser } from 'store/current-user';
import { Avatar } from 'components/Avatar';
import { FollowStat } from 'components/FollowStat';

function UserInfo() {
  const { currentUser } = useCurrentUser();

  const {
    avatar,
    twitterHandle,
    name,
    includes: { followStat: { followersCount, followingCount } = {} } = {},
  } = currentUser;

  return (
    <div className="px-4">
      <div>
        <Avatar size="md" src={avatar} alt={`${twitterHandle}'s profile`} />
        <div className="mt-2 text-sm">
          <p className="font-semibold">{name}</p>
          <p className="text-gray-500">@{twitterHandle}</p>
        </div>
      </div>
      <div className="mt-4">
        <FollowStat
          follower={followersCount}
          following={followingCount}
          followingTo={`/users/${twitterHandle}/followings`}
          followerTo={`/users/${twitterHandle}/followers`}
        />
      </div>
    </div>
  );
}

export default UserInfo;
