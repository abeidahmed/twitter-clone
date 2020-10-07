import React from 'react';
import { useCurrentUser } from 'store/currentUser';
import { useRefetchMutation } from 'hooks/useRefetchMutation';
import * as q from 'shared/queryKey';
import { follow } from 'api/follow';
import { unfollow } from 'api/unfollow';
import { Avatar } from 'components/Avatar';
import { TextButton, FollowButton } from 'components/Button';
import { Badge } from 'components/Badge';
import { CardContainer } from '../shared';
import { UserHoverableCard } from 'components/Card';

function UserCard({ user }) {
  const {
    name,
    twitterHandle,
    avatar,
    bio,
    includes: {
      followStat: { isFollowed },
    },
  } = user;

  return (
    <CardContainer to={`/users/${twitterHandle}`} bordered={true}>
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <Avatar size="md" src={avatar} alt={twitterHandle} />
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between">
            <div>
              <UserHoverableCard
                hoverTo={
                  <TextButton
                    to={`/users/${twitterHandle}`}
                    size="sm"
                    appearance="black"
                    className="relative font-semibold"
                  >
                    {name || 'Twitter user'}
                  </TextButton>
                }
                user={user}
              />
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500">@{twitterHandle}</p>
                {isFollowed && <Badge>Follows you</Badge>}
              </div>
            </div>
            <DynamicFollowBtn user={user} />
          </div>
          <div className="mt-1">
            <p className="text-sm text-gray-700">{bio}</p>
          </div>
        </div>
      </div>
    </CardContainer>
  );
}

function DynamicFollowBtn({ user }) {
  const { currentUser } = useCurrentUser();
  const {
    id,
    includes: {
      followStat: { isFollowing },
    },
  } = user;

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
  ]);

  async function handleUnfollow() {
    await unfollowMutate({
      id,
    });
  }

  if (id === currentUser.id) return null;

  return (
    <div className="relative">
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
