import React from 'react';
import { normalizeLink } from 'utils/helpers';
import { Icon } from './Icon';
import { TextButton } from './Button';

export function UserMeta({ title, icon, linkTo }) {
  return (
    <p className="flex items-center space-x-1 text-sm text-gray-500">
      <Icon icon={icon} className="w-5 h-5 text-gray-400" />
      {linkTo ? (
        <TextButton href={linkTo} appearance="primary" size="sm">
          {normalizeLink(linkTo)}
        </TextButton>
      ) : (
        <span className="leading-5">{title}</span>
      )}
    </p>
  );
}
