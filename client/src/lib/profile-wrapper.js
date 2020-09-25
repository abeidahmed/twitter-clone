import React from 'react';
import { useMutation, queryCache } from 'react-query';
import { useCurrentUser } from 'store/current-user';
import { useModalType } from 'store/modal';
import { follow } from 'api/follow';
import { unfollow } from 'api/unfollow';
import { Tab } from 'components/tab';
import { FollowStat } from 'components/follow-stat';
import { FollowBtn } from 'components/follow-btn';
import { Avatar } from 'components/avatar';
import { TwitterBanner } from 'components/twitter-banner';
import { UserMeta } from 'components/user-meta';

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
          <TwitterBanner
            src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=967&amp;q=80"
            alt={`${user.twitterHandle}'s twitter banner`}
          />
        </div>
        <div className="flex justify-between">
          <div className="-mt-10 lg:-mt-16">
            <Avatar
              size="xl"
              variant="bordered"
              src={user.avatar}
              alt={`${user.twitterHandle}'s profile`}
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

  const { modalOn } = useModalType();

  function openModal(currentUser) {
    modalOn({
      modalType: 'EDIT_PROFILE',
      modalProps: {
        id: currentUser.id,
        name: currentUser.name,
        bio: currentUser.bio,
        location: currentUser.location,
        website: currentUser.website,
        avatar: currentUser.avatar,
        banner: currentUser.banner,
      },
    });
  }

  if (user.id === currentUser.id) {
    return (
      <button
        onClick={() => openModal(currentUser)}
        className="px-3 py-2 text-sm font-medium leading-5 text-blue-600 transition duration-150 ease-in-out bg-white border border-blue-600 rounded-full focus:outline-none focus:shadow-outline-blue hover:bg-blue-50"
      >
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
      <div className="py-2 space-y-2 sm:space-y-0 sm:flex sm:flex-wrap sm:items-center sm:space-x-3">
        {user.location && <UserMeta icon="location" title={user.location} />}
        {user.website && (
          <UserMeta icon="link" title={user.website} linkTo={user.website} />
        )}
        {user.createdAt && (
          <UserMeta icon="calendar" title="Joined February 2017" />
        )}
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

export default ProfileWrapper;
