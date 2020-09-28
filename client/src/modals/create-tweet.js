import React from 'react';
import { ModalWrapper } from 'components/modal-wrapper';
import TweetBox from 'lib/tweet-box';

function CreateTweet() {
  return (
    <ModalWrapper modalTitle="Tweet the world" modalPosition="top">
      <TweetBox rows={6} />
    </ModalWrapper>
  );
}

export default CreateTweet;
