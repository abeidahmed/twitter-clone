import React from 'react';
import { useMutation, queryCache } from 'react-query';
import { useCurrentUser } from 'store/current-user';
import { follow } from 'api/follow';
import { unfollow } from 'api/unfollow';
import { Icon } from 'components/icon';
import { Tab } from 'components/tab';
import { FollowStat } from 'components/follow-stat';
import { FollowBtn } from 'components/follow-btn';

function ProfileWrapper({ user, children }) {
  const { user: currentUser } = useCurrentUser();

  const links = [
    {
      title: 'Tweets',
      path: `/${user.twitterHandle}`,
    },
    {
      title: 'Tweets & replies',
      path: '/',
    },
    {
      title: 'Media',
      path: '/',
    },
    {
      title: 'Likes',
      path: `/${user.twitterHandle}/likes`,
    },
  ];

  return (
    <main>
      <div className="flex flex-col px-4 border-b border-gray-200">
        <div className="-mx-4">
          <img
            className="flex-shrink-0 object-cover w-full h-48"
            src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=967&amp;q=80"
            alt=""
          />
        </div>
        <div className="flex justify-between">
          <div className="-mt-10 lg:-mt-16">
            <img
              className="w-20 h-20 border-4 border-white rounded-full lg:w-32 lg:h-32"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80"
              alt=""
            />
          </div>
          <div className="py-2">
            <DynamicFollowBtn user={user} currentUser={currentUser} />
          </div>
        </div>
        <UserDetail user={user} />
        <div className="-mx-4">
          <Tab links={links} />
        </div>
      </div>
      <div className="px-4">{children}</div>
    </main>
  );
}

export default ProfileWrapper;

function DynamicFollowBtn({ user, currentUser }) {
  const [followMutate, { isLoading: followLoading }] = useMutation(follow, {
    onSuccess() {
      queryCache.refetchQueries('showUser');
    },
  });

  async function handleFollow(id) {
    await followMutate({
      id,
    });
  }

  const [unfollowMutate, { isLoading: unfollowLoading }] = useMutation(
    unfollow,
    {
      onSuccess() {
        queryCache.refetchQueries('showUser');
      },
    }
  );

  async function handleUnfollow(id) {
    await unfollowMutate({
      id,
    });
  }

  if (user.id === currentUser.id) {
    return (
      <button className="px-3 py-2 text-sm font-medium leading-5 text-blue-600 transition duration-150 ease-in-out bg-white border border-blue-600 rounded-full focus:outline-none focus:shadow-outline-blue hover:bg-blue-50">
        Edit profile
      </button>
    );
  }
  return (
    <FollowBtn
      isFollowing={user.isFollowing}
      onFollow={() => handleFollow(user.id)}
      onUnfollow={() => handleUnfollow(user.id)}
      followLoading={followLoading}
      unfollowLoading={unfollowLoading}
      size="md"
    />
  );
}

function UserDetail({ user }) {
  return (
    <div className="mt-1">
      <h2 className="text-lg font-semibold">{user.name || 'Twitter user'}</h2>
      <p className="text-sm leading-5 text-gray-600">@{user.twitterHandle}</p>
      <p className="mt-2 text-gray-600">
        {user.bio || 'The user is too busy!'}
      </p>
      <div className="flex items-center py-2 space-x-3">
        <p className="flex items-center text-sm text-gray-500">
          <Icon icon="location" className="w-5 h-5 text-gray-400" />
          <span className="pl-1 leading-5">
            {user.location || 'Around the world'}
          </span>
        </p>
        <p className="flex items-center text-sm text-gray-500">
          <Icon icon="calendar" className="w-5 h-5 text-gray-400" />
          <span className="pl-1 leading-5">Joined February 2017</span>
        </p>
      </div>
      <FollowStat
        follower={user.followersCount}
        following={user.followingCount}
        followingTo={`/${user.twitterHandle}/followings`}
        followerTo={`/${user.twitterHandle}/followers`}
      />
    </div>
  );
}
