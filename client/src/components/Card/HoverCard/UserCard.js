import React, { useState } from 'react';
import cn from 'classnames';
import { useRefetchMutation } from 'hooks/useRefetchMutation';
import { useCurrentUser } from 'store/currentUser';
import { follow } from 'api/follow';
import { unfollow } from 'api/unfollow';
import * as q from 'shared/query-key';
import { Avatar } from 'components/Avatar';
import { TextButton, FollowButton } from 'components/Button';
import { FollowStat } from 'components/FollowStat';
import { Content } from '../shared';

function UserCard({ hoverTo, user }) {
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
                    to={`/users/${twitterHandle}`}
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
              <DynamicFollowBtn user={user} />
            </div>
            <div className="mt-2">
              <Content body={bio} />
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
    q.ALL_RETWEETS,
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
    q.ALL_RETWEETS,
  ]);

  async function handleUnfollow() {
    await unfollowMutate({
      id,
    });
  }

  if (id === currentUser.id) return null;

  return (
    <div>
      <FollowButton
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

export default UserCard;
