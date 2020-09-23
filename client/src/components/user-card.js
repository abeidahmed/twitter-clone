import React from 'react';
import { Link } from 'react-router-dom';

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
        <div className="flex">
          <div>
            <Link to={`/${user.twitterHandle}`} className="hover:underline">
              <p className="text-sm font-semibold">
                {user.name || 'Twitter user'}
              </p>
            </Link>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-500">@{user.twitterHandle}</p>
              <span className="px-1 text-xs leading-5 text-gray-500 bg-gray-200 rounded">
                Follows you
              </span>
            </div>
          </div>
          <div className="ml-auto">
            <button className="px-3 py-1 text-sm font-semibold leading-5 text-blue-600 transition duration-150 ease-in-out bg-white border border-blue-600 rounded-full focus:outline-none focus:shadow-outline-blue hover:bg-blue-50">
              Follow
            </button>
          </div>
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
