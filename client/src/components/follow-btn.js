import React, { useState } from 'react';
import cn from 'classnames';

export function FollowBtn({
  isFollowing,
  onUnfollow,
  onFollow,
  unfollowLoading,
  followLoading,
  size,
}) {
  const followBtnClass = cn([
    'relative font-semibold leading-5 text-blue-600 bg-white border border-blue-600 rounded-full focus:outline-none focus:shadow-outline-blue hover:bg-blue-50',
    {
      'px-3 py-1 text-sm': size === 'sm',
      'px-4 py-2 text-base': size === 'md',
    },
  ]);

  const unfollowBtnClass = cn([
    'relative font-semibold leading-5 text-white bg-blue-600 border border-blue-600 rounded-full focus:outline-none focus:shadow-outline-blue hover:bg-pink-600 hover:border-pink-600',
    {
      'px-3 py-1 text-sm': size === 'sm',
      'px-4 py-2 text-base': size === 'md',
    },
  ]);

  const [following, setFollowing] = useState('Following');

  return (
    <>
      {isFollowing ? (
        <button
          disabled={unfollowLoading}
          onMouseEnter={() => setFollowing('Unfollow')}
          onMouseLeave={() => setFollowing('Following')}
          onClick={onUnfollow}
          className={unfollowBtnClass}
        >
          {following}
        </button>
      ) : (
        <button
          disabled={followLoading}
          onClick={onFollow}
          className={followBtnClass}
        >
          Follow
        </button>
      )}
    </>
  );
}
