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

function UserCard({ user }) {
  const { currentUser } = useCurrentUser();

  return (
    <CardContainer to={`/${user.twitterHandle}`}>
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <Avatar size="md" src={user.avatar} alt={user.twitterHandle} />
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between">
            <div>
              <TextButton
                to={`/${user.twitterHandle}`}
                size="sm"
                color="black"
                className="relative font-semibold"
              >
                {user.name || 'Twitter user'}
              </TextButton>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500">@{user.twitterHandle}</p>
                {user.isFollowed && <Badge>Follows you</Badge>}
              </div>
            </div>
            <DynamicFollowBtn user={user} currentUser={currentUser} />
          </div>
          <div className="mt-1">
            <p className="text-sm text-gray-700">
              {user.bio ||
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, a.'}
            </p>
          </div>
        </div>
      </div>
    </CardContainer>
  );
}

function DynamicFollowBtn({ user, currentUser }) {
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

  async function handleFollow(id) {
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

  async function handleUnfollow(id) {
    await unfollowMutate({
      id,
    });
  }

  if (user.id === currentUser.id) return null;

  return (
    <div>
      <FollowBtn
        isFollowing={user.isFollowing}
        onFollow={() => handleFollow(user.id)}
        onUnfollow={() => handleUnfollow(user.id)}
        followLoading={followLoading}
        unfollowLoading={unfollowLoading}
        size="sm"
      />
    </div>
  );
}

export default UserCard;
