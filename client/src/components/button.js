import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Icon } from './icon';

function handleLinkWrapping(Component, props) {
  const {
    href,
    to,
    activeClassName,
    passiveClassName,
    exact,
    target,
    children,
    disabled,
    isLoading,
    ...rest
  } = props;
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
  if (to && !exact) return <Link to={to}>{button}</Link>;
  if (activeClassName)
    return (
      <NavLink
        to={to}
        activeClassName={activeClassName}
        className={passiveClassName}
        exact={exact}
      >
        {button}
      </NavLink>
    );
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

function buttonIconClass(size, color, position) {
  return cn([
    'transition duration-150 ease-in-out rounded-full focus:outline-none focus:shadow-outline-blue',
    {
      'p-1': size === 'sm',
      'p-2': size === 'md',
      '-ml-2': position === 'left',
      '-mr-2': position === 'right',
      'text-white bg-blue-500 hover:bg-blue-600': color === 'primary',
      'text-blue-500 hover:bg-blue-50': color === 'primary-text',
    },
  ]);
}

function StyledIconButton({ size, color, position, children, ...props }) {
  return (
    <button className={buttonIconClass(size, color, position)} {...props}>
      {children}
    </button>
  );
}

function IconWithTextButtonClass(size, color, variant) {
  return cn([
    'whitespace-no-wrap transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue',
    {
      'px-3 py-2 text-sm': size === 'md',
      'text-gray-800 hover:bg-blue-50': color === 'white',
      'text-left flex items-center w-full': variant === 'menu',
    },
  ]);
}

function StyledIconWithTextButton({
  size,
  color,
  variant,
  icon,
  children,
  ...props
}) {
  return (
    <button
      className={IconWithTextButtonClass(size, color, variant)}
      {...props}
    >
      <Icon icon={icon} className="w-5 h-5 text-gray-500" />
      <span className="pl-2 leading-5">{children}</span>
    </button>
  );
}

function TextButtonClass(size) {
  return cn([
    'text-blue-500 leading-5 hover:underline focus:outline-none',
    {
      'text-sm': size === 'sm',
      'text-base': size === 'md',
    },
  ]);
}

function StyledTextButton({ size, className, children, ...props }) {
  return (
    <button className={`${TextButtonClass(size)} ${className}`} {...props}>
      {children}
    </button>
  );
}

export const Button = (props) => handleLinkWrapping(StyledButton, props);

export const IconButton = (props) =>
  handleLinkWrapping(StyledIconButton, props);

export const IconWithTextButton = (props) =>
  handleLinkWrapping(StyledIconWithTextButton, props);

export const TextButton = (props) =>
  handleLinkWrapping(StyledTextButton, props);
