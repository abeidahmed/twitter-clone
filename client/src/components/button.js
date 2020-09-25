import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

function handleLinkWrapping(Component, props) {
  const { href, to, target, children, disabled, isLoading, ...rest } = props;
  const button = (
    <Component disabled={disabled || isLoading} {...rest}>
      {children}
    </Component>
  );

  if (href)
    return (
      <a
        href={href}
        target={target || '_blank'}
        rel={!target ? 'noopener noreferrer external nofollow' : undefined}
      >
        {button}
      </a>
    );
  if (to) return <Link to={to}>{button}</Link>;
  return button;
}

function buttonClass(size, color, variant) {
  return cn([
    'font-semibold transition duration-150 ease-in-out rounded-full border focus:outline-none focus:shadow-outline-blue',
    {
      'px-3 py-1 text-sm leading-5': size === 'sm',
      'px-4 py-2 text-sm leading-5': size === 'md',
      'px-4 py-3 text-base leading-6': size === 'lg',
      'w-full': variant === 'block',
      'bg-blue-500 text-white border-blue-500 focus:shadow-outline-blue hover:bg-blue-600 hover:border-blue-600':
        color === 'primary',
      'bg-pink-500 text-white border-pink-500 focus:shadow-outline-pink hover:bg-pink-600 hover:border-pink-600':
        color === 'danger',
      'bg-transparent text-blue-600 border-blue-600 hover:bg-blue-50':
        color === 'primary-outline',
    },
  ]);
}

function StyledButton({ size, color, variant, children, ...props }) {
  return (
    <button className={buttonClass(size, color, variant)} {...props}>
      {children}
    </button>
  );
}

export const Button = (props) => handleLinkWrapping(StyledButton, props);
