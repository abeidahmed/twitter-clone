import React from 'react';
import cn from 'classnames';
import { Icon } from './icon';

export function FileUpload({ size, color, icon, ...props }) {
  const uploadClass = cn([
    'p-2 transition duration-150 ease-in-out rounded-full cursor-pointer focus:outline-none',
    {
      'text-white hover:bg-gray-600 focus:shadow-outline-gray':
        color === 'overlay',
      'text-blue-500 hover:bg-blue-50 focus:shadow-outline-blue':
        color === 'white',
    },
  ]);

  const uploadIconClass = cn([
    'block',
    {
      'w-5 h-5': size === 'sm',
      'w-6 h-6': size === 'md',
    },
  ]);

  return (
    <label className={uploadClass}>
      <input type="file" className="hidden" {...props} />
      <Icon className={uploadIconClass} icon={icon} />
    </label>
  );
}
