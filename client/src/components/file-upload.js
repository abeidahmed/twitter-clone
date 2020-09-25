import React from 'react';
import { Icon } from './icon';

export function FileUpload({ ...props }) {
  return (
    <label className="p-2 transition duration-150 ease-in-out rounded-full cursor-pointer focus:outline-none focus:shadow-outline-gray hover:bg-gray-600">
      <input type="file" className="hidden" {...props} />
      <Icon className="w-5 h-5 text-white" icon="camera" />
    </label>
  );
}
