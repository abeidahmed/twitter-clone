import React from 'react';
import cn from 'classnames';
import { Icon } from 'components/Icon';

function ShareButton({ size = 'sm', ...props }) {
  const iconClass = cn([
    'rounded-full',
    {
      'w-5 h-5': size === 'sm',
      'w-6 h-6': size === 'md',
    },
  ]);

  return (
    <button
      className="relative inline-flex items-center text-sm text-gray-500 group focus:outline-none hover:text-teal-500 focus:text-teal-500"
      {...props}
    >
      <i className="p-2 rounded-full group-hover:bg-teal-50 group-focus:bg-teal-50">
        <Icon icon="upload" className={iconClass} />
      </i>
    </button>
  );
}

export default ShareButton;
