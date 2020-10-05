import React from 'react';
import { useModalType } from 'store/modal';
import { IconButton } from './Button';
import { Icon } from './Icon';

export function MobileTweetButton() {
  const { modalOn, types } = useModalType();

  function openModal() {
    modalOn({
      modalType: types.CREATE_TWEET,
      modalProps: {},
    });
  }

  return (
    <div className="fixed z-50 rounded-full right-4 bottom-20 sm:hidden">
      <IconButton onClick={openModal} size="lg" appearance="primary">
        <Icon icon="magic-wand" className="w-6 h-6" />
      </IconButton>
    </div>
  );
}
