import React from 'react';
import cn from 'classnames';

export function Avatar({ src, alt, size, variant, ...props }) {
  const wrapperClass = cn([
    'bg-gray-300',
    {
      'border-4 border-white': variant === 'bordered',
    },
  ]);

  const avatarClass = cn([
    'flex-shrink-0 rounded-full',
    {
      'w-5 h-5': size === 'xs',
      'w-8 h-8': size === 'sm',
      'w-10 h-10': size === 'md',
      'w-12 h-12': size === 'lg',
      'w-20 h-20 lg:w-32 lg:h-32': size === 'xl',
    },
  ]);

  return (
    <div className={`${avatarClass} ${wrapperClass}`}>
      {src && <img src={src} alt={alt} className={avatarClass} {...props} />}
    </div>
  );
}
