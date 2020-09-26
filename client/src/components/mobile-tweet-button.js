import React from 'react';
import { IconButton } from './button';
import { Icon } from './icon';

export function MobileTweetButton() {
  return (
    <div className="fixed right-4 bottom-20 sm:hidden">
      <IconButton size="lg" color="primary">
        <Icon icon="magic-wand" className="w-6 h-6" />
      </IconButton>
    </div>
  );
}
