import React from 'react';
import cn from 'classnames';
import { Icon } from './icon';

export function CommentButton({ tweet, showCount, count, size, ...props }) {
  const iconClass = cn([
    'rounded-full',
    {
      'w-5 h-5': size === 'sm',
      'w-6 h-6': size === 'md',
    },
  ]);

  return (
    <button
      className="relative inline-flex items-center text-sm text-gray-500 group focus:outline-none hover:text-blue-500 focus:text-blue-500"
      {...props}
    >
      <i className="p-2 rounded-full group-hover:bg-blue-50 group-focus:bg-blue-50">
        <Icon icon="chat" className={iconClass} />
      </i>
      {showCount && <span className="leading-5">{count}</span>}
    </button>
  );
}
