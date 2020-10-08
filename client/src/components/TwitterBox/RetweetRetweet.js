import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRefetchMutation } from 'hooks/useRefetchMutation';
import * as q from 'shared/queryKey';
import TwitterBox from './TwitterBox';
import { createRetweetRetweet } from 'api/create-retweet';
import { useModalType } from 'store/modal';

function RetweetRetweet({ rows }) {
  const [body, setBody] = useState('');
  const {
    modalOff,
    modalProps: { tweetID },
  } = useModalType();

  const [mutate, { isLoading }] = useRefetchMutation(createRetweetRetweet, [
    q.ALL_RETWEETS,
  ]);

  async function handleSubmit() {
    await mutate({
      retweetID: tweetID,
      body,
    });
    setBody('');
    modalOff();
  }

  return (
    <TwitterBox
      rows={rows}
      canUploadImage={false}
      placeholder="Add a comment"
      buttonLabel="Retweet"
      handleSubmit={handleSubmit}
      body={body}
      setBody={setBody}
      isLoading={isLoading}
      noPadding={false}
    />
  );
}

RetweetRetweet.propTypes = {
  rows: PropTypes.number,
};

export default RetweetRetweet;
