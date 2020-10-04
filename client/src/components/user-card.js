import React from 'react';
import { useCurrentUser } from 'store/current-user';
import { useRefetchMutation } from 'hooks/refetch-mutation';
import * as q from 'shared/query-key';
import { follow } from 'api/follow';
import { unfollow } from 'api/unfollow';
import { FollowBtn } from 'components/follow-btn';
import { Avatar } from './avatar';
import { TextButton } from './button';
import { Badge } from './badge';
import { CardContainer } from './container';
import { UserHoverableCard } from './user-hoverable-card';

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
    <CardContainer to={`/${twitterHandle}`} bordered={true}>
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <Avatar size="md" src={avatar} alt={twitterHandle} />
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between">
            <div className="flex-1">
              <UserHoverableCard
                hoverTo={
                  <TextButton
                    to={`/${twitterHandle}`}
                    size="sm"
                    color="black"
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
            <p className="text-sm text-gray-700">
              {bio || 'This user is too busy!'}
            </p>
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

export default UserCard;
