import React from 'react';
import { useModalType } from 'store/modal';
import { IconButton } from './button';
import { Icon } from './icon';

export function MobileTweetButton() {
  const { modalOn } = useModalType();

  function openModal() {
    modalOn({
      modalType: 'CREATE_TWEET',
      modalProps: {},
    });
  }

  return (
    <div className="fixed z-50 rounded-full right-4 bottom-20 sm:hidden">
      <IconButton onClick={openModal} size="lg" color="primary">
        <Icon icon="magic-wand" className="w-6 h-6" />
      </IconButton>
    </div>
  );
}
