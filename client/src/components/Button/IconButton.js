import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { handleLinkWrapping } from './utils';

function StyledIconButton({
  size = 'md',
  appearance,
  className,
  children,
  ...props
}) {
  const buttonClass = cn([
    'transition duration-150 ease-in-out rounded-full focus:outline-none focus:shadow-outline-blue',
    {
      'p-1': size === 'sm',
      'p-2': size === 'md',
      'p-3': size === 'lg',
      'text-white bg-blue-500 hover:bg-blue-600': appearance === 'primary',
      'text-blue-500 hover:bg-blue-50': appearance === 'minimal',
    },
  ]);

  return (
    <button className={`${buttonClass} ${className}`} {...props}>
      {children}
    </button>
  );
}

StyledIconButton.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  appearance: PropTypes.oneOf(['primary', 'minimal']),
};

export const IconButton = (props) =>
  handleLinkWrapping(StyledIconButton, props);
