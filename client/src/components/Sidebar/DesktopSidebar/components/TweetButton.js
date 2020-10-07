import React from 'react';
import { useModalType } from 'store/modal';
import { IconButton, Button } from 'components/Button';
import { Icon } from 'components/Icon';

function TweetButton() {
  const { modalOn, types } = useModalType();

  function openModal() {
    modalOn({
      modalType: types.CREATE_TWEET,
      modalProps: {},
    });
  }

  return (
    <>
      <IconButton
        size="md"
        appearance="primary"
        className="lg:hidden"
        onClick={openModal}
      >
        <Icon
          icon="magic-wand"
          stroke="none"
          fill="currentColor"
          className="w-6 h-6"
        />
      </IconButton>
      <Button
        size="lg"
        appearance="primary"
        width="full"
        className="hidden lg:block"
        onClick={openModal}
      >
        Tweet
      </Button>
    </>
  );
}

export default TweetButton;
