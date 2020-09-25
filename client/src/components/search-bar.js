import React from 'react';
import { Icon } from './icon';

export function SearchBar({ ...props }) {
  return (
    <div className="relative flex items-center text-gray-400 focus-within:text-blue-500">
      <input
        type="text"
        className="block w-full py-2 pl-10 pr-3 text-gray-900 transition duration-150 ease-in-out bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:bg-white focus:border-blue-500 focus:shadow-sm"
        {...props}
      />
      <div className="absolute left-0 pl-3 pointer-events-none">
        <Icon icon="search" className="w-5 h-5" />
      </div>
    </div>
  );
}
