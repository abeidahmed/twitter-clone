import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { handleLinkWrapping } from './utils';

function StyledButton({
  size = 'md',
  appearance,
  width,
  className,
  children,
  ...props
}) {
  const buttonClass = cn([
    'font-semibold transition duration-150 ease-in-out rounded-full border focus:outline-none focus:shadow-outline-blue',
    {
      'px-3 py-1 text-sm leading-5': size === 'sm',
      'px-4 py-2 text-sm leading-5': size === 'md',
      'px-4 py-3 text-base leading-6': size === 'lg',
      'w-full': width === 'full',
      'bg-blue-500 text-white border-blue-500 focus:shadow-outline-blue hover:bg-blue-600 hover:border-blue-600':
        appearance === 'primary',
      'bg-pink-500 text-white border-pink-500 focus:shadow-outline-pink hover:bg-pink-600 hover:border-pink-600':
        appearance === 'danger',
      'bg-transparent text-blue-600 border-blue-600 hover:bg-blue-50':
        appearance === 'minimal',
    },
  ]);

  return (
    <button className={`${buttonClass} ${className}`} {...props}>
      {children}
    </button>
  );
}

StyledButton.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  width: PropTypes.oneOf(['full']),
  appearance: PropTypes.oneOf(['primary', 'danger', 'minimal']),
};

export const Button = (props) => handleLinkWrapping(StyledButton, props);
