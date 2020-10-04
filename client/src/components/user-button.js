import React from 'react';
import { Avatar } from './avatar';
import { Icon } from './icon';

export function UserButton({ user, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center w-full transition duration-150 ease-in-out rounded-full lg:p-2 hover:bg-blue-50 focus:outline-none focus:shadow-outline-blue"
    >
      <Avatar
        size="md"
        src={user.avatar}
        alt={`${user.twitterHandle}'s profile`}
      />
      <span className="items-center justify-between flex-1 hidden text-left lg:pl-3 lg:flex">
        <span className="text-sm lg:pr-2">
          <p className="font-semibold leading-5">{user.name}</p>
          <p className="leading-5 text-gray-500">@{user.twitterHandle}</p>
        </span>
        <Icon icon="chevron-down" className="w-5 h-5 -mr-1 text-gray-500" />
      </span>
    </button>
  );
}
