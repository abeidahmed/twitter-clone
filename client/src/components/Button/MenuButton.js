import React from 'react';
import cn from 'classnames';
import { handleLinkWrapping } from './utils';
import { Icon } from 'components/Icon';

function StyledMenuButton({
  size = 'md',
  appearance,
  intent = 'default',
  variant,
  icon,
  className,
  children,
  ...props
}) {
  const buttonClass = cn([
    'whitespace-no-wrap inline-flex items-center transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue',
    {
      'px-3 py-2 text-sm': size === 'md',
      'text-gray-800 hover:bg-blue-50': intent === 'default',
      'text-red-600 hover:bg-blue-50': appearance === 'danger',
      'text-left w-full': variant === 'menu',
    },
  ]);

  const iconClass = cn([
    'w-5 h-5',
    {
      'text-gray-500': intent === 'default',
      'text-red-500': appearance === 'danger',
    },
  ]);

  const textClass = cn([
    'leading-5',
    {
      'pl-2': icon,
    },
  ]);

  return (
    <button className={`${buttonClass} ${className}`} {...props}>
      {icon && <Icon icon={icon} className={iconClass} />}
      <span className={textClass}>{children}</span>
    </button>
  );
}

export const MenuButton = (props) =>
  handleLinkWrapping(StyledMenuButton, props);
