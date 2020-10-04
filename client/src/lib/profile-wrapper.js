import React from 'react';
import { useCurrentUser } from 'store/current-user';
import { useModalType } from 'store/modal';
import { useRefetchMutation } from 'hooks/refetch-mutation';
import { withFullMonth } from 'utils/date-time';
import * as q from 'shared/query-key';
import { follow } from 'api/follow';
import { unfollow } from 'api/unfollow';
import { Tab } from 'components/tab';
import { FollowStat } from 'components/follow-stat';
import { FollowBtn } from 'components/follow-btn';
import { Avatar } from 'components/avatar';
import { TwitterBanner } from 'components/twitter-banner';
import { UserMeta } from 'components/user-meta';
import { Button } from 'components/button';

function ProfileWrapper({ user, children }) {
  const { twitterHandle, avatar } = user;

  const links = [
    {
      title: 'Tweets',
      path: `/users/${twitterHandle}`,
      exact: true,
    },
    {
      title: 'Tweets & replies',
      path: `/users/${twitterHandle}/tweets_replies`,
      exact: true,
    },
    {
      title: 'Media',
      path: `/users/${twitterHandle}/media`,
      exact: true,
    },
    {
      title: 'Likes',
      path: `/users/${twitterHandle}/likes`,
      exact: true,
    },
  ];

  return (
    <main>
      <div className="flex flex-col px-4 border-b border-gray-200">
        <div className="-mx-4">
          <TwitterBanner
            src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=967&amp;q=80"
            alt={`${twitterHandle}'s twitter banner`}
          />
        </div>
        <div className="flex justify-between">
          <div className="-mt-10 lg:-mt-16">
            <Avatar
              size="xl"
              variant="bordered"
              src={avatar}
              alt={`${twitterHandle}'s profile`}
            />
          </div>
          <div className="py-2">
            <DynamicFollowBtn user={user} />
          </div>
        </div>
        <UserDetail user={user} />
        <div className="mt-3 -mx-4">
          <Tab links={links} />
        </div>
      </div>
      {children}
    </main>
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
  ] = useRefetchMutation(follow, [q.SHOW_USER]);

  async function handleFollow() {
    await followMutate({
      id,
    });
  }

  const [
    unfollowMutate,
    { isLoading: unfollowLoading },
  ] = useRefetchMutation(unfollow, [q.SHOW_USER]);

  async function handleUnfollow() {
    await unfollowMutate({
      id,
    });
  }

  const { modalOn, types } = useModalType();

  function openModal(currentUser) {
    modalOn({
      modalType: types.EDIT_PROFILE,
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

  if (id === currentUser.id) {
    return (
      <Button
        size="md"
        color="primary-outline"
        onClick={() => openModal(currentUser)}
      >
        Edit profile
      </Button>
    );
  }
  return (
    <FollowBtn
      isFollowing={isFollowing}
      onFollow={() => handleFollow()}
      onUnfollow={() => handleUnfollow()}
      followLoading={followLoading}
      unfollowLoading={unfollowLoading}
      size="md"
    />
  );
}

function UserDetail({ user }) {
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

export default ProfileWrapper;
