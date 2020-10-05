import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Icon } from './Icon';

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

function StyledButton({ size, color, variant, className, children, ...props }) {
  return (
    <button
      className={`${buttonClass(size, color, variant)} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function buttonIconClass(size, color) {
  return cn([
    'transition duration-150 ease-in-out rounded-full focus:outline-none focus:shadow-outline-blue',
    {
      'p-1': size === 'sm',
      'p-2': size === 'md',
      'p-3': size === 'lg',
      'text-white bg-blue-500 hover:bg-blue-600': color === 'primary',
      'text-blue-500 hover:bg-blue-50': color === 'primary-text',
    },
  ]);
}

function StyledIconButton({ size, color, className, children, ...props }) {
  return (
    <button
      className={`${buttonIconClass(size, color)} ${className}`}
      {...props}
    >
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
      'text-red-600 hover:bg-blue-50': color === 'danger',
      'text-left flex items-center w-full': variant === 'menu',
    },
  ]);
}

function IconWithTextButtonIconClass(color) {
  return cn([
    'w-5 h-5',
    {
      'text-gray-500': color === 'white',
      'text-red-500': color === 'danger',
    },
  ]);
}

function StyledIconWithTextButton({
  size,
  color,
  variant,
  icon,
  className,
  children,
  ...props
}) {
  return (
    <button
      className={`${IconWithTextButtonClass(
        size,
        color,
        variant
      )} ${className}`}
      {...props}
    >
      <Icon icon={icon} className={IconWithTextButtonIconClass(color)} />
      <span className="pl-2 leading-5">{children}</span>
    </button>
  );
}

function TextButtonClass(size, color) {
  return cn([
    'leading-5 hover:underline focus:outline-none',
    {
      'text-sm': size === 'sm',
      'text-base': size === 'md',
      'text-blue-500': color === 'primary',
      'text-gray-900': color === 'black',
    },
  ]);
}

function StyledTextButton({ size, className, color, children, ...props }) {
  return (
    <button
      className={`${TextButtonClass(size, color)} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function TwitterActionButtonClass(color) {
  return cn([
    'inline-flex items-center text-gray-500 text-sm group focus:outline-none',
    {
      'hover:text-blue-500 focus:text-blue-500': color === 'blue',
      'hover:text-red-500 focus:text-red-500': color === 'red',
      'hover:text-green-500 focus:text-green-500': color === 'green',
      'hover:text-teal-500 focus:text-teal-500': color === 'teal',
    },
  ]);
}

function TwitterActionIconButtonClass(size) {
  return cn([
    'rounded-full',
    {
      'w-5 h-5': size === 'sm',
      'w-6 h-6': size === 'md',
    },
  ]);
}

function TwitterActiveIconButtonWrapper(color) {
  return cn([
    'p-2 rounded-full',
    {
      'group-hover:bg-blue-50 group-focus:bg-blue-50': color === 'blue',
      'group-hover:bg-red-50 group-focus:bg-red-50': color === 'red',
      'group-hover:bg-green-50 group-focus:bg-green-50': color === 'green',
      'group-hover:bg-teal-50 group-focus:bg-teal-50': color === 'teal',
    },
  ]);
}

function StyledTwitterActionButton({
  size,
  color,
  icon,
  className,
  children,
  ...props
}) {
  return (
    <button
      className={`${TwitterActionButtonClass(color)} ${className}`}
      {...props}
    >
      <i className={TwitterActiveIconButtonWrapper(color)}>
        <Icon icon={icon} className={TwitterActionIconButtonClass(size)} />
      </i>
      <span>{children}</span>
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

export const TwitterActionButton = (props) =>
  handleLinkWrapping(StyledTwitterActionButton, props);
