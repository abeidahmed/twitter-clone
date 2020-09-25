import React from 'react';
import { Icon } from './icon';

export function UserMeta({ title, icon, linkTo }) {
  return (
    <p className="flex items-center text-sm text-gray-500">
      <Icon icon={icon} className="w-5 h-5 text-gray-400" />
      {linkTo ? (
        <a
          href={linkTo}
          target="_blank"
          rel="noopener nofollow external noreferrer"
          className="text-blue-500 hover:underline"
        >
          {linkTo}
        </a>
      ) : (
        <span className="pl-1 leading-5">{title}</span>
      )}
    </p>
  );
}
