import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { handleLinkWrapping } from './utils';

function StyledTextButton({
  size = 'md',
  className,
  appearance,
  children,
  ...props
}) {
  const buttonClass = cn([
    'leading-5 hover:underline focus:outline-none',
    {
      'text-sm': size === 'sm',
      'text-base': size === 'md',
      'text-blue-500': appearance === 'primary',
      'text-gray-900': appearance === 'black',
    },
  ]);

  return (
    <button className={`${buttonClass} ${className}`} {...props}>
      {children}
    </button>
  );
}

StyledTextButton.propTypes = {
  size: PropTypes.oneOf(['sm', 'md']),
  appearance: PropTypes.oneOf(['primary', 'black']),
};

export const TextButton = (props) =>
  handleLinkWrapping(StyledTextButton, props);
