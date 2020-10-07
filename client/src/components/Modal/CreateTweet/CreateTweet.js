import React from 'react';
import { ModalWrapper } from '../ModalWrapper';
import { TweetBox } from 'components/TwitterBox';

function CreateTweet() {
  return (
    <ModalWrapper modalTitle="Tweet the world" modalPosition="top">
      <TweetBox rows={6} />
    </ModalWrapper>
  );
}

export default CreateTweet;
