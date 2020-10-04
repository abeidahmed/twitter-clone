import React, { useState } from 'react';
import cn from 'classnames';
import { useRefetchMutation } from 'hooks/refetch-mutation';
import { useCurrentUser } from 'store/current-user';
import { follow } from 'api/follow';
import { unfollow } from 'api/unfollow';
import * as q from 'shared/query-key';
import { Avatar } from './avatar';
import { TextButton } from './button';
import { FollowStat } from './follow-stat';
import { FollowBtn } from './follow-btn';

export function UserHoverableCard({ hoverTo, user }) {
  const [isActive, setIsActive] = useState(false);

  const {
    avatar,
    bio,
    twitterHandle,
    includes: { followStat: { followersCount, followingCount } = {} } = {},
    name,
  } = user;

  const wrapperClass = cn([
    'absolute pt-1 top-full',
    {
      hidden: !isActive,
      block: isActive,
    },
  ]);

  return (
    <div
      className="relative flex-shrink-0"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {hoverTo}
      <div className={wrapperClass}>
        <div className="relative z-10 p-4 bg-white rounded-lg w-72 shadow-custom">
          <section>
            <div className="flex justify-between">
              <div>
                <Avatar size="lg" src={avatar} alt={twitterHandle} />
                <div className="mt-1">
                  <TextButton
                    to={`/${twitterHandle}`}
                    color="black"
                    size="sm"
                    className="relative font-bold"
                  >
                    {name}
                  </TextButton>
                  <span className="block text-sm leading-5 text-gray-500">
                    @{twitterHandle}
                  </span>
                </div>
              </div>
              <div>
                <DynamicFollowBtn user={user} />
              </div>
            </div>
            <div className="mt-2">
              <p className="text-gray-600">{bio}</p>
              <div className="mt-2">
                <FollowStat
                  follower={followersCount}
                  following={followingCount}
                  followerTo={`/users/${twitterHandle}/followers`}
                  followingTo={`/users/${twitterHandle}/followings`}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function DynamicFollowBtn({ user }) {
  const { currentUser } = useCurrentUser();
  const { id, includes: { followStat: { isFollowing } } = {} } = user;

  const [
    followMutate,
    { isLoading: followLoading },
  ] = useRefetchMutation(follow, [
    q.ALL_USERS,
    q.ALL_FOLLOWINGS,
    q.ALL_FOLLOWERS,
    q.SHOW_USER,
    q.ALL_TWEET_LIKERS,
  ]);

  async function handleFollow() {
    await followMutate({
      id,
    });
  }

  const [
    unfollowMutate,
    { isLoading: unfollowLoading },
  ] = useRefetchMutation(unfollow, [
    q.ALL_USERS,
    q.ALL_FOLLOWINGS,
    q.ALL_FOLLOWERS,
    q.SHOW_USER,
    q.ALL_TWEET_LIKERS,
    q.ALL_TWEETS,
  ]);

  async function handleUnfollow() {
    await unfollowMutate({
      id,
    });
  }

  if (id === currentUser.id) return null;

  return (
    <div>
      <FollowBtn
        isFollowing={isFollowing}
        onFollow={() => handleFollow()}
        onUnfollow={() => handleUnfollow()}
        followLoading={followLoading}
        unfollowLoading={unfollowLoading}
        size="sm"
      />
    </div>
  );
}
