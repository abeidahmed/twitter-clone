import React from 'react';
import cn from 'classnames';
import { Icon } from './icon';

export function LikeButton({ status, size, showCount, ...props }) {
  const { isLiked, totalLikes } = status;

  const iconClass = cn([
    'rounded-full',
    {
      'w-5 h-5': size === 'sm',
      'w-6 h-6': size === 'md',
      'text-red-500': isLiked,
    },
  ]);

  const countTextClass = cn([
    'leading-5',
    {
      'text-red-500': isLiked,
    },
  ]);

  return (
    <button
      className="relative inline-flex items-center text-sm text-gray-500 group focus:outline-none hover:text-red-500 focus:text-red-500"
      {...props}
    >
      <i className="p-2 rounded-full group-hover:bg-red-50 group-focus:bg-red-50">
        {isLiked ? (
          <Icon
            icon="heart-solid"
            stroke="none"
            fill="currentColor"
            viewBox="0 0 20 20"
            className={iconClass}
          />
        ) : (
          <Icon icon="heart" className={iconClass} />
        )}
      </i>
      {showCount && <span className={countTextClass}>{totalLikes}</span>}
    </button>
  );
}
