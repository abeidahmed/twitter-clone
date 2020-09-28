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

function UserCard({ user }) {
  const { currentUser } = useCurrentUser();

  return (
    <div className="flex w-full px-4 py-5 space-x-3 transition duration-150 ease-in-out border-t border-gray-200 last:border-b hover:bg-gray-50">
      <div>
        <Avatar
          size="lg"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80"
          alt=""
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex justify-between">
          <div>
            <TextButton
              to={`/${user.twitterHandle}`}
              size="sm"
              color="black"
              className="font-semibold"
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
