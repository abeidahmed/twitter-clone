import React from 'react';
import { ModalWrapper } from '../ModalWrapper';
import { TweetRetweet } from 'components/TwitterBox';

function CreateTweetRetweet() {
  return (
    <ModalWrapper modalTitle="Quote tweet the tweet" modalPosition="top">
      <TweetRetweet rows={4} />
    </ModalWrapper>
  );
}

export default CreateTweetRetweet;
