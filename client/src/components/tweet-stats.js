import React from 'react';
import { TextButton } from './Button';
import { pluralize } from 'utils/helpers';

export function TweetStats({ count, title, ...props }) {
  return (
    <TextButton appearance="black" {...props}>
      <span className="font-semibold">{count}</span>
      <span className="pl-1 text-gray-500">{pluralize(count, title)}</span>
    </TextButton>
  );
}
