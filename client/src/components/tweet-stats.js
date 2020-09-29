import React from 'react';
import { TextButton } from './button';
import { pluralize } from 'utils/helpers';

export function TweetStats({ count, title, ...props }) {
  return (
    <TextButton color="black" {...props}>
      <span className="font-semibold">{count}</span>
      <span className="pl-1 text-gray-500">{pluralize(count, title)}</span>
    </TextButton>
  );
}
