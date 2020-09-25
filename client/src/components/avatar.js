import React from 'react';
import cn from 'classnames';

export function Avatar({ src, alt, size, variant, ...props }) {
  const avatarClass = cn([
    'flex-shrink-0 rounded-full',
    {
      'w-8 h-8': size === 'sm',
      'w-10 h-10': size === 'md',
      'w-12 h-12': size === 'lg',
      'w-20 h-20 lg:w-32 lg:h-32': size === 'xl',
      'border-4 border-white': variant === 'bordered',
    },
  ]);

  return <img src={src} alt={alt} className={avatarClass} />;
}
