import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useMutation, queryCache } from 'react-query';
import { follow } from 'api/follow';
import { unfollow } from 'api/unfollow';

function UserCard({ user, currentUser }) {
  return (
    <div className="flex w-full px-4 py-5 space-x-3 transition duration-150 ease-in-out border-t border-gray-200 last:border-b hover:bg-gray-50">
      <div>
        <img
          className="flex-shrink-0 w-12 h-12 rounded-full"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80"
          alt=""
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex justify-between">
          <div>
            <Link to={`/${user.twitterHandle}`} className="hover:underline">
              <p className="text-sm font-semibold">
                {user.name || 'Twitter user'}
              </p>
            </Link>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-500">@{user.twitterHandle}</p>
              {user.isFollowed && (
                <span className="px-1 text-xs leading-5 text-gray-500 bg-gray-200 rounded">
                  Follows you
                </span>
              )}
            </div>
          </div>
          <FollowBtn user={user} currentUser={currentUser} />
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

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.user.id,
  };
}

export default connect(mapStateToProps, null)(UserCard);

function FollowBtn({ user, currentUser }) {
  const [followMutate, { isLoading: followLoading }] = useMutation(follow, {
    onSuccess() {
      queryCache.refetchQueries('allUsers');
      queryCache.refetchQueries('fetchFollowings');
      queryCache.refetchQueries('fetchFollowers');
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
        queryCache.refetchQueries('allUsers');
        queryCache.refetchQueries('fetchFollowings');
        queryCache.refetchQueries('fetchFollowers');
      },
    }
  );

  async function handleUnfollow(id) {
    await unfollowMutate({
      id,
    });
  }

  const [following, setFollowing] = useState('Following');

  if (user.id === currentUser) return null;

  return (
    <div>
      {user.isFollowing ? (
        <button
          disabled={unfollowLoading}
          onMouseEnter={() => setFollowing('Unfollow')}
          onMouseLeave={() => setFollowing('Following')}
          onClick={() => handleUnfollow(user.id)}
          className="px-3 py-1 text-sm font-semibold leading-5 text-white transition duration-150 ease-in-out bg-blue-600 border border-blue-600 rounded-full focus:outline-none focus:shadow-outline-blue hover:bg-pink-600 hover:border-pink-600"
        >
          {following}
        </button>
      ) : (
        <button
          disabled={followLoading}
          onClick={() => handleFollow(user.id)}
          className="px-3 py-1 text-sm font-semibold leading-5 text-blue-600 transition duration-150 ease-in-out bg-white border border-blue-600 rounded-full focus:outline-none focus:shadow-outline-blue hover:bg-blue-50"
        >
          Follow
        </button>
      )}
    </div>
  );
}
