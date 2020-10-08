import React from 'react';
import { ModalWrapper } from '../ModalWrapper';
import { RetweetRetweet } from 'components/TwitterBox';

function CreateReweetRetweet() {
  return (
    <ModalWrapper modalTitle="Quote tweet the tweet" modalPosition="top">
      <RetweetRetweet rows={4} />
    </ModalWrapper>
  );
}

export default CreateReweetRetweet;
