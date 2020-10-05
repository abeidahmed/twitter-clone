import React from 'react';
import cn from 'classnames';
import { handleLinkWrapping } from './utils';
import { Icon } from 'components/Icon';

function StyledTwitterActionButton({
  size = 'sm',
  appearance,
  icon,
  className,
  children,
  ...props
}) {
  const buttonClass = cn([
    'inline-flex items-center text-gray-500 text-sm group focus:outline-none',
    {
      'hover:text-blue-500 focus:text-blue-500': appearance === 'blue',
      'hover:text-red-500 focus:text-red-500': appearance === 'red',
      'hover:text-green-500 focus:text-green-500': appearance === 'green',
      'hover:text-teal-500 focus:text-teal-500': appearance === 'teal',
    },
  ]);

  const iconWrapperClass = cn([
    'p-2 rounded-full',
    {
      'group-hover:bg-blue-50 group-focus:bg-blue-50': appearance === 'blue',
      'group-hover:bg-red-50 group-focus:bg-red-50': appearance === 'red',
      'group-hover:bg-green-50 group-focus:bg-green-50': appearance === 'green',
      'group-hover:bg-teal-50 group-focus:bg-teal-50': appearance === 'teal',
    },
  ]);

  const iconClass = cn([
    'rounded-full',
    {
      'w-5 h-5': size === 'sm',
      'w-6 h-6': size === 'md',
    },
  ]);

  return (
    <button className={`${buttonClass} ${className}`} {...props}>
      <i className={iconWrapperClass}>
        <Icon icon={icon} className={iconClass} />
      </i>
      <span>{children}</span>
    </button>
  );
}

export const TwitterActionButton = (props) =>
  handleLinkWrapping(StyledTwitterActionButton, props);
