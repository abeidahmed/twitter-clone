import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'components/icon';

export function UserCard({ user }) {
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
        <div className="flex items-center space-x-3">
          <Link to={`/${user.twitterHandle}`} className="hover:underline">
            <p className="text-sm font-semibold">
              {user.name || 'Twitter user'}
            </p>
          </Link>
          <p className="text-sm text-gray-500">@{user.twitterHandle}</p>
        </div>
        <div className="flex items-center mt-1 space-x-3 -ml-0.5">
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
        <div className="mt-3">
          <p className="text-sm text-gray-700">
            {user.bio ||
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, a.'}
          </p>
        </div>
        <div className="mt-2 ml-auto">
          <button className="px-3 py-1 text-sm font-medium leading-5 text-blue-600 transition duration-150 ease-in-out bg-white border border-blue-600 rounded-full focus:outline-none focus:shadow-outline-blue hover:bg-blue-50">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}
